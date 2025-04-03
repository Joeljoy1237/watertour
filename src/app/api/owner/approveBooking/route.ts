import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Booking from "@/models/Booking";
import User from "@/models/User";
import Houseboat from "@/models/Houseboat";
import nodemailer from "nodemailer";
export async function POST(req: NextRequest) {
  try {
    const { userId, bookingId } = await req.json();

    if (!bookingId) {
      return NextResponse.json({ error: "Booking ID is required" }, { status: 400 });
    }

    // Connect to MongoDB (if not already connected)
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    // Find and update the booking status
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "approved", updatedAt: new Date() },
      { new: true }
    );

    if (!updatedBooking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Update the houseboat's availability
    const houseboat = await Houseboat.findById(updatedBooking.houseboatId);
    if (houseboat) {
      const dateData = houseboat.dates.get(updatedBooking.date);
      if (dateData) {
        if (updatedBooking.type === "Day Cruiser") {
          dateData.dayCruiser = false;
          dateData.dayCruiserBooked = true;
        } else {
          dateData.nightStay = false;
          dateData.nightStayBooked = true;
        }
        await houseboat.save();
      }
    }

    const user = await User.findById({ _id: userId }).select("revenue");
    user.revenue = user.revenue + updatedBooking.totalPrice;
    await user.save();

        
    

    // // const transporter = nodemailer.createTransport({
    // //   service: "Gmail",
    // //   auth: {
    // //     user: process.env.EMAIL,
    // //     pass: process.env.EMAIL_PASSWORD,
    // //   },
    // // });


    // //   try {
    //     const mailOptions = {
    //       from: process.env.EMAIL,
    //       to: updatedBooking.email,
    //       subject: "Water Tour Booking Confirmation",
    //       html: `
    //         <html>
    //         <head>
    //           <style>
    //             body {
    //               font-family: Arial, sans-serif;
    //               line-height: 1.6;
    //               color: #333;
    //               margin: 0;
    //               padding: 0;
    //             }
    //             .container {
    //               max-width: 600px;
    //               margin: 0 auto;
    //               padding: 20px;
    //             }
    //             .header {
    //               background-color: #2ca01c;
    //               color: white;
    //               padding: 20px;
    //               text-align: center;
    //             }
    //             .content {
    //               padding: 20px;
    //               background-color: #f9f9f9;
    //             }
    //             .booking-details {
    //               background-color: white;
    //               padding: 15px;
    //               border-radius: 5px;
    //               margin: 20px 0;
    //             }
    //             .footer {
    //               text-align: center;
    //               padding: 20px;
    //               font-size: 14px;
    //               color: #666;
    //             }
    //           </style>
    //         </head>
    //         <body>
    //           <div class="container">
    //             <div class="header">
    //               <h1>Booking Confirmed!</h1>
    //             </div>
    //             <div class="content">
    //               <p>Dear Guest,</p>
    //               <p>Your houseboat booking has been confirmed. Here are your booking details:</p>
              
    //               <div class="booking-details">
    //                 <p><strong>Booking ID:</strong> ${updatedBooking._id}</p>
    //                 <p><strong>Houseboat:</strong> ${updatedBooking.houseboatId.name}</p>
    //                 <p><strong>Date:</strong> ${updatedBooking.date}</p>
    //                 <p><strong>Type:</strong> ${updatedBooking.type}</p>
    //                 <p><strong>Number of Guests:</strong> ${updatedBooking.guests}</p>
    //                 ${updatedBooking.type === 'Night Stay' ? `<p><strong>Number of Beds:</strong> ${updatedBooking.beds}</p>` : ''}
    //                 <p><strong>Total Amount:</strong> ₹${updatedBooking.totalPrice}</p>
    //               </div>

    //               <p>Please keep this email for your records. If you have any questions or need to make changes to your booking, please contact us.</p>
              
    //               <p>We look forward to providing you with an amazing houseboat experience!</p>
    //             </div>
    //             <div class="footer">
    //               <p>Thank you for choosing Water Tour</p>
    //               <p>For support, contact: support@watertour.com</p>
    //             </div>
    //           </div>
    //         </body>
    //         </html>
    //       `
    //     };

    //     await transporter.sendMail(mailOptions).catch((error: Error) => {
    //       console.error("Error sending email:", error);
    //       return new NextResponse(
    //         JSON.stringify({
    //           message: "Failed to send Approval email",
    //           desc: "There was an error sending the email. Please try again later or contact support.",
    //         }),
    //         { status: 500 }
    //       );
    //     });

    return new NextResponse(JSON.stringify({ message: "Email sent successfully" }), {
      status: 200,
    });
  } catch (err: unknown) {
    console.error("Internal Server Error:", err);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
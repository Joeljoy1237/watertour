import { connectToDB } from "@/utils/database";
import Owner from "@/models/ownerdetails";
import User from "@/models/User";

export const POST = async (req: Request) => {
  const {
    firstName,
    lastName,
    address,
    city,
    pincode,
    email,
    phone,
    licenseNumber,
  } = await req.json();

  await connectToDB();

  try {
    // Check if the user exists in the User model
    const user = await User.findOne({ email });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "User not found" }),
        { status: 404 }
      );
    }

    // Update the user to set isOwner to true
    user.isOwner = true;
    await user.save();

    // Save the owner details in the Owner model
    const ownerDetails = {
      userId: user._id,
      firstName,
      lastName,
      address,
      city,
      pincode,
      email,
      phone,
      licenseNumber,
    };

    const owner = await Owner.create(ownerDetails);
    await owner.save();

    // Respond with success and redirect URL
    return new Response(
      JSON.stringify({
        message: "User updated to owner successfully",
        redirectUrl: "/dashboard/profile",
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in making user an owner:", error);
    return new Response(
      JSON.stringify({ message: "Failed to update user to owner" }),
      { status: 500 }
    );
  }
};
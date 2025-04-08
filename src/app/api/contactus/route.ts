import { appendToSheet } from "@/utils/googlesheets";

// Define types for the request body
interface RequestBody {
  name: string;
  message: string;
  email: string;
  // phone: string;
}

// Define the POST handler
export const POST = async (request: Request): Promise<Response> => {
  try {
    const { name, message, email }: RequestBody = await request.json();

    if (!message) {
      return new Response(
        JSON.stringify({
          message: "Message is required !!",
        }),
        { status: 400 }
      );
    }

    if (!name) {
      return new Response(
        JSON.stringify({
          message: "Name is required !!",
        }),
        { status: 400 }
      );
    }

    if (!email) {
      return new Response(
        JSON.stringify({
          message: "Email is required !!",
        }),
        { status: 400 }
      );
    }


    const values = [name, message, email];
    await appendToSheet("Sheet1!A2", [values]);

    return new Response(
      JSON.stringify({
        message: "Thank you 😁",
        desc: "We will soon be in touch",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
      }),
      { status: 500 }
    );
  }
};

import { connectToDB } from "@/utils/database";
import Subscription from "@/models/Subscription";


interface SubscriptionKeys {
    p256dh: string;
    auth: string;
}

interface SubscriptionData {
    endpoint: string;
    keys: SubscriptionKeys;
    userId?: string;
}

export const POST = async (req: Request): Promise<Response> => {
    try {
        await connectToDB();

        const data: SubscriptionData = await req.json();
        const { endpoint, keys, userId } = data;

        if (!endpoint || !keys?.p256dh || !keys?.auth) {
            return new Response(JSON.stringify({ error: "Invalid subscription" }), { status: 400 });
        }

        const existing = await Subscription.findOne({ endpoint });

        if (!existing) {
            await Subscription.create({ endpoint, keys, userId: userId || null });
        }

        return new Response(JSON.stringify({ message: "Subscription saved" }), { status: 201 });
    } catch (err) {
        console.error("Failed to save subscription:", err);
        return new Response(JSON.stringify({ error: "Failed to save subscription" }), { status: 500 });
    }
};

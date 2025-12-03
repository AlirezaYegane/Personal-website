import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Placeholder for analytics tracking logic
        console.log("Track event:", data);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to track event" },
            { status: 500 }
        );
    }
}

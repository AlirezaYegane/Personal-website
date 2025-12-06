import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

interface TrackRequestBody {
    path: string;
    referrer?: string;
}

export async function POST(request: Request) {
    try {
        const body: TrackRequestBody = await request.json();

        // Validate required field
        if (!body.path || typeof body.path !== "string") {
            return NextResponse.json(
                { error: "Missing required field: path" },
                { status: 400 }
            );
        }

        // Extract user-agent from headers
        const userAgent = request.headers.get("user-agent") || undefined;

        // Try to read client-id cookie (optional)
        let clientId: string | undefined;
        try {
            const cookieStore = await cookies();
            clientId = cookieStore.get("client-id")?.value;
        } catch {
            // Cookie access may fail in some edge cases, ignore
        }

        // Insert visit into database
        await prisma.visit.create({
            data: {
                path: body.path,
                referrer: body.referrer || null,
                userAgent: userAgent || null,
                clientId: clientId || null,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        // Log error but don't expose internal details
        console.error("Analytics tracking error:", error);
        return NextResponse.json(
            { error: "Failed to track visit" },
            { status: 500 }
        );
    }
}

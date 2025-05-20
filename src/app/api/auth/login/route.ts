import { NextRequest, NextResponse } from "next/server";
import { verifyCredentials } from "@/lib/db";
import { createToken } from "@/lib/jwt";
import { z } from "zod";

// Validation schema for login request
const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validation = LoginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.errors[0].message }, { status: 400 });
    }

    const { email, password } = validation.data;
    
    // Verify user credentials
    const user = await verifyCredentials(email, password);
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    
    // Generate JWT token
    const token = createToken({
      sub: user.id,
      email: user.email,
      name: user.name,
    });
    
    // Return success response with user data and token
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
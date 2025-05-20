import { NextRequest, NextResponse } from "next/server";
import { createUser, getUserByEmail } from "@/lib/db";
import { createToken } from "@/lib/jwt";
import { z } from "zod";

// Validation schema for signup request
const SignupSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validation = SignupSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.errors[0].message }, { status: 400 });
    }

    const { email, password, name } = validation.data;
    
    // Check if user already exists
    const existingUser = getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 });
    }
    
    // Create the user
    const user = await createUser({ email, password, name, provider: 'email' });
    if (!user) {
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
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
      },
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
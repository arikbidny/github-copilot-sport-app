import { NextRequest, NextResponse } from "next/server";
import { createUser, getUserByEmail } from "@/lib/db";
import { createToken } from "@/lib/jwt";

// Mock Google OAuth for demo purposes
// In a real app, you would use the Google OAuth API

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = body; // Authorization code from Google OAuth
    
    // In a real app, exchange the code for a token with Google
    // Here we'll simulate a successful OAuth response
    const mockGoogleResponse = {
      email: `user${Date.now()}@gmail.com`,
      name: "Google User",
      sub: `google_${Date.now()}`,
      picture: "https://lh3.googleusercontent.com/a/default-user"
    };
    
    // Check if user already exists
    let user = getUserByEmail(mockGoogleResponse.email);
    
    if (!user) {
      // Create new user if not exists
      user = await createUser({
        email: mockGoogleResponse.email,
        name: mockGoogleResponse.name,
        image: mockGoogleResponse.picture,
        provider: 'google'
      });
      
      if (!user) {
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
      }
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
    console.error("Google OAuth error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
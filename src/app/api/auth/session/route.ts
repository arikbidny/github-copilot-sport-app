import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { getUserById } from "@/lib/db";

// Get the current session (authenticated user)
export async function GET(request: NextRequest) {
  try {
    // Get authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
    
    // Extract token
    const token = authHeader.substring(7);
    
    // Verify token
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
    
    // Get user from database
    const user = getUserById(payload.sub);
    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
    
    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      authenticated: true,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from "next/server";
import { createUser, getUserByEmail } from "@/lib/db";
import { createToken } from "@/lib/jwt";

// Mock GitHub OAuth for demo purposes
// In a real app, you would use the GitHub OAuth API

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = body; // Authorization code from GitHub OAuth
    
    // In a real app, exchange the code for a token with GitHub
    // Here we'll simulate a successful OAuth response
    const mockGithubResponse = {
      email: `user${Date.now()}@github.com`,
      name: "GitHub User",
      id: `github_${Date.now()}`,
      avatar_url: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
    };
    
    // Check if user already exists
    let user = getUserByEmail(mockGithubResponse.email);
    
    if (!user) {
      // Create new user if not exists
      user = await createUser({
        email: mockGithubResponse.email,
        name: mockGithubResponse.name,
        image: mockGithubResponse.avatar_url,
        provider: 'github'
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
    console.error("GitHub OAuth error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
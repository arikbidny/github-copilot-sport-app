import jwt from 'jsonwebtoken';

// JWT Secret should be in environment variables in production
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface JWTPayload {
  sub: string; // User ID
  email: string;
  name?: string;
  iat?: number;
  exp?: number;
}

// Create a JWT token
export function createToken(payload: JWTPayload): string {
  return jwt.sign(
    payload, 
    JWT_SECRET, 
    { expiresIn: '7d' } // Token expires in 7 days
  );
}

// Verify a JWT token
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}
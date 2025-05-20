import fs from 'fs';
import path from 'path';
import { hash, compare } from 'bcryptjs';

// Define user types
export interface User {
  id: string;
  email: string;
  password?: string;
  name?: string;
  image?: string;
  provider?: 'email' | 'github' | 'google';
  createdAt: Date;
}

// Path to the JSON database file
const DB_PATH = path.join(process.cwd(), 'data', 'users.json');

// Ensure the data directory exists
const ensureDbExists = () => {
  const dirPath = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ users: [] }));
  }
};

// Get all users
export const getUsers = (): User[] => {
  ensureDbExists();
  try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data).users;
  } catch (error) {
    return [];
  }
};

// Save users to the database
const saveUsers = (users: User[]) => {
  ensureDbExists();
  fs.writeFileSync(DB_PATH, JSON.stringify({ users }));
};

// Create a new user
export const createUser = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<User | null> => {
  const users = getUsers();
  
  // Check if user with this email already exists
  if (users.some(user => user.email === userData.email)) {
    return null;
  }
  
  // Create new user with hashed password
  const newUser: User = {
    id: Date.now().toString(),
    ...userData,
    password: userData.password ? await hash(userData.password, 12) : undefined,
    createdAt: new Date()
  };
  
  users.push(newUser);
  saveUsers(users);
  
  // Return user without password
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword as User;
};

// Get user by email
export const getUserByEmail = (email: string): User | null => {
  const users = getUsers();
  const user = users.find(user => user.email === email);
  return user || null;
};

// Get user by ID
export const getUserById = (id: string): User | null => {
  const users = getUsers();
  const user = users.find(user => user.id === id);
  return user || null;
};

// Verify user credentials
export const verifyCredentials = async (email: string, password: string): Promise<User | null> => {
  const user = getUserByEmail(email);
  
  if (!user || !user.password) {
    return null;
  }
  
  const passwordValid = await compare(password, user.password);
  
  if (!passwordValid) {
    return null;
  }
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword as User;
};
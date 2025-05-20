"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/hooks/auth-provider";

// Define form schemas
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

interface AuthFormProps {
  isLogin: boolean;
}

export function AuthForm({ isLogin }: AuthFormProps) {
  const router = useRouter();
  const { login, signup, error: authError } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // Use the appropriate schema based on form mode
  const formSchema = isLogin ? loginSchema : signupSchema;
  
  // Initialize the form
  const form = useForm<LoginFormValues | SignupFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      ...(isLogin ? {} : { name: "" }),
    },
  });

  // Form submission handler
  const onSubmit = async (values: LoginFormValues | SignupFormValues) => {
    setIsLoading(true);
    
    try {
      let success = false;
      
      if (isLogin) {
        success = await login(values.email, values.password);
      } else {
        const signupValues = values as SignupFormValues;
        success = await signup(signupValues.email, signupValues.password, signupValues.name);
      }
      
      if (success) {
        // Redirect to dashboard
        router.push("/");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Name field (only for signup) */}
        {!isLogin && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="John Doe"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        {/* Email field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isLoading}
                  placeholder="m@example.com"
                  type="email"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Password field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isLoading}
                  placeholder="••••••••"
                  type="password"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Display auth errors */}
        {authError && (
          <div className="text-red-500 text-sm mt-2">{authError}</div>
        )}
        
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4"
        >
          {isLoading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
        </Button>
      </form>
    </Form>
  );
}
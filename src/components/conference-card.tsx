"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

// Create conference card props
export interface ConferenceCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  transcription: string;
}

const ConferenceCard = ({
  title,
  date,
  time,
  location,
  transcription,
}: ConferenceCardProps) => {
  const [summary, setSummary] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSummarize = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transcription }),
      });

      if (!response.ok) {
        throw new Error("Failed to summarize");
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (err) {
      setError("Failed to generate summary. Please try again.");
      console.error("Error summarizing:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>Date: {date}</CardDescription>
        <CardDescription>Time: {time}</CardDescription>
        <CardDescription>Location: {location}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <CardTitle className="pb-3 text-base">Transcription</CardTitle>
        <CardDescription className="text-sm max-h-40 overflow-y-auto">
          {transcription}
        </CardDescription>
        
        {summary && (
          <div className="mt-4">
            <CardTitle className="pb-2 text-base">AI Summary</CardTitle>
            <CardDescription className="text-sm bg-blue-50 p-3 rounded border-l-4 border-blue-400">
              {summary}
            </CardDescription>
          </div>
        )}
        
        {error && (
          <div className="mt-4">
            <CardDescription className="text-sm text-red-600 bg-red-50 p-3 rounded border-l-4 border-red-400">
              {error}
            </CardDescription>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button 
          variant="default" 
          onClick={handleSummarize}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Summarizing..." : "Summarize with AI"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConferenceCard;

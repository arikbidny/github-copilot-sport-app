"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  teamIds: string[];
  category: 'news' | 'match' | 'transfer' | 'injury' | 'highlight';
  league: 'NBA' | 'Soccer' | 'General';
  publishedAt: string;
  source: string;
}

interface Team {
  id: string;
  name: string;
  league: 'NBA' | 'Soccer';
  city: string;
  country?: string;
}

export default function NewsFeedPage() {
  const [forYouArticles, setForYouArticles] = useState<NewsArticle[]>([]);
  const [discoverArticles, setDiscoverArticles] = useState<NewsArticle[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("for-you");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [forYouResponse, discoverResponse, teamsResponse] = await Promise.all([
          fetch('/api/news-feed?type=for-you&limit=20'),
          fetch('/api/news-feed?type=discover&limit=20'),
          fetch('/api/teams')
        ]);

        const forYouData = await forYouResponse.json();
        const discoverData = await discoverResponse.json();
        const teamsData = await teamsResponse.json();

        if (forYouData.success) setForYouArticles(forYouData.articles);
        if (discoverData.success) setDiscoverArticles(discoverData.articles);
        if (teamsData.success) setTeams(teamsData.teams);
      } catch (error) {
        console.error('Failed to fetch news feed:', error);
        toast.error('Failed to load news feed');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getTeamNames = (teamIds: string[]): string[] => {
    return teamIds.map(id => {
      const team = teams.find(t => t.id === id);
      return team ? team.name : id;
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      news: "bg-blue-100 text-blue-800",
      match: "bg-green-100 text-green-800",
      transfer: "bg-orange-100 text-orange-800",
      injury: "bg-red-100 text-red-800",
      highlight: "bg-purple-100 text-purple-800",
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString();
  };

  const ArticleCard = ({ article }: { article: NewsArticle }) => (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight line-clamp-2">
              {article.title}
            </CardTitle>
            <CardDescription className="mt-2 line-clamp-3">
              {article.summary}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge className={getCategoryColor(article.category)}>
            {article.category}
          </Badge>
          <Badge variant="outline">{article.league}</Badge>
          {getTeamNames(article.teamIds).map((teamName, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {teamName}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatDate(article.publishedAt)}
          </div>
          <div className="flex items-center gap-1">
            <span>{article.source}</span>
            <ExternalLink className="h-3 w-3" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const EmptyState = ({ type }: { type: string }) => (
    <div className="text-center py-12">
      <div className="text-lg font-medium mb-2">
        {type === 'for-you' ? 'No personalized news available' : 'No news available'}
      </div>
      <p className="text-muted-foreground">
        {type === 'for-you' 
          ? 'Select your favorite teams in Settings to see personalized content.'
          : 'Check back later for the latest sports news.'}
      </p>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading news feed...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">News Feed</h1>
        <p className="text-muted-foreground">
          Stay updated with the latest sports news and updates from your favorite teams.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="for-you">
            For You ({forYouArticles.length})
          </TabsTrigger>
          <TabsTrigger value="discover">
            Discover ({discoverArticles.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="for-you" className="space-y-4">
          {forYouArticles.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {forYouArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <EmptyState type="for-you" />
          )}
        </TabsContent>
        
        <TabsContent value="discover" className="space-y-4">
          {discoverArticles.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {discoverArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <EmptyState type="discover" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
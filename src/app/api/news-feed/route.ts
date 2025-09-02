import { NextRequest, NextResponse } from "next/server";
import { getArticlesByTeamIds, getAllArticles } from "@/lib/news-data";
import { getFavoriteTeams } from "@/lib/user-storage";

/**
 * GET endpoint for personalized news feed
 * Query parameters:
 * - type: 'for-you' | 'discover'
 * - limit: number (optional, default 10)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'discover';
    const limit = parseInt(searchParams.get('limit') || '10');

    let articles;
    
    if (type === 'for-you') {
      // Return personalized feed based on favorite teams
      const userFavoriteTeams = getFavoriteTeams();
      if (userFavoriteTeams.length === 0) {
        return NextResponse.json({
          articles: [],
          message: "Please select your favorite teams to see personalized content",
          success: true
        });
      }
      articles = getArticlesByTeamIds(userFavoriteTeams);
    } else {
      // Return discover feed with all articles
      articles = getAllArticles();
    }

    // Apply limit
    const limitedArticles = articles.slice(0, limit);

    return NextResponse.json({
      articles: limitedArticles,
      type,
      totalCount: articles.length,
      success: true
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch news feed", success: false },
      { status: 500 }
    );
  }
}
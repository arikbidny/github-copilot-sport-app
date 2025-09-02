"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Team {
  id: string;
  name: string;
  league: 'NBA' | 'Soccer';
  city: string;
  country?: string;
}

export default function SettingsPage() {
  const [nbaTeams, setNbaTeams] = useState<Team[]>([]);
  const [soccerTeams, setSoccerTeams] = useState<Team[]>([]);
  const [favoriteTeams, setFavoriteTeams] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch teams and current favorites
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch teams
        const [nbaResponse, soccerResponse, favoritesResponse] = await Promise.all([
          fetch('/api/teams?league=nba'),
          fetch('/api/teams?league=soccer'),
          fetch('/api/favorite-teams')
        ]);

        const nbaData = await nbaResponse.json();
        const soccerData = await soccerResponse.json();
        const favoritesData = await favoritesResponse.json();

        if (nbaData.success) setNbaTeams(nbaData.teams);
        if (soccerData.success) setSoccerTeams(soccerData.teams);
        if (favoritesData.success) setFavoriteTeams(favoritesData.favoriteTeams);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTeamToggle = (teamId: string) => {
    setFavoriteTeams(prev => {
      if (prev.includes(teamId)) {
        return prev.filter(id => id !== teamId);
      } else {
        return [...prev, teamId];
      }
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/favorite-teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teamIds: favoriteTeams }),
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Favorite teams updated successfully!');
      } else {
        throw new Error(data.error || 'Failed to save');
      }
    } catch (error) {
      console.error('Failed to save favorite teams:', error);
      toast.error('Failed to save favorite teams');
    } finally {
      setSaving(false);
    }
  };

  const TeamGrid = ({ teams, league }: { teams: Team[], league: string }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {teams.map((team) => (
        <Card key={team.id} className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Checkbox
                id={team.id}
                checked={favoriteTeams.includes(team.id)}
                onCheckedChange={() => handleTeamToggle(team.id)}
              />
              <div className="flex-1">
                <label
                  htmlFor={team.id}
                  className="cursor-pointer font-medium text-sm"
                >
                  {team.name}
                </label>
                <p className="text-xs text-muted-foreground">
                  {team.city}{team.country && `, ${team.country}`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your preferences and favorite teams for personalized content.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Favorite Teams</CardTitle>
          <CardDescription>
            Select your favorite NBA and Soccer teams to get personalized news and updates.
            You have {favoriteTeams.length} teams selected.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="nba" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="nba">
                NBA Teams ({favoriteTeams.filter(id => nbaTeams.some(t => t.id === id)).length})
              </TabsTrigger>
              <TabsTrigger value="soccer">
                Soccer Teams ({favoriteTeams.filter(id => soccerTeams.some(t => t.id === id)).length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="nba" className="space-y-4">
              <TeamGrid teams={nbaTeams} league="NBA" />
            </TabsContent>
            
            <TabsContent value="soccer" className="space-y-4">
              <TeamGrid teams={soccerTeams} league="Soccer" />
            </TabsContent>
          </Tabs>

          {favoriteTeams.length > 0 && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Selected Teams:</h3>
              <div className="flex flex-wrap gap-2">
                {favoriteTeams.map(teamId => {
                  const team = [...nbaTeams, ...soccerTeams].find(t => t.id === teamId);
                  return team ? (
                    <Badge key={teamId} variant="secondary">
                      {team.name}
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>
          )}

          <div className="mt-6 pt-4 border-t flex justify-end">
            <Button 
              onClick={handleSave} 
              disabled={saving}
              className="w-full sm:w-auto"
            >
              {saving ? 'Saving...' : 'Save Preferences'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
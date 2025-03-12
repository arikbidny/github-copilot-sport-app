"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface Player {
  id: number;
  name: string;
  team: string;
  weight: string;
  height: string;
  position: string;
}

const PlayersInfo = () => {
  return <div>Players info</div>;
};

export default PlayersInfo;

import { NextRequest, NextResponse } from "next/server";
// Create a sample json with data for coaches
// Create a route for coaches to get all coaches from sample json file data
// Create a route for coaches to get a single coach by id from sample json file data
// Create a route for coaches to add a new coach to sample json file data
// Create a route for coaches to update a coach by id in sample json file data
// Create a route for coaches to delete a coach by id from sample json file data
// If there is no data return an empty array and an Error
// If there is an error, return a 500 status code and an Error

const coaches = [
  {
    id: 1,
    name: "Steve Nash",
    team: "Brooklyn Nets",
  },
  {
    id: 2,
    name: "Doc Rivers",
    team: "Philadelphia 76ers",
  },
  {
    id: 3,
    name: "Quin Snyder",
    team: "Utah Jazz",
  },
];

export async function GET(request: NextRequest) {
  return NextResponse.json(coaches);
}

import React from "react";

export type ProposalProp = {
  key: React.Key;
  index: number;
  name: string;
  description: string;
  status: "Executed" | "Ongoing" | "Not Started";
  startDate: string;
  endDate: string;
  vote: "Not Voted" | "Voted";
  voteAgainst: number;
  voteFor: number;
};

"use client";
import * as React from "react";

const residential = ["Garage","Home Gym","Patio & Deck","Craft Areas","Unfinished Basement","Sheds","Home Office"];
const commercial = ["Retail stores","Offices","Showrooms","Car Dealership Showrooms","Outdoor Events","Dance Floors","Commercial Garages","Airplane Hangars","Corporate Events","Gym Flooring"];

export function ApplicationsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <h4 className="heading-3">Residential</h4>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {residential.map((x) => (
            <span key={x} className="sport-badge">{x}</span>
          ))}
        </div>
      </div>
      <div>
        <h4 className="heading-3">Commercial</h4>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {commercial.map((x) => (
            <span key={x} className="sport-badge">{x}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  colorClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, colorClass }) => (
  <Card>
    <CardContent className="p-4 text-center">
      <div className={`text-2xl font-bold ${colorClass} mb-1`}>{value}</div>
      <div className="text-sm text-gray-600">{title}</div>
    </CardContent>
  </Card>
);

export default StatCard;

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Achievements,
  DashboardFooter,
  LearningRoadmap,
  PortfolioAnalytics,
  QuickActions,
  ResumeAnalytics,
  SkillGapAnalysis,
} from "@/components/app/dashboard/sections-bottom";
import {
  CoachCard,
  DailyInsight,
  JobMatches,
  OverviewCards,
  RecentActivity,
  UpcomingAndGoals,
  WelcomeSection,
} from "@/components/app/dashboard/sections-top";
import { CardSkeleton } from "@/components/app/dashboard/primitives";
import { goal, upcomingEvents } from "@/data/dashboard";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Career dashboard — CareerOS AI" },
      {
        name: "description",
        content:
          "Your personal AI career workspace: resume and ATS scores, job matches, skill gaps, analytics and daily AI insights.",
      },
      { property: "og:title", content: "Career dashboard — CareerOS AI" },
      {
        property: "og:description",
        content: "Track resume, portfolio, ATS, matches and learning progress in one premium workspace.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <CardSkeleton rows={2} />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} rows={1} />
          ))}
        </div>
        <CardSkeleton rows={4} />
      </div>
    );
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      <WelcomeSection />
      <DailyInsight />
      <OverviewCards />

      <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
        <div className="lg:col-span-2">
          <JobMatches />
        </div>
        <div className="space-y-4 lg:space-y-6">
          <CoachCard />
          <RecentActivity />
        </div>
      </div>

      <SkillGapAnalysis />

      <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        <PortfolioAnalytics />
        <ResumeAnalytics />
      </div>

      <UpcomingAndGoals events={upcomingEvents} goal={goal} />

      <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        <QuickActions />
        <Achievements />
      </div>

      <LearningRoadmap />
      <DashboardFooter />
    </div>
  );
}

import { WelcomeSection, DailyInsight, OverviewCards, RecentActivity, CoachCard, JobMatches, UpcomingAndGoals } from './sections-top';
import {
  SkillGapAnalysis,
  PortfolioAnalytics,
  ResumeAnalytics,
  QuickActions,
  Achievements,
  LearningRoadmap,
  DashboardFooter,
} from './sections-bottom';
import { upcomingEvents, goal } from '../../../data/dashboard';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <WelcomeSection />
      <DailyInsight />
      <OverviewCards />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <SkillGapAnalysis />
          <PortfolioAnalytics />
          <ResumeAnalytics />
          <QuickActions />
          <Achievements />
          <LearningRoadmap />
          <DashboardFooter />
        </div>
        <div className="space-y-6">
          <RecentActivity />
          <CoachCard />
          <JobMatches />
          <UpcomingAndGoals events={upcomingEvents} goal={goal} />
        </div>
      </div>
    </div>
  );
}
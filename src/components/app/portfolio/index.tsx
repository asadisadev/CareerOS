import { useEffect, useState } from 'react';
import { SectionNav } from './section-nav';
import { PortfolioWebsite } from './website';
import {
  PortfolioEditorProvider,
  PortfolioPlanProvider,
  portfolioRepository,
} from '../../../lib/portfolio-store';
import type { Portfolio } from '../../../data/portfolio';

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPortfolio = async () => {
      // Get the first portfolio from the repository, or create one if none exist
      const portfolios = portfolioRepository.list();
      let targetPortfolio = portfolios[0];
      if (!targetPortfolio) {
        // Create a new portfolio with default values
        // (you might need to import a create function or adjust this)
        // For simplicity, we'll just show a placeholder
        setLoading(false);
        return;
      }
      setPortfolio(targetPortfolio);
      setLoading(false);
    };
    loadPortfolio();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Loading portfolio…</p>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">No portfolio found. Create one to get started.</p>
      </div>
    );
  }

  return (
    <PortfolioPlanProvider>
      <PortfolioEditorProvider initial={portfolio}>
        <div className="flex h-full min-h-0">
          <aside className="w-64 shrink-0 border-r border-border">
            <SectionNav />
          </aside>
          <main className="flex-1 overflow-hidden p-4">
            <PortfolioWebsite portfolio={portfolio} />
          </main>
        </div>
      </PortfolioEditorProvider>
    </PortfolioPlanProvider>
  );
}
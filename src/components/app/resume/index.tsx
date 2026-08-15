import { useEffect, useState } from 'react';
import { SectionNav } from './section-nav';
import { SectionEditor } from './editor';
import { ResumeEditorProvider, resumeRepository } from '../../../lib/resume-store';
import type { Resume } from '../../../data/resume';

export default function ResumePage() {
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResume = async () => {
      // Get the first resume from the repository, or create one if none exist
      const resumes = resumeRepository.list();
      let targetResume = resumes[0];
      if (!targetResume) {
        targetResume = await resumeRepository.create('My Resume');
      }
      setResume(targetResume);
      setLoading(false);
    };
    loadResume();
  }, []);

  if (loading || !resume) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Loading resume…</p>
      </div>
    );
  }

  return (
    <ResumeEditorProvider initial={resume}>
      <div className="flex h-full min-h-0">
        <aside className="w-64 shrink-0 border-r border-border">
          <SectionNav />
        </aside>
        <main className="flex-1 overflow-y-auto p-6">
          <SectionEditor />
        </main>
      </div>
    </ResumeEditorProvider>
  );
}
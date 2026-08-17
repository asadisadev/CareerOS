import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { SectionNav } from './section-nav';
import { SectionEditor } from './editor';
import { ResumeEditorProvider, resumeRepository } from '../../../lib/resume-store';
import { Resume, RESUME_TEMPLATES } from '../../../data/resume';
import { ResumeDocument } from './preview';
import { Button } from '../../../components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Download, Loader2 } from 'lucide-react';

const PREVIEW_ZOOM = 0.6;

export default function ResumePage() {
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template');
  // const [resume, setResume] = useState(null);
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'edit' | 'preview'>('edit');
  const [downloading, setDownloading] = useState(false);
  const previewRef = useRef(null);

  useEffect(() => {
    const loadResume = async () => {
      let targetResume = resumeRepository.list()[0];
      if (!targetResume) {
        targetResume = await resumeRepository.create('My Resume');
      }

      if (templateId) {
        const template = RESUME_TEMPLATES.find((t) => t.id === templateId);
        if (template) {
          targetResume = {
            ...targetResume,
            style: {
              ...targetResume.style,
              templateId: template.id,
              layout: template.layout,
              accent: template.accent,
              sectionStyle: template.sectionStyle,
            },
          };
          await resumeRepository.save(targetResume);
        }
      }

      setResume(targetResume);
      setLoading(false);
    };
    loadResume();
  }, [templateId]);

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('resume.pdf');
    } catch (error) {
      console.error('PDF download failed:', error);
    }
    setDownloading(false);
  };

  if (loading || !resume) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Loading resume…</p>
      </div>
    );
  }

  return (
    <ResumeEditorProvider initial={resume}>
      <div className="flex h-full min-h-0 flex-col">
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <Tabs value={view} onValueChange={(v) => setView(v as 'edit' | 'preview')}>
            <TabsList>
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="hero" size="sm" onClick={handleDownloadPDF} disabled={downloading}>
            {downloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            Download PDF
          </Button>
        </div>

        <div className="flex-1 flex min-h-0 overflow-hidden">
          <aside className="w-64 shrink-0 border-r border-border overflow-y-auto">
            <SectionNav />
          </aside>
          <main className="flex-1 overflow-y-auto p-6">
            {view === 'edit' ? (
              <SectionEditor />
            ) : (
              <div className="flex justify-center items-start p-4 bg-muted/30 min-h-full overflow-y-auto">
  <div ref={previewRef} className="shadow-lg">
    <ResumeDocument resume={resume} zoom={PREVIEW_ZOOM} />
  </div>
</div>
            )}
          </main>
        </div>
      </div>
    </ResumeEditorProvider>
  );
}
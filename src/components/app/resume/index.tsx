// import { useEffect, useState, useRef } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import { SectionNav } from './section-nav';
// import { SectionEditor } from './editor';
// import { ResumeEditorProvider, resumeRepository } from '../../../lib/resume-store';
// import { Resume, RESUME_TEMPLATES, createTemplateResume, createBlankResume } from '../../../data/resume';
// import { ResumeDocument } from './preview';
// import { Button } from '../../../components/ui/button';
// import { Tabs, TabsList, TabsTrigger } from '../../../components/ui/tabs';
// import { Download, Loader2, ZoomIn, ZoomOut } from 'lucide-react';
// import { Slider } from '../../../components/ui/slider';

// const MIN_ZOOM = 0.3;
// const MAX_ZOOM = 1.2;
// const DEFAULT_ZOOM = 0.6;

// export default function ResumePage() {
//   const [searchParams] = useSearchParams();
//   const templateId = searchParams.get('template');
//   const [resume, setResume] = useState<Resume | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [view, setView] = useState<'edit' | 'preview'>('edit');
//   const [downloading, setDownloading] = useState(false);
//   const [zoom, setZoom] = useState(DEFAULT_ZOOM);
//   const previewRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const loadResume = async () => {
//       setLoading(true);
//       try {
//         let targetResume: Resume;

//         // If templateId is provided, create a new resume from that template
//         if (templateId) {
//           // Check if template exists in RESUME_TEMPLATES
//           const templateExists = RESUME_TEMPLATES.some((t) => t.id === templateId);
//           if (templateExists) {
//             // ✅ CREATE A NEW RESUME WITH THE TEMPLATE'S CONTENT + STYLE
//             targetResume = createTemplateResume(templateId);
//           } else {
//             // Invalid template ID, create blank resume
//             targetResume = createBlankResume('My Resume');
//           }
//         } else {
//           // No template selected - load the first existing resume or create a blank one
//           const existingResumes = resumeRepository.list();
//           if (existingResumes.length > 0) {
//             targetResume = existingResumes[0];
//           } else {
//             targetResume = createBlankResume('My Resume');
//           }
//         }

//         // Save to repository
//         await resumeRepository.save(targetResume);
//         setResume(targetResume);
//       } catch (error) {
//         console.error('Failed to load resume:', error);
//         // Fallback: create a blank resume
//         const blank = createBlankResume('My Resume');
//         await resumeRepository.save(blank);
//         setResume(blank);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadResume();
//   }, [templateId]);

//   const handleDownloadPDF = async () => {
//     if (!previewRef.current) return;
//     setDownloading(true);
//     try {
//       const previewElement = previewRef.current.querySelector('[data-preview-container]');
//       if (!previewElement) throw new Error('Preview element not found');

//       const canvas = await html2canvas(previewElement as HTMLElement, {
//         scale: 2,
//         useCORS: true,
//         logging: false,
//         backgroundColor: '#ffffff',
//       });
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF({
//         orientation: 'portrait',
//         unit: 'px',
//         format: [canvas.width, canvas.height],
//       });
//       pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
//       pdf.save('resume.pdf');
//     } catch (error) {
//       console.error('PDF download failed:', error);
//     }
//     setDownloading(false);
//   };

//   const handleZoomIn = () => {
//     setZoom((prev) => Math.min(MAX_ZOOM, prev + 0.1));
//   };

//   const handleZoomOut = () => {
//     setZoom((prev) => Math.max(MIN_ZOOM, prev - 0.1));
//   };

//   const handleZoomChange = (value: number[]) => {
//     setZoom(value[0]);
//   };

//   if (loading || !resume) {
//     return (
//       <div className="flex h-full items-center justify-center">
//         <p className="text-muted-foreground">Loading resume…</p>
//       </div>
//     );
//   }

//   return (
//     <ResumeEditorProvider initial={resume}>
//       <div className="flex h-full min-h-0 flex-col">
//         {/* Toolbar */}
//         <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-3 py-2 sm:px-4">
//           <Tabs value={view} onValueChange={(v) => setView(v as 'edit' | 'preview')}>
//             <TabsList>
//               <TabsTrigger value="edit">Edit</TabsTrigger>
//               <TabsTrigger value="preview">Preview</TabsTrigger>
//             </TabsList>
//           </Tabs>

//           <div className="flex flex-wrap items-center gap-2">
//             {/* Zoom Controls - Only show in preview mode */}
//             {view === 'preview' && (
//               <div className="flex items-center gap-2 mr-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={handleZoomOut}
//                   disabled={zoom <= MIN_ZOOM}
//                   className="h-8 w-8 p-0"
//                 >
//                   <ZoomOut className="h-4 w-4" />
//                 </Button>
//                 <span className="text-sm font-medium min-w-[40px] text-center">
//                   {Math.round(zoom * 100)}%
//                 </span>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={handleZoomIn}
//                   disabled={zoom >= MAX_ZOOM}
//                   className="h-8 w-8 p-0"
//                 >
//                   <ZoomIn className="h-4 w-4" />
//                 </Button>
//                 <div className="hidden sm:block w-24">
//                   <Slider
//                     value={[zoom]}
//                     min={MIN_ZOOM}
//                     max={MAX_ZOOM}
//                     step={0.05}
//                     onValueChange={handleZoomChange}
//                   />
//                 </div>
//               </div>
//             )}

//             <Button
//               variant="hero"
//               size="sm"
//               onClick={handleDownloadPDF}
//               disabled={downloading}
//               className="h-8 px-3 text-xs sm:h-9 sm:px-4 sm:text-sm"
//             >
//               {downloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
//               <span className="hidden sm:inline ml-1">Download PDF</span>
//             </Button>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 flex min-h-0 overflow-hidden flex-col sm:flex-row">
//           {/* Sidebar - Only in edit mode */}
//           {view === 'edit' && (
//             <aside className="w-full sm:w-64 shrink-0 border-b sm:border-b-0 sm:border-r border-border overflow-y-auto max-h-[200px] sm:max-h-full">
//               <SectionNav />
//             </aside>
//           )}

//           <main className={`flex-1 overflow-y-auto ${view === 'preview' ? 'p-0' : 'p-3 sm:p-6'}`}>
//             {view === 'edit' ? (
//               <SectionEditor />
//             ) : (
//               <div
//                 ref={previewRef}
//                 className="flex justify-center items-start min-h-full w-full bg-muted/30 p-2 sm:p-4 overflow-auto"
//               >
//                 <div
//                   data-preview-container
//                   className="shadow-2xl ring-1 ring-black/10 transition-all duration-200 w-full max-w-full"
//                   style={{
//                     transform: `scale(${zoom})`,
//                     transformOrigin: 'top center',
//                     width: 'fit-content',
//                   }}
//                 >
//                   <ResumeDocument resume={resume} zoom={1} />
//                 </div>
//               </div>
//             )}
//           </main>
//         </div>
//       </div>
//     </ResumeEditorProvider>
//   );
// }





















import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { SectionNav } from './section-nav';
import { SectionEditor } from './editor';
import { ResumeEditorProvider, resumeRepository } from '../../../lib/resume-store';
import { Resume, RESUME_TEMPLATES, createTemplateResume, createBlankResume } from '../../../data/resume';
// Import TemplateRenderer for preview – this replaces the missing ResumeDocument
import TemplateRenderer from './templates/TemplateRenderer';
import { Button } from '../../../components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Download, Loader2, ZoomIn, ZoomOut } from 'lucide-react';
import { Slider } from '../../../components/ui/slider';

const MIN_ZOOM = 0.3;
const MAX_ZOOM = 1.2;
const DEFAULT_ZOOM = 0.6;

export default function ResumePage() {
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template');
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'edit' | 'preview'>('edit');
  const [downloading, setDownloading] = useState(false);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const previewRef = useRef<HTMLDivElement>(null);

  // Load resume (unchanged)
  useEffect(() => {
    const loadResume = async () => {
      setLoading(true);
      try {
        let targetResume: Resume;
        if (templateId) {
          const templateExists = RESUME_TEMPLATES.some((t) => t.id === templateId);
          if (templateExists) {
            targetResume = createTemplateResume(templateId);
          } else {
            targetResume = createBlankResume('My Resume');
          }
        } else {
          const existing = resumeRepository.list();
          if (existing.length > 0) targetResume = existing[0];
          else targetResume = createBlankResume('My Resume');
        }
        await resumeRepository.save(targetResume);
        setResume(targetResume);
      } catch (error) {
        console.error('Failed to load resume:', error);
        const blank = createBlankResume('My Resume');
        await resumeRepository.save(blank);
        setResume(blank);
      } finally {
        setLoading(false);
      }
    };
    loadResume();
  }, [templateId]);

  // PDF download (unchanged)
  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
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

  const handleZoomIn = () => setZoom((prev) => Math.min(MAX_ZOOM, prev + 0.1));
  const handleZoomOut = () => setZoom((prev) => Math.max(MIN_ZOOM, prev - 0.1));
  const handleZoomChange = (val: number[]) => setZoom(val[0]);

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
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-3 py-2 sm:px-4">
          <Tabs value={view} onValueChange={(v) => setView(v as 'edit' | 'preview')}>
            <TabsList>
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-wrap items-center gap-2">
            {view === 'preview' && (
              <div className="flex items-center gap-2 mr-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomOut}
                  disabled={zoom <= MIN_ZOOM}
                  className="h-8 w-8 p-0"
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium min-w-[40px] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomIn}
                  disabled={zoom >= MAX_ZOOM}
                  className="h-8 w-8 p-0"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <div className="hidden sm:block w-24">
                  <Slider
                    value={[zoom]}
                    min={MIN_ZOOM}
                    max={MAX_ZOOM}
                    step={0.05}
                    onValueChange={handleZoomChange}
                  />
                </div>
              </div>
            )}

            <Button
              variant="hero"
              size="sm"
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="h-8 px-3 text-xs sm:h-9 sm:px-4 sm:text-sm"
            >
              {downloading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              <span className="hidden sm:inline ml-1">Download PDF</span>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex min-h-0 overflow-hidden">
          {view === 'edit' ? (
            // ---- EDIT MODE ----
            // Two‑column layout: left = section navigation, right = editor
            <div className="w-full grid grid-cols-1 md:grid-cols-[280px,1fr] gap-0 overflow-hidden">
              {/* Left column: SectionNav as a vertical list */}
              {/* <div className="border-b md:border-b-0 md:border-r border-border overflow-y-auto bg-muted/10 p-3 md:p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-3 hidden md:block">
                  Sections
                </h3>
                <SectionNav />
              </div> */}

              {/* Right column: Editor */}
              <div className="overflow-y-auto p-4 md:p-6 bg-background">
                <SectionEditor />
              </div>
            </div>
          ) : (
            // ---- PREVIEW MODE ----
            // Full page preview with zoom
            <div
              ref={previewRef}
              className="flex-1 overflow-y-auto bg-muted/30 p-4 flex justify-center items-start"
            >
              <div
                className="shadow-2xl ring-1 ring-black/10 transition-all duration-200"
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: 'top center',
                }}
              >
                {/* Use TemplateRenderer for preview – it accepts templateId and resume */}
                <TemplateRenderer templateId={resume.style.templateId} resume={resume} />
              </div>
            </div>
          )}
        </div>
      </div>
    </ResumeEditorProvider>
  );
}











// import { useEffect, useState, useRef } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import { SectionNav } from './section-nav';
// import { SectionEditor } from './editor';
// import { ResumeEditorProvider, resumeRepository } from '../../../lib/resume-store';
// import { Resume, RESUME_TEMPLATES, createTemplateResume, createBlankResume } from '../../../data/resume';
// import { ResumeDocument } from './preview';
// import { Button } from '../../../components/ui/button';
// import { Tabs, TabsList, TabsTrigger } from '../../../components/ui/tabs';
// import { Download, Loader2, ZoomIn, ZoomOut } from 'lucide-react';
// import { Slider } from '../../../components/ui/slider';

// const MIN_ZOOM = 0.3;
// const MAX_ZOOM = 1.2;
// const DEFAULT_ZOOM = 0.6;

// export default function ResumePage() {
//   const [searchParams] = useSearchParams();
//   const templateId = searchParams.get('template');
//   const [resume, setResume] = useState<Resume | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [view, setView] = useState<'edit' | 'preview'>('edit');
//   const [downloading, setDownloading] = useState(false);
//   const [zoom, setZoom] = useState(DEFAULT_ZOOM);
//   const previewRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const loadResume = async () => {
//       setLoading(true);
//       try {
//         let targetResume: Resume;

//         // If templateId is provided, create a new resume from that template
//         if (templateId) {
//           // Check if template exists in RESUME_TEMPLATES
//           const templateExists = RESUME_TEMPLATES.some((t) => t.id === templateId);
//           if (templateExists) {
//             // ✅ CRITICAL FIX: Load BOTH style AND content from template
//             targetResume = createTemplateResume(templateId);
//           } else {
//             targetResume = createBlankResume('My Resume');
//           }
//         } else {
//           const existingResumes = resumeRepository.list();
//           if (existingResumes.length > 0) {
//             targetResume = existingResumes[0];
//           } else {
//             targetResume = createBlankResume('My Resume');
//           }
//         }

//         await resumeRepository.save(targetResume);
//         setResume(targetResume);
//       } catch (error) {
//         console.error('Failed to load resume:', error);
//         const blank = createBlankResume('My Resume');
//         await resumeRepository.save(blank);
//         setResume(blank);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadResume();
//   }, [templateId]);

//   const handleDownloadPDF = async () => {
//     if (!previewRef.current) return;
//     setDownloading(true);
//     try {
//       const previewElement = previewRef.current.querySelector('[data-preview-container]');
//       if (!previewElement) throw new Error('Preview element not found');

//       const canvas = await html2canvas(previewElement as HTMLElement, {
//         scale: 2,
//         useCORS: true,
//         logging: false,
//         backgroundColor: '#ffffff',
//       });
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF({
//         orientation: 'portrait',
//         unit: 'px',
//         format: [canvas.width, canvas.height],
//       });
//       pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
//       pdf.save('resume.pdf');
//     } catch (error) {
//       console.error('PDF download failed:', error);
//     }
//     setDownloading(false);
//   };

//   const handleZoomIn = () => setZoom((prev) => Math.min(MAX_ZOOM, prev + 0.1));
//   const handleZoomOut = () => setZoom((prev) => Math.max(MIN_ZOOM, prev - 0.1));
//   const handleZoomChange = (value: number[]) => setZoom(value[0]);

//   if (loading || !resume) {
//     return (
//       <div className="flex h-full items-center justify-center">
//         <p className="text-muted-foreground">Loading resume…</p>
//       </div>
//     );
//   }

//   return (
//     <ResumeEditorProvider initial={resume}>
//       <div className="flex h-full min-h-0 flex-col">
//         {/* Toolbar */}
//         <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-3 py-2 sm:px-4">
//           <Tabs value={view} onValueChange={(v) => setView(v as 'edit' | 'preview')}>
//             <TabsList>
//               <TabsTrigger value="edit">Edit</TabsTrigger>
//               <TabsTrigger value="preview">Preview</TabsTrigger>
//             </TabsList>
//           </Tabs>

//           <div className="flex flex-wrap items-center gap-2">
//             {view === 'preview' && (
//               <div className="flex items-center gap-2 mr-2">
//                 <Button variant="outline" size="sm" onClick={handleZoomOut} disabled={zoom <= MIN_ZOOM} className="h-8 w-8 p-0">
//                   <ZoomOut className="h-4 w-4" />
//                 </Button>
//                 <span className="text-sm font-medium min-w-[40px] text-center">{Math.round(zoom * 100)}%</span>
//                 <Button variant="outline" size="sm" onClick={handleZoomIn} disabled={zoom >= MAX_ZOOM} className="h-8 w-8 p-0">
//                   <ZoomIn className="h-4 w-4" />
//                 </Button>
//                 <div className="hidden sm:block w-24">
//                   <Slider value={[zoom]} min={MIN_ZOOM} max={MAX_ZOOM} step={0.05} onValueChange={handleZoomChange} />
//                 </div>
//               </div>
//             )}

//             <Button variant="hero" size="sm" onClick={handleDownloadPDF} disabled={downloading} className="h-8 px-3 text-xs sm:h-9 sm:px-4 sm:text-sm">
//               {downloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
//               <span className="hidden sm:inline ml-1">Download PDF</span>
//             </Button>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 flex min-h-0 overflow-hidden flex-col sm:flex-row">
//           {view === 'edit' && (
//             <aside className="w-full sm:w-64 shrink-0 border-b sm:border-b-0 sm:border-r border-border overflow-y-auto max-h-[200px] sm:max-h-full">
//               <SectionNav />
//             </aside>
//           )}

//           <main className={`flex-1 overflow-y-auto ${view === 'preview' ? 'p-0' : 'p-3 sm:p-6'}`}>
//             {view === 'edit' ? (
//               <SectionEditor />
//             ) : (
//               <div ref={previewRef} className="flex justify-center items-start min-h-full w-full bg-muted/30 p-2 sm:p-4 overflow-auto">
//                 <div
//                   data-preview-container
//                   className="shadow-2xl ring-1 ring-black/10 transition-all duration-200 w-full max-w-full"
//                   style={{
//                     transform: `scale(${zoom})`,
//                     transformOrigin: 'top center',
//                     width: 'fit-content',
//                   }}
//                 >
//                   <ResumeDocument resume={resume} zoom={1} />
//                 </div>
//               </div>
//             )}
//           </main>
//         </div>
//       </div>
//     </ResumeEditorProvider>
//   );
// }
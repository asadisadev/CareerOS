import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { ResumeDocument } from '../app/resume/preview';
import { RESUME_TEMPLATES, MOCK_RESUMES } from '../../data/resume';
import type { Resume } from '../../data/resume';

export function TemplatesCarousel() {
  const navigate = useNavigate();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    containScroll: 'keepSnaps',
    dragFree: false,
    loop: false,
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 640px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 },
    },
  });

  const baseResume = MOCK_RESUMES[0];

  const templateResumes = RESUME_TEMPLATES.map((template) => {
    const styledResume: Resume = {
      ...baseResume,
      style: {
        ...baseResume.style,
        templateId: template.id,
        layout: template.layout,
        accent: template.accent,
        sectionStyle: template.sectionStyle,
      },
    };
    return { template, resume: styledResume };
  });

  const handleUseTemplate = (templateId: string) => {
    navigate(`/app/resume?template=${templateId}`);
  };

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section className="border-t border-border px-5 py-20 sm:py-24 lg:px-8 bg-card/30">
      <div className="mx-auto w-full max-w-7xl">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-2 rounded-full bg-primary/10 text-primary">
            <Sparkles className="mr-1 h-3.5 w-3.5" /> Templates
          </Badge>
          <h2 className="text-3xl font-bold sm:text-4xl">Choose your resume template</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Browse our professionally designed templates. Click to start editing.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-5">
              {templateResumes.map(({ template, resume }) => (
                <div
                  key={template.id}
                  className="min-w-[220px] max-w-[280px] flex-[0_0_auto] group"
                >
                  <Card className="relative h-full overflow-hidden rounded-2xl border-border/70 shadow-soft transition-shadow hover:shadow-lift">
                    <div className="p-3 bg-muted/20 flex items-center justify-center" style={{ height: 300 }}>
                      <ResumeDocument
                        resume={resume}
                        zoom={0.2}
                        className="pointer-events-none"
                      />
                    </div>

                    <CardContent className="p-3 flex items-start justify-between gap-2 border-t border-border/50">
                      <div>
                        <h3 className="truncate text-sm font-semibold">{template.name}</h3>
                        <p className="truncate text-[0.7rem] text-muted-foreground">{template.description}</p>
                      </div>
                      {template.tier === 'spark' && (
                        <Badge className="rounded-full text-[0.6rem] bg-gradient-brand text-primary-foreground">
                          Spark
                        </Badge>
                      )}
                    </CardContent>

                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100 rounded-2xl p-4">
                      <Button
                        variant="hero"
                        size="sm"
                        className="w-full gap-1"
                        onClick={() => handleUseTemplate(template.id)}
                      >
                        Use this template <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background border border-border rounded-full p-2 shadow-md z-10 hidden sm:block"
            aria-label="Previous templates"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background border border-border rounded-full p-2 shadow-md z-10 hidden sm:block"
            aria-label="Next templates"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="mt-6 flex justify-center gap-1 text-xs text-muted-foreground">
            <span>←</span>
            <span>Drag to scroll or use arrows</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </section>
  );
}
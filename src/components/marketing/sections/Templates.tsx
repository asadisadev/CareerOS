import { LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { ArrowRight, Crown, Sparkles } from 'lucide-react';
import { RESUME_TEMPLATES } from '../../../data/resume';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../../components/ui/carousel';

const TEMPLATE_IMAGES: Record<string, string> = {
  'minimal-ats': '/templates/minimal-ats.png',
  'professional': '/templates/professional.png',
  'modern': '/templates/modern.png',
  'executive': '/templates/executive.png',
  'developer': '/templates/developer.png',
  'creative': '/templates/creative.png',
  'elegant': '/templates/elegant.png',
  'tech': '/templates/tech.png',
  'corporate': '/templates/corporate.png',
  'academic': '/templates/academic.png',
  // 'premium': '/templates/premium.png',
};

const FEATURED_TEMPLATES = [
  'premium', 'executive', 'corporate', 'modern',
  'tech', 'elegant', 'professional', 'developer',
  'creative', 'academic', 'minimal-ats',
];

export function TemplatesSection() {
  const templates = FEATURED_TEMPLATES
    .map(id => RESUME_TEMPLATES.find(t => t.id === id))
    .filter(Boolean);

  return (
    <section className="py-20 bg-muted/30" id="templates">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            {/* <Crown className="h-6 w-6 text-primary" /> */}
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              {/* Premium Resume Templates */}
              Resume Templates
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Professional CV Templates
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose from professionally designed templates used by recruiters.
            {/* <span className="block text-sm mt-2 text-primary font-medium">
              🔥 All templates include real content — just edit and save!
            </span> */}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {templates.map((template) => {
                if (!template) return null;
                const imageUrl = TEMPLATE_IMAGES[template.id];
                const isPremium = template.tier === 'spark';
                const isExecutive = template.id === 'executive' || template.id === 'premium' || template.id === 'corporate';

                return (
                  <CarouselItem key={template.id} className="basis-1/1 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <div className="p-1">
                      <div className="group relative bg-white dark:bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-border hover:border-primary/30 h-full">
                        {/* Badges */}
                        {isPremium && (
                          <div className="absolute top-3 right-3 z-10">
                            {/* <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-lg flex items-center gap-1">
                              <Crown className="h-3 w-3" /> PRO
                            </span> */}
                          </div>
                        )}
                        {isExecutive && (
                          <div className="absolute top-3 left-3 z-10">
                            <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg flex items-center gap-1">
                              <LayoutGrid className="h-3 w-3" /> Executive
                            </span>
                          </div>
                        )}

                        <Link to={`/app/resume?template=${template.id}`} className="block">
                          <div className="aspect-[1/1.4] bg-gradient-to-b from-muted/30 to-muted/50 p-3 flex items-center justify-center overflow-hidden">
                            <img
                              src={imageUrl}
                              alt={template.name}
                              className="w-full h-full object-contain rounded transition-transform duration-300 group-hover:scale-105 shadow-sm"
                              loading="lazy"
                            />
                          </div>
                        </Link>

                        <div className="p-4">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-lg">{template.name}</h3>
                            {/* {isPremium && (
                              <span className="text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded-full">
                                Premium
                              </span>
                            )} */}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {template.description}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 flex-wrap">
                            <span className="px-2 py-0.5 bg-muted rounded">
                              {template.layout === 'sidebar' ? '📐 Two-Column' : '📄 Single-Column'}
                            </span>
                            <span className="px-2 py-0.5 bg-muted rounded capitalize">
                              {template.sectionStyle}
                            </span>
                          </div>
                          <Link to={`/app/resume?template=${template.id}`}>
                            <Button variant={isPremium ? 'hero' : 'outline'} size="sm" className="w-full group/btn">
                              {isPremium ? '🚀 Use Template' : 'Use Template'}
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
          </Carousel>
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link to="/templates">
              View All Templates
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
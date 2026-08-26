import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Crown, Sparkles, LayoutGrid } from 'lucide-react';
import { RESUME_TEMPLATES } from '../../data/resume';

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
  'premium': '/templates/premium.png',
};

export function TemplatesPage() {
  const premiumTemplates = RESUME_TEMPLATES.filter(t => t.tier === 'spark');
  const freeTemplates = RESUME_TEMPLATES.filter(t => t.tier === 'free');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="h-8 w-8 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Professional CV Templates</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Resume Template
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Browse our professionally designed templates used by top recruiters. 
            Each template includes realistic content to get you started.
          </p>
        </div>
      </section>

      {/* Premium Templates */}
      <section className="py-12 container mx-auto px-4 max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                PRO
              </span>
              Premium Templates
            </h2>
            <p className="text-muted-foreground">Professional formats with advanced layouts</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {premiumTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} isPremium={true} />
          ))}
        </div>
      </section>

      {/* Free Templates */}
      <section className="py-12 bg-muted/30 container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              FREE
            </span>
            Starter Templates
          </h2>
          <p className="text-muted-foreground">Great for quick starts and ATS optimization</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {freeTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} isPremium={false} />
          ))}
        </div>
      </section>

      {/* Upgrade CTA */}
      <section className="py-16 container mx-auto px-4 max-w-4xl text-center">
        <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-2xl p-8 md:p-12 border border-primary/20">
          <h3 className="text-2xl font-bold mb-2">Need Premium Templates?</h3>
          <p className="text-muted-foreground mb-6">
            Get access to all premium templates, advanced layouts, and unlimited resumes
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/pricing">
              Upgrade Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

// Template Card Component
function TemplateCard({ template, isPremium }: { template: any; isPremium: boolean }) {
  const imageUrl = TEMPLATE_IMAGES[template.id];

  return (
    <div className="group relative bg-white dark:bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-border hover:border-primary/30">
      {isPremium && (
        <div className="absolute top-3 right-3 z-10">
          <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-lg flex items-center gap-1">
            <Crown className="h-3 w-3" /> PRO
          </span>
        </div>
      )}

      <Link to={`/app/resume?template=${template.id}`} className="block">
        <div className="aspect-[1/1.4] bg-gradient-to-b from-muted/30 to-muted/50 p-3 flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={template.name}
              className="w-full h-full object-contain rounded transition-transform duration-300 group-hover:scale-105 shadow-sm"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted rounded">
              <span className="text-muted-foreground text-sm">Preview</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <h3 className="font-semibold text-base">{template.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{template.description}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 flex-wrap">
          <span className="px-2 py-0.5 bg-muted rounded">
            {template.layout === 'sidebar' ? '📐 Two-Column' : '📄 Single-Column'}
          </span>
          <span className="px-2 py-0.5 bg-muted rounded capitalize">{template.sectionStyle}</span>
        </div>

        <Link to={`/app/resume?template=${template.id}`}>
          <Button variant={isPremium ? 'hero' : 'outline'} size="sm" className="w-full group/btn">
            {isPremium ? '🚀 Use Template' : 'Use Template'}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
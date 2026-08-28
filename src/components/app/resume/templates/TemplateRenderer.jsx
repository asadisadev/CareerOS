import MinimalATS from './MinimalATS';
import Modern from './Modern';
import Professional from './Professional';
import Tech from './Tech';
import Corporate from './Corporate';
import Developer from './Developer';
import Elegant from './Elegant';
import Executive from './Executive';

const TEMPLATE_MAP = {
  'minimal-ats': MinimalATS,
  'modern': Modern,
  'professional': Professional,
  'tech': Tech,
  'corporate': Corporate,
  'developer': Developer,
  'elegant': Elegant,
  'executive': Executive,
};

export default function TemplateRenderer({ templateId, resume, zoom = 1 }) {
  const Component = TEMPLATE_MAP[templateId] || MinimalATS;
  return <Component resume={resume} zoom={zoom} />;
}
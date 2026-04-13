"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  MoveUp, 
  MoveDown, 
  Smartphone, 
  Monitor, 
  Laptop, 
  Image as ImageIcon,
  Type,
  Layout,
  Star,
  DollarSign,
  Settings2,
  Sparkles,
  HelpCircle,
  Megaphone,
  X,
  LayoutTemplate,
  ChevronDown,
  Check,
  MousePointer2
} from 'lucide-react';

// --- TYPES ---
type BlockType = 'HERO' | 'FEATURES' | 'PRICING' | 'TESTIMONIALS' | 'CTA' | 'FAQ' | 'FOOTER';

interface Block {
  id: string;
  type: BlockType;
  content: any;
}

// --- DEMO DATA ---
const DEMO_CONTENT: Record<BlockType, any> = {
  HERO: {
    title: 'Transform Your Health with Precision Care',
    subtitle: 'Expert medical consultation and personalized wellness plans tailored to your unique lifestyle.',
    cta: 'Get Started Today',
    ctaLink: '#',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200',
    accentColor: '#84cc16',
    bgColor: '#ffffff',
    textColor: '#111827'
  },
  FEATURES: {
    title: 'Why Choose HealoXa?',
    accentColor: '#84cc16',
    bgColor: '#f9fafb',
    textColor: '#111827',
    items: [
      { id: '1', title: 'Advanced Technology', description: 'Using latest AI-driven diagnostics for accuracy.' },
      { id: '2', title: 'Fast Results', description: 'Get your health reports within 24 hours.' },
      { id: '3', title: 'Expert Team', description: 'Over 50+ specialized doctors at your service.' }
    ]
  },
  PRICING: {
    title: 'Transparent Plans',
    accentColor: '#84cc16',
    bgColor: '#ffffff',
    textColor: '#111827',
    plans: [
      { name: 'Basic', price: '$49', features: ['General Checkup', 'Digital Reports', 'Email Support'], popular: false },
      { name: 'Pro', price: '$99', features: ['Everything in Basic', 'Specialist Consultation', 'Video Call'], popular: true },
      { name: 'Elite', price: '$199', features: ['Everything in Pro', 'Home Sample Collection', '24/7 Priority Support'], popular: false }
    ]
  },
  TESTIMONIALS: {
    title: 'What Our Patients Say',
    accentColor: '#84cc16',
    bgColor: '#f9fafb',
    textColor: '#111827',
    quotes: [
      { author: 'Sarah Johnson', role: 'Business Owner', text: '“The level of care I received at HealoXa was exceptional. The digital reports were so easy to understand.”' },
      { author: 'Michael Chen', role: 'Software Engineer', text: '“Quick, efficient, and professional. The best medical experience I’ve had in years.”' }
    ]
  },
  CTA: {
    title: 'Ready to take control of your health?',
    subtitle: 'Join over 10,000+ patients who trust HealoXa for their daily wellness.',
    buttonText: 'Book an Appointment Now',
    buttonLink: '#',
    bgColor: '#84cc16',
    textColor: '#ffffff'
  },
  FAQ: {
    title: 'Frequently Asked Questions',
    accentColor: '#84cc16',
    bgColor: '#ffffff',
    textColor: '#111827',
    questions: [
      { q: 'How do I book a consultation?', a: 'You can book directly through our app or website. Simply select a specialist and choose a time slot.' },
      { q: 'Is my health data secure?', a: 'Absolutely. We use industry-standard encryption and comply with all healthcare privacy regulations.' },
      { q: 'Can I get a refund if I cancel?', a: 'Yes, if you cancel at least 24 hours before your scheduled appointment, you will receive a full refund.' }
    ]
  },
  FOOTER: {
    company: 'HealoXa',
    tagline: 'Your partner in modern healthcare.',
    bgColor: '#111827',
    textColor: '#ffffff',
    links: [
      { label: 'Privacy Policy', url: '#' },
      { label: 'Terms of Service', url: '#' },
      { label: 'Contact Us', url: '#' }
    ]
  }
};

// --- HELPERS ---

const ListEditor = ({ items, onAdd, onRemove, renderItem }: { items: any[], onAdd: () => void, onRemove: (idx: number) => void, renderItem: (item: any, idx: number) => React.ReactNode }) => {
  return (
    <div className="space-y-3">
      {(items || []).map((item, index) => (
        <div key={index} className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl relative group/item">
          <button 
            onClick={() => onRemove(index)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity z-10 shadow-lg"
          >
            <Trash2 size={12} />
          </button>
          {renderItem(item, index)}
        </div>
      ))}
      <button 
        onClick={onAdd}
        className="w-full p-3 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl text-gray-400 hover:text-lime-500 hover:border-lime-500 transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest"
      >
        <Plus size={14} /> Add Item
      </button>
    </div>
  );
};

const SectionHeader = ({ title }: { title: string }) => (
  <div className="pt-4 pb-2 border-b border-gray-100 dark:border-gray-800 mb-4">
    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{title}</h3>
  </div>
);

const Field = ({ label, children }: { label: string, children: React.ReactNode }) => (
  <div className="space-y-2 mb-4">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">{label}</label>
    {children}
  </div>
);

// --- COMPONENTS ---

const Sidebar = ({ onAddBlock }: { onAddBlock: (type: BlockType) => void }) => {
  const componentTemplates = [
    { type: 'HERO', label: 'Hero Section', icon: <ImageIcon size={18} /> },
    { type: 'FEATURES', label: 'Features Grid', icon: <Layout size={18} /> },
    { type: 'CTA', label: 'Call to Action', icon: <Megaphone size={18} /> },
    { type: 'PRICING', label: 'Pricing Table', icon: <DollarSign size={18} /> },
    { type: 'TESTIMONIALS', label: 'Testimonials', icon: <Star size={18} /> },
    { type: 'FAQ', label: 'FAQ Section', icon: <HelpCircle size={18} /> },
    { type: 'FOOTER', label: 'Simple Footer', icon: <Type size={18} /> },
  ];

  return (
    <div className="w-64 bg-white dark:bg-[#0a0a0a] border-r border-gray-100 dark:border-gray-800 flex flex-col h-full shrink-0">
      <div className="p-5 border-b border-gray-100 dark:border-gray-800">
        <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest">Components</h2>
      </div>
      <div className="p-3 space-y-2 overflow-y-auto flex-1">
        {componentTemplates.map((template) => (
          <div
            key={template.type}
            draggable
            onDragStart={(e) => e.dataTransfer.setData('blockType', template.type)}
            onClick={() => onAddBlock(template.type as BlockType)}
            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl cursor-grab hover:border-lime-500 transition-all group"
          >
            <div className="p-2 bg-white dark:bg-gray-800 rounded-lg group-hover:text-lime-500 transition-colors">
              {template.icon}
            </div>
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{template.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SettingsPanel = ({ block, onUpdate, onClose }: { block: Block, onUpdate: (newContent: any) => void, onClose: () => void }) => {
  const [localContent, setLocalContent] = useState(block.content);

  useEffect(() => {
    setLocalContent(block.content);
  }, [block]);

  const handleChange = (key: string, value: any) => {
    const updated = { ...localContent, [key]: value };
    setLocalContent(updated);
    onUpdate(updated);
  };

  const updateListItem = (listKey: string, index: number, field: string, value: any) => {
    const list = [...(localContent[listKey] || [])];
    list[index] = { ...list[index], [field]: value };
    handleChange(listKey, list);
  };

  const renderBackgroundEditor = () => (
    <>
      <SectionHeader title="Design Settings" />
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Field label="Background">
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 p-2 rounded-xl border border-gray-100 dark:border-gray-800">
            <input 
              type="color"
              value={localContent.bgColor || '#ffffff'}
              onChange={(e) => handleChange('bgColor', e.target.value)}
              className="w-6 h-6 rounded-md border-0 cursor-pointer p-0 overflow-hidden"
            />
            <span className="text-[10px] font-mono text-gray-500 uppercase">{localContent.bgColor || '#ffffff'}</span>
          </div>
        </Field>
        <Field label="Text Color">
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 p-2 rounded-xl border border-gray-100 dark:border-gray-800">
            <input 
              type="color"
              value={localContent.textColor || '#111827'}
              onChange={(e) => handleChange('textColor', e.target.value)}
              className="w-6 h-6 rounded-md border-0 cursor-pointer p-0 overflow-hidden"
            />
            <span className="text-[10px] font-mono text-gray-500 uppercase">{localContent.textColor || '#111827'}</span>
          </div>
        </Field>
      </div>
      {block.type !== 'CTA' && block.type !== 'FOOTER' && (
        <Field label="Accent Color">
          <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-900 p-2 rounded-xl border border-gray-100 dark:border-gray-800">
            <input 
              type="color"
              value={localContent.accentColor || '#84cc16'}
              onChange={(e) => handleChange('accentColor', e.target.value)}
              className="w-10 h-6 rounded-md border-0 cursor-pointer p-0 overflow-hidden"
            />
            <span className="text-[10px] font-mono text-gray-500">{localContent.accentColor || '#84cc16'}</span>
          </div>
        </Field>
      )}
    </>
  );

  const renderFields = () => {
    if (!localContent) return null;
    switch (block.type) {
      case 'HERO':
        return (
          <div className="space-y-4">
            {renderBackgroundEditor()}
            <SectionHeader title="Content" />
            <Field label="Main Title">
              <textarea 
                value={localContent.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 outline-none text-xs font-semibold h-20"
              />
            </Field>
            <Field label="Subtitle">
              <textarea 
                value={localContent.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-lime-500/20 text-xs h-24"
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="CTA Text">
                <input 
                  type="text"
                  value={localContent.cta}
                  onChange={(e) => handleChange('cta', e.target.value)}
                  className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-lime-500/20 text-xs font-bold"
                />
              </Field>
              <Field label="CTA Link">
                <input 
                  type="text"
                  value={localContent.ctaLink}
                  onChange={(e) => handleChange('ctaLink', e.target.value)}
                  className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-lime-500/20 text-xs"
                />
              </Field>
            </div>
            <Field label="Hero Image URL">
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={localContent.image}
                  onChange={(e) => handleChange('image', e.target.value)}
                  className="flex-1 p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-lime-500/20 text-[10px]"
                />
                <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0 border border-gray-200 dark:border-gray-700">
                  <img src={localContent.image} className="w-full h-full object-cover" />
                </div>
              </div>
            </Field>
          </div>
        );
      case 'FEATURES':
        return (
          <div className="space-y-4">
            {renderBackgroundEditor()}
            <SectionHeader title="Content" />
            <Field label="Section Heading">
              <input 
                type="text"
                value={localContent.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-lime-500/20 text-xs font-bold"
              />
            </Field>
            <SectionHeader title="Feature Items" />
            <ListEditor 
              items={localContent.items}
              onAdd={() => handleChange('items', [...localContent.items, { id: Math.random().toString(), title: 'New Feature', description: 'Feature description goes here.' }])}
              onRemove={(idx) => handleChange('items', localContent.items.filter((_: any, i: number) => i !== idx))}
              renderItem={(item, idx) => (
                <div className="space-y-3">
                  <input 
                    className="w-full bg-transparent border-none p-0 focus:ring-0 font-bold text-xs" 
                    placeholder="Feature Title"
                    value={item.title} 
                    onChange={(e) => updateListItem('items', idx, 'title', e.target.value)}
                  />
                  <textarea 
                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-[11px] text-gray-500 h-12" 
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => updateListItem('items', idx, 'description', e.target.value)}
                  />
                </div>
              )}
            />
          </div>
        );
      case 'PRICING':
        return (
          <div className="space-y-4">
            {renderBackgroundEditor()}
            <SectionHeader title="Content" />
            <Field label="Section Heading">
              <input 
                type="text"
                value={localContent.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-lime-500/20 text-xs font-bold"
              />
            </Field>
            <SectionHeader title="Pricing Plans" />
            <ListEditor 
              items={localContent.plans}
              onAdd={() => handleChange('plans', [...localContent.plans, { name: 'New Plan', price: '$99', features: ['Feature 1', 'Feature 2'], popular: false }])}
              onRemove={(idx) => handleChange('plans', localContent.plans.filter((_: any, i: number) => i !== idx))}
              renderItem={(plan, idx) => (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <input 
                      className="bg-transparent border-none p-0 focus:ring-0 font-bold text-xs w-2/3" 
                      value={plan.name} 
                      onChange={(e) => updateListItem('plans', idx, 'name', e.target.value)}
                    />
                    <input 
                      className="bg-transparent border-none p-0 focus:ring-0 font-bold text-xs text-lime-500 text-right w-1/3" 
                      value={plan.price} 
                      onChange={(e) => updateListItem('plans', idx, 'price', e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={plan.popular} 
                      onChange={(e) => updateListItem('plans', idx, 'popular', e.target.checked)}
                      className="rounded border-gray-300 text-lime-500 focus:ring-lime-500"
                    />
                    <span className="text-[10px] text-gray-400 font-bold uppercase">Popular Tag</span>
                  </div>
                  <textarea 
                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-[10px] text-gray-500 h-16 bg-gray-100/50 dark:bg-gray-800/50 rounded-lg p-2" 
                    placeholder="Features (one per line)"
                    value={plan.features.join('\n')}
                    onChange={(e) => updateListItem('plans', idx, 'features', e.target.value.split('\n'))}
                  />
                </div>
              )}
            />
          </div>
        );
      case 'TESTIMONIALS':
        return (
          <div className="space-y-4">
            {renderBackgroundEditor()}
            <SectionHeader title="Content" />
            <Field label="Section Heading">
              <input 
                type="text"
                value={localContent.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-lime-500/20 text-xs font-bold"
              />
            </Field>
            <SectionHeader title="Quotes" />
            <ListEditor 
              items={localContent.quotes}
              onAdd={() => handleChange('quotes', [...localContent.quotes, { author: 'Full Name', role: 'Job Title', text: '“Enter testimonial text here.”' }])}
              onRemove={(idx) => handleChange('quotes', localContent.quotes.filter((_: any, i: number) => i !== idx))}
              renderItem={(quote, idx) => (
                <div className="space-y-3">
                  <input 
                    className="w-full bg-transparent border-none p-0 focus:ring-0 font-bold text-xs" 
                    value={quote.author} 
                    onChange={(e) => updateListItem('quotes', idx, 'author', e.target.value)}
                  />
                  <input 
                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-[10px] text-gray-400" 
                    value={quote.role} 
                    onChange={(e) => updateListItem('quotes', idx, 'role', e.target.value)}
                  />
                  <textarea 
                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-[11px] text-gray-500 italic h-16" 
                    value={quote.text}
                    onChange={(e) => updateListItem('quotes', idx, 'text', e.target.value)}
                  />
                </div>
              )}
            />
          </div>
        );
      case 'CTA':
        return (
          <div className="space-y-4">
            {renderBackgroundEditor()}
            <SectionHeader title="Content" />
            <Field label="Heading">
              <textarea 
                value={localContent.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-lime-500/20 text-xs font-bold h-20"
              />
            </Field>
            <Field label="Subtitle">
              <textarea 
                value={localContent.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-lime-500/20 text-xs h-24"
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Button Text">
                <input 
                  type="text"
                  value={localContent.buttonText}
                  onChange={(e) => handleChange('buttonText', e.target.value)}
                  className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-lime-500/20 text-xs font-bold"
                />
              </Field>
              <Field label="Link">
                <input 
                  type="text"
                  value={localContent.buttonLink}
                  onChange={(e) => handleChange('buttonLink', e.target.value)}
                  className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-lime-500/20 text-xs"
                />
              </Field>
            </div>
          </div>
        );
      case 'FAQ':
        return (
          <div className="space-y-4">
            {renderBackgroundEditor()}
            <SectionHeader title="Content" />
            <Field label="Heading">
              <input 
                type="text"
                value={localContent.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-lime-500/20 text-xs font-bold"
              />
            </Field>
            <SectionHeader title="Questions" />
            <ListEditor 
              items={localContent.questions}
              onAdd={() => handleChange('questions', [...localContent.questions, { q: 'Question?', a: 'Answer.' }])}
              onRemove={(idx) => handleChange('questions', localContent.questions.filter((_: any, i: number) => i !== idx))}
              renderItem={(item, idx) => (
                <div className="space-y-3">
                  <input 
                    className="w-full bg-transparent border-none p-0 focus:ring-0 font-bold text-xs" 
                    placeholder="Question"
                    value={item.q} 
                    onChange={(e) => updateListItem('questions', idx, 'q', e.target.value)}
                  />
                  <textarea 
                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-[11px] text-gray-500 h-16" 
                    placeholder="Answer"
                    value={item.a}
                    onChange={(e) => updateListItem('questions', idx, 'a', e.target.value)}
                  />
                </div>
              )}
            />
          </div>
        );
      case 'FOOTER':
        return (
          <div className="space-y-4">
            {renderBackgroundEditor()}
            <SectionHeader title="Company Info" />
            <Field label="Company Name">
              <input 
                type="text"
                value={localContent.company}
                onChange={(e) => handleChange('company', e.target.value)}
                className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-lime-500/20 text-xs font-bold"
              />
            </Field>
            <Field label="Tagline">
              <input 
                type="text"
                value={localContent.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-lime-500/20 text-xs"
              />
            </Field>
            <SectionHeader title="Footer Links" />
            <ListEditor 
              items={localContent.links}
              onAdd={() => handleChange('links', [...localContent.links, { label: 'New Link', url: '#' }])}
              onRemove={(idx) => handleChange('links', localContent.links.filter((_: any, i: number) => i !== idx))}
              renderItem={(linkItem, idx) => (
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    className="bg-transparent border-none p-0 focus:ring-0 font-bold text-xs" 
                    placeholder="Label"
                    value={linkItem.label} 
                    onChange={(e) => updateListItem('links', idx, 'label', e.target.value)}
                  />
                  <input 
                    className="bg-transparent border-none p-0 focus:ring-0 text-[10px] text-gray-400" 
                    placeholder="URL"
                    value={linkItem.url} 
                    onChange={(e) => updateListItem('links', idx, 'url', e.target.value)}
                  />
                </div>
              )}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-80 bg-white dark:bg-[#0a0a0a] border-l border-gray-100 dark:border-gray-800 flex flex-col h-full shrink-0">
      <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <h2 className="font-bold flex items-center gap-2 text-sm uppercase tracking-tighter">
          <Settings2 size={18} className="text-lime-500" />
          <span>Block Editor</span>
        </h2>
        <button onClick={onClose} className="p-1 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg text-gray-400 trasition-colors">
          <X size={18} />
        </button>
      </div>
      <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
        <div className="inline-flex px-3 py-1 bg-lime-50 dark:bg-lime-900/20 rounded-full text-[10px] font-black text-lime-600 dark:text-lime-400 uppercase tracking-widest mb-6">
          {block.type} Element
        </div>
        {renderFields()}
      </div>
    </div>
  );
};

const BlockRenderer = ({ block, isSelected, onClick, onRemove, onMove }: { block: Block, isSelected: boolean, onClick: () => void, onRemove: () => void, onMove: (dir: 'up' | 'down') => void }) => {
  const { type, content } = block;

  const controls = (
    <div className={`absolute top-4 right-4 flex gap-2 transition-all duration-300 z-20 ${isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}>
      <div className="flex bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-2xl border border-white/20 dark:border-gray-700 rounded-2xl overflow-hidden">
        <button onClick={(e) => { e.stopPropagation(); onMove('up'); }} className="p-3 hover:text-lime-500 border-r border-gray-100 dark:border-gray-700 transition-colors"><MoveUp size={16} /></button>
        <button onClick={(e) => { e.stopPropagation(); onMove('down'); }} className="p-3 hover:text-lime-500 border-r border-gray-100 dark:border-gray-700 transition-colors"><MoveDown size={16} /></button>
        <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="p-3 text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={16} /></button>
      </div>
    </div>
  );

  const blockStyle = { 
    backgroundColor: content.bgColor,
    color: content.textColor
  };

  const accentColorStyle = { color: content.accentColor || '#84cc16' };
  const accentBgStyle = { backgroundColor: content.accentColor || '#84cc16' };

  return (
    <div 
      onClick={onClick}
      className={`relative group transition-all duration-300 ${isSelected ? 'ring-4 ring-lime-500/30 z-10' : 'hover:ring-2 hover:ring-gray-200 dark:hover:ring-gray-800'}`}
    >
      {controls}
      
      {(() => {
        switch (type) {
          case 'HERO':
            return (
              <section className="py-24" style={blockStyle}>
                <div className="max-w-[1140px] mx-auto px-6 flex flex-col items-center text-center">
                  <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight">
                    {content.title}
                  </h1>
                  <p className="text-xl opacity-70 mb-10 max-w-2xl leading-relaxed whitespace-pre-wrap">
                    {content.subtitle}
                  </p>
                  <a href={content.ctaLink} style={accentBgStyle} className="px-10 py-5 text-white rounded-2xl font-bold transition-all shadow-xl shadow-lime-500/20 text-lg mb-16 inline-block hover:scale-105 active:scale-95">
                    {content.cta}
                  </a>
                  <div className="w-full rounded-[48px] overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 aspect-video">
                     <img src={content.image} className="w-full h-full object-cover" alt="Hero" />
                  </div>
                </div>
              </section>
            );
          case 'CTA':
            return (
              <section className="py-24" style={blockStyle}>
                <div className="max-w-[1140px] mx-auto px-6">
                  <div style={accentBgStyle} className="rounded-[60px] p-12 md:p-24 text-center md:text-left shadow-2xl shadow-lime-500/20">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                      <div>
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight max-w-2xl">{content.title}</h2>
                        <p className="text-white/80 text-xl max-w-lg">{content.subtitle}</p>
                      </div>
                      <a href={content.buttonLink} className="px-12 py-7 bg-white text-gray-900 rounded-[32px] font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all shrink-0">
                        {content.buttonText}
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            );
          case 'FEATURES':
            return (
              <section className="py-24" style={blockStyle}>
                <div className="max-w-[1140px] mx-auto px-6 text-center">
                  <h2 className="text-4xl font-black mb-20">{content.title}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {(content.items || []).map((it: any) => (
                      <div key={it.id} className="p-10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-[40px] border border-gray-100 dark:border-gray-800 text-left hover:border-lime-500 transition-colors">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8" style={{ backgroundColor: `${content.accentColor || '#84cc16'}20` }}>
                          <Sparkles className="text-lime-500" style={accentColorStyle} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{it.title}</h3>
                        <p className="opacity-60 text-lg leading-relaxed">{it.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          case 'PRICING':
            return (
              <section className="py-24" style={blockStyle}>
                <div className="max-w-[1140px] mx-auto px-6 text-center">
                  <h2 className="text-4xl font-black mb-20">{content.title}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {(content.plans || []).map((plan: any, idx: number) => (
                      <div key={idx} className={`p-10 rounded-[48px] text-left border transition-all ${plan.popular ? 'border-lime-500 ring-4 ring-lime-500/10 scale-105' : 'border-gray-100 dark:border-gray-800'}`} style={{ backgroundColor: plan.popular ? (content.bgColor === '#ffffff' ? '#f0fdf4' : '#064e2b') : 'transparent' }}>
                        {plan.popular && <span className="px-4 py-1.5 bg-lime-500 text-white text-[10px] font-black rounded-full uppercase tracking-widest mb-6 inline-block">Most Popular</span>}
                        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                        <div className="text-5xl font-black mb-8">{plan.price}<span className="text-xl font-normal opacity-40">/mo</span></div>
                        <div className="space-y-4 mb-10">
                          {(plan.features || []).map((f: string, i: number) => (
                            <div key={i} className="flex items-center gap-3">
                              <div className="w-5 h-5 rounded-full bg-lime-500/20 flex items-center justify-center shrink-0">
                                <Check size={12} className="text-lime-500" />
                              </div>
                              <span className="text-sm opacity-80">{f}</span>
                            </div>
                          ))}
                        </div>
                        <button className={`w-full py-4 rounded-2xl font-bold transition-all ${plan.popular ? 'bg-lime-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'}`}>Choose Plan</button>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          case 'TESTIMONIALS':
            return (
              <section className="py-24" style={blockStyle}>
                <div className="max-w-[1140px] mx-auto px-6 text-center">
                  <h2 className="text-4xl font-black mb-20">{content.title}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {(content.quotes || []).map((q: any, i: number) => (
                      <div key={i} className="p-12 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-[48px] border border-gray-100 dark:border-gray-800 text-left">
                        <div className="flex gap-1 mb-8">
                          {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} className="fill-yellow-400 text-yellow-400" />)}
                        </div>
                        <p className="text-2xl font-medium mb-10 leading-relaxed italic">{q.text}</p>
                        <div>
                          <p className="font-black text-lg">{q.author}</p>
                          <p className="text-sm opacity-50">{q.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          case 'FAQ':
            return (
              <section className="py-24" style={blockStyle}>
                <div className="max-w-[1140px] mx-auto px-6">
                  <h2 className="text-4xl font-black mb-20 text-center">{content.title}</h2>
                  <div className="max-w-3xl mx-auto space-y-6">
                    {(content.questions || []).map((item: any, i: number) => (
                      <div key={i} className="p-8 bg-gray-50/50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-[32px]">
                        <h3 className="text-xl font-bold mb-4 flex justify-between items-center text-left">
                          {item.q}
                          <ChevronDown size={20} className="opacity-30" />
                        </h3>
                        <p className="text-lg opacity-60 leading-relaxed text-left">{item.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          case 'FOOTER':
            return (
              <footer className="py-20" style={blockStyle}>
                <div className="max-w-[1140px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
                  <div className="text-center md:text-left">
                    <h3 className="text-3xl font-black mb-2">{content.company}</h3>
                    <p className="opacity-50 text-sm">{content.tagline}</p>
                  </div>
                  <div className="flex gap-10 flex-wrap justify-center font-bold text-sm">
                    {(content.links || []).map((l: any, i: number) => (
                      <a key={i} href={l.url} className="opacity-60 hover:opacity-100 transition-opacity">{l.label}</a>
                    ))}
                  </div>
                </div>
                <div className="max-w-[1140px] mx-auto px-6 mt-16 pt-10 border-t border-white/10 text-center">
                  <p className="text-xs opacity-30">© {new Date().getFullYear()} {content.company}. All rights reserved.</p>
                </div>
              </footer>
            );
          default:
            return (
              <div className="py-20 text-center bg-gray-50 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
                <h3 className="text-2xl font-bold text-gray-400 capitalize">{type} Element</h3>
              </div>
            );
        }
      })()}
    </div>
  );
};

export default function PageCreator() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isDragOver, setIsDragOver] = useState(false);

  const addBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: JSON.parse(JSON.stringify(DEMO_CONTENT[type]))
    };
    setBlocks([...blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
  };

  const updateBlockContent = (id: string, newContent: any) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, content: newContent } : b));
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
    if (selectedBlockId === id) setSelectedBlockId(null);
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...blocks];
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= blocks.length) return;
    [newBlocks[index], newBlocks[target]] = [newBlocks[target], newBlocks[index]];
    setBlocks(newBlocks);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const type = e.dataTransfer.getData('blockType') as BlockType;
    if (type) addBlock(type);
  };

  const selectedBlock = blocks.find(b => b.id === selectedBlockId);

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col bg-white dark:bg-[#0a0a0a] rounded-[32px] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-2xl">
      {/* Local Toolbar */}
      <div className="h-16 border-b border-gray-100 dark:border-gray-800 px-6 flex items-center justify-between bg-white dark:bg-[#0a0a0a] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black">
            <LayoutTemplate size={16} />
          </div>
          <span className="text-sm font-black uppercase tracking-tighter">Site Builder</span>
        </div>

        <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 p-1 rounded-xl border border-gray-100 dark:border-gray-800">
           {['desktop', 'tablet', 'mobile'].map(mode => (
             <button 
               key={mode}
               onClick={() => setViewMode(mode as any)}
               className={`px-4 py-2 rounded-lg transition-all ${viewMode === mode ? 'bg-white dark:bg-gray-800 text-lime-500 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
             >
               {mode === 'desktop' ? <Monitor size={16} /> : mode === 'tablet' ? <Laptop size={16} /> : <Smartphone size={16} />}
             </button>
           ))}
        </div>

        <div className="flex gap-2">
          <button className="px-5 py-2.5 bg-lime-500 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-lime-600 shadow-lg shadow-lime-500/20 active:scale-95 transition-all">
            Save Changes
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden bg-gray-50/50 dark:bg-[#050505]">
        <Sidebar onAddBlock={addBlock} />

        <div 
          onClick={() => setSelectedBlockId(null)}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          className={`flex-1 overflow-y-auto p-12 flex justify-center transition-colors custom-scrollbar ${isDragOver ? 'bg-lime-50 dark:bg-lime-900/10' : ''}`}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`transition-all duration-700 bg-white dark:bg-black shadow-2xl rounded-[40px] overflow-hidden min-h-full h-fit border border-gray-100 dark:border-gray-800
              ${viewMode === 'desktop' ? 'w-full' : viewMode === 'tablet' ? 'w-[768px]' : 'w-[414px]'}`}
          >
            {blocks.length > 0 ? (
              <div className="flex flex-col">
                {blocks.map((block, index) => (
                  <BlockRenderer 
                    key={block.id} 
                    block={block} 
                    isSelected={selectedBlockId === block.id}
                    onClick={() => setSelectedBlockId(block.id)}
                    onRemove={() => removeBlock(block.id)}
                    onMove={(dir) => moveBlock(index, dir)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-20 py-48 text-center bg-white dark:bg-black min-h-[600px]">
                 <div className="w-24 h-24 bg-lime-500/10 rounded-[32px] flex items-center justify-center mb-8 animate-pulse">
                   <Plus size={40} className="text-lime-500" />
                 </div>
                 <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3 uppercase tracking-tighter">Canvas Empty</h2>
                 <p className="text-gray-400 max-w-xs text-sm">Drag components from the sidebar to start building your landing page.</p>
              </div>
            )}
          </div>
        </div>

        {selectedBlock ? (
          <SettingsPanel 
            block={selectedBlock} 
            onUpdate={(val) => updateBlockContent(selectedBlock.id, val)}
            onClose={() => setSelectedBlockId(null)}
          />
        ) : (
          <div className="w-80 bg-white dark:bg-[#0a0a0a] border-l border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center p-10 text-center text-gray-400 shrink-0">
             <MousePointer2 size={32} className="mb-4 opacity-20" />
             <p className="text-[10px] font-black uppercase tracking-widest">Select an element<br/>to edit properties</p>
          </div>
        )}
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1f2937;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}</style>
    </div>
  );
}

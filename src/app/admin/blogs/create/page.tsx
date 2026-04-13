"use client";

import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, Image as ImageIcon, Heading as HeadingIcon, 
  Type, List as ListIcon, Quote as QuoteIcon, ShoppingBag, 
  Settings, Save, Eye, ChevronUp, ChevronDown, Link as LinkIcon,
  X, Megaphone
} from 'lucide-react';
import styles from './blog-editor.module.css';

interface Block {
  type: string;
  [key: string]: any;
}

export default function CreateBlogPost() {
  const [title, setTitle] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [category, setCategory] = useState('1');
  const [status, setStatus] = useState('draft');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');
  const [blocks, setBlocks] = useState<Block[]>([
    { type: 'heading', level: 2, text: '' },
    { type: 'paragraph', text: '' }
  ]);
  const [availableAds, setAvailableAds] = useState<any[]>([]);

  useEffect(() => {
    // Mock fetching ads from backend
    // In a real app, this would be: fetch('/api/ads').then(...)
    const mockAds = [
      { id: 1, title: 'Summer Sale', placement: 'inline' },
      { id: 2, title: 'Health Tips Ebook', placement: 'inline' },
      { id: 3, title: 'Sidebar Promo', placement: 'sidebar' },
      { id: 4, title: 'Newsletter Signup', placement: 'inline' },
    ];
    setAvailableAds(mockAds.filter(ad => ad.placement === 'inline'));
  }, []);

  const addBlock = (type: string) => {
    let newBlock: Block = { type };
    
    switch (type) {
      case 'heading':
        newBlock = { ...newBlock, level: 2, text: '' };
        break;
      case 'paragraph':
        newBlock = { ...newBlock, text: '' };
        break;
      case 'list':
        newBlock = { ...newBlock, items: [''] };
        break;
      case 'image':
        newBlock = { ...newBlock, url: '', alt: '', caption: '' };
        break;
      case 'quote':
        newBlock = { ...newBlock, text: '', author: '' };
        break;
      case 'product_block':
        newBlock = { ...newBlock, product_slug: '' };
        break;
      case 'ad_block':
        newBlock = { ...newBlock, ad_id: availableAds[0]?.id || 0 };
        break;
      case 'source_reference':
        newBlock = { ...newBlock, source: '', url: '' };
        break;
    }
    
    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (index: number) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const updateBlock = (index: number, updates: any) => {
    const newBlocks = [...blocks];
    newBlocks[index] = { ...newBlocks[index], ...updates };
    setBlocks(newBlocks);
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === blocks.length - 1) return;
    
    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    setBlocks(newBlocks);
  };

  const getFullJson = () => {
    return JSON.stringify({
      title,
      featured_image: featuredImage,
      category_id: parseInt(category),
      meta_title: metaTitle,
      meta_description: metaDescription,
      focus_keyword: focusKeyword,
      status,
      content: {
        blocks: blocks.filter(b => {
          // Filter out empty blocks for cleanliness in preview
          if (b.type === 'paragraph' || b.type === 'heading' || b.type === 'quote') return b.text?.trim() !== '';
          if (b.type === 'list') return b.items?.some((item: string) => item.trim() !== '');
          return true;
        })
      }
    }, null, 2);
  };

  return (
    <div className={styles.editorContainer}>
      <div className={styles.mainColumn}>
        <div className={styles.card}>
          <input 
            type="text" 
            placeholder="Post Title..." 
            className={styles.titleInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          
          <div className={styles.blocksList}>
            <span className={styles.sectionLabel}>Content Blocks</span>
            {blocks.map((block, index) => (
              <div key={index} className={styles.blockItem}>
                <div className={styles.blockHeader}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className={styles.blockTypeTag}>{block.type}</span>
                    <div style={{ display: 'flex' }}>
                      <button onClick={() => moveBlock(index, 'up')} className={styles.removeBtn} style={{ color: '#666' }}><ChevronUp size={16} /></button>
                      <button onClick={() => moveBlock(index, 'down')} className={styles.removeBtn} style={{ color: '#666' }}><ChevronDown size={16} /></button>
                    </div>
                  </div>
                  <button onClick={() => removeBlock(index)} className={styles.removeBtn}>
                    <Trash2 size={16} />
                  </button>
                </div>

                {block.type === 'heading' && (
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <select 
                      className={styles.select} 
                      style={{ width: '100px' }}
                      value={block.level}
                      onChange={(e) => updateBlock(index, { level: parseInt(e.target.value) })}
                    >
                      <option value={1}>H1</option>
                      <option value={2}>H2</option>
                      <option value={3}>H3</option>
                      <option value={4}>H4</option>
                    </select>
                    <input 
                      type="text" 
                      className={styles.input} 
                      placeholder="Heading text..." 
                      value={block.text}
                      onChange={(e) => updateBlock(index, { text: e.target.value })}
                    />
                  </div>
                )}

                {block.type === 'paragraph' && (
                  <textarea 
                    className={styles.textarea} 
                    placeholder="Enter text..." 
                    rows={4}
                    value={block.text}
                    onChange={(e) => updateBlock(index, { text: e.target.value })}
                  />
                )}

                {block.type === 'list' && (
                  <div>
                    {block.items.map((item: string, i: number) => (
                      <div key={i} className={styles.listItem}>
                        <div style={{ padding: '8px', color: '#888' }}>•</div>
                        <input 
                          type="text" 
                          className={styles.input} 
                          value={item}
                          onChange={(e) => {
                            const newItems = [...block.items];
                            newItems[i] = e.target.value;
                            updateBlock(index, { items: newItems });
                          }}
                        />
                        <button 
                          className={styles.removeBtn}
                          onClick={() => {
                            const newItems = block.items.filter((_: any, idx: number) => idx !== i);
                            updateBlock(index, { items: newItems });
                          }}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    <button 
                      className={styles.addBtn} 
                      style={{ marginTop: '0.5rem', padding: '0.3rem 0.6rem' }}
                      onClick={() => updateBlock(index, { items: [...block.items, ''] })}
                    >
                      <Plus size={14} /> Add Item
                    </button>
                  </div>
                )}

                {block.type === 'image' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <input 
                      type="text" 
                      className={styles.input} 
                      placeholder="Image URL..." 
                      value={block.url}
                      onChange={(e) => updateBlock(index, { url: e.target.value })}
                    />
                    <input 
                      type="text" 
                      className={styles.input} 
                      placeholder="Alt text..." 
                      value={block.alt}
                      onChange={(e) => updateBlock(index, { alt: e.target.value })}
                    />
                    <input 
                      type="text" 
                      className={styles.input} 
                      placeholder="Caption..." 
                      value={block.caption}
                      onChange={(e) => updateBlock(index, { caption: e.target.value })}
                    />
                  </div>
                )}

                {block.type === 'quote' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <textarea 
                      className={styles.textarea} 
                      placeholder="Quote text..." 
                      rows={2}
                      value={block.text}
                      onChange={(e) => updateBlock(index, { text: e.target.value })}
                    />
                    <input 
                      type="text" 
                      className={styles.input} 
                      placeholder="Author..." 
                      value={block.author}
                      onChange={(e) => updateBlock(index, { author: e.target.value })}
                    />
                  </div>
                )}

                {block.type === 'product_block' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div className={styles.statIcon} style={{ background: '#ecfdf5', color: '#059669', padding: '0.5rem', borderRadius: '8px' }}>
                      <ShoppingBag size={20} />
                    </div>
                    <input 
                      type="text" 
                      className={styles.input} 
                      placeholder="Product Slug (e.g., magnesium-glycinate)" 
                      value={block.product_slug}
                      onChange={(e) => updateBlock(index, { product_slug: e.target.value })}
                    />
                  </div>
                )}

                {block.type === 'ad_block' && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                    <div className={styles.statIcon} style={{ background: '#eff6ff', color: '#2563eb', padding: '0.5rem', borderRadius: '8px' }}>
                      <Megaphone size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: '#888', marginBottom: '4px' }}>Select Ad Campaign (Inline Only)</label>
                      <select 
                        className={styles.select}
                        value={block.ad_id}
                        onChange={(e) => updateBlock(index, { ad_id: parseInt(e.target.value) })}
                      >
                        <option value={0}>-- Choose an Ad --</option>
                        {availableAds.map(ad => (
                          <option key={ad.id} value={ad.id}>{ad.title} (ID: {ad.id})</option>
                        ))}
                      </select>
                    </div>
                    {block.ad_id > 0 && (
                      <div style={{ fontSize: '0.75rem', color: '#059669', background: '#ecfdf5', padding: '4px 10px', borderRadius: '6px' }}>
                        Selected ID: {block.ad_id}
                      </div>
                    )}
                  </div>
                )}

                {block.type === 'source_reference' && (
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <input 
                      type="text" 
                      className={styles.input} 
                      placeholder="Source name..." 
                      value={block.source}
                      onChange={(e) => updateBlock(index, { source: e.target.value })}
                    />
                    <input 
                      type="text" 
                      className={styles.input} 
                      placeholder="Source URL..." 
                      value={block.url}
                      onChange={(e) => updateBlock(index, { url: e.target.value })}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.addBlockControls}>
            <button className={styles.addBtn} onClick={() => addBlock('heading')}><HeadingIcon size={16} /> Heading</button>
            <button className={styles.addBtn} onClick={() => addBlock('paragraph')}><Type size={16} /> Paragraph</button>
            <button className={styles.addBtn} onClick={() => addBlock('list')}><ListIcon size={16} /> List</button>
            <button className={styles.addBtn} onClick={() => addBlock('image')}><ImageIcon size={16} /> Image</button>
            <button className={styles.addBtn} onClick={() => addBlock('quote')}><QuoteIcon size={16} /> Quote</button>
            <button className={styles.addBtn} onClick={() => addBlock('product_block')}><ShoppingBag size={16} /> Product</button>
            <button className={styles.addBtn} onClick={() => addBlock('ad_block')}><Settings size={16} /> Ad</button>
            <button className={styles.addBtn} onClick={() => addBlock('source_reference')}><LinkIcon size={16} /> Source</button>
          </div>
        </div>

        <div className={styles.jsonPreview}>
          <div className={styles.previewHeader}>
            <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Settings size={16} /> RAW JSON OUTPUT (Backend Format)
            </div>
            <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>Updated in real-time</div>
          </div>
          <pre>{getFullJson()}</pre>
        </div>
      </div>

      <div className={styles.sideColumn}>
        <div className={styles.card}>
          <span className={styles.sectionLabel}>Post Status</span>
          <select 
            className={styles.select} 
            style={{ marginBottom: '1rem' }}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <button className={styles.primaryBtn} style={{ width: '100%' }}>
            <Save size={18} style={{ marginRight: '8px', display: 'inline' }} /> 
            {status === 'published' ? 'Publish Post' : 'Save Draft'}
          </button>
        </div>

        <div className={styles.card}>
          <span className={styles.sectionLabel}>Featured Image</span>
          <div className={styles.featuredImagePreview}>
            {featuredImage ? (
              <img src={featuredImage} alt="Featured" />
            ) : (
              <div className={styles.placeholder}>
                <ImageIcon size={48} strokeWidth={1} />
                <span>No image selected</span>
              </div>
            )}
          </div>
          <input 
            type="text" 
            className={styles.input} 
            placeholder="Image URL..." 
            value={featuredImage}
            onChange={(e) => setFeaturedImage(e.target.value)}
          />
        </div>

        <div className={styles.card}>
          <span className={styles.sectionLabel}>Category</span>
          <select 
            className={styles.select}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="1">General Wellness</option>
            <option value="2">Fitness</option>
            <option value="3">Nutrition</option>
            <option value="4">Mental Health</option>
          </select>
        </div>

        <div className={styles.card}>
          <span className={styles.sectionLabel}>SEO Settings</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#888' }}>Meta Title</label>
              <input 
                type="text" 
                className={styles.input} 
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#888' }}>Meta Description</label>
              <textarea 
                className={styles.textarea} 
                rows={3}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#888' }}>Focus Keyword</label>
              <input 
                type="text" 
                className={styles.input} 
                value={focusKeyword}
                onChange={(e) => setFocusKeyword(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.saveBar}>
        <button className={styles.secondaryBtn}>
          <Eye size={18} style={{ marginRight: '8px', display: 'inline' }} /> 
          Preview
        </button>
        <button className={styles.primaryBtn}>
          <Save size={18} style={{ marginRight: '8px', display: 'inline' }} /> 
          Save Changes
        </button>
      </div>
    </div>
  );
}

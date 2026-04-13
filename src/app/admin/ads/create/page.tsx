"use client";

import React, { useState, ChangeEvent } from 'react';
import { 
  ArrowLeft, Save, Image as ImageIcon,
  Globe, Megaphone, Info, ChevronUp, ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import styles from './ad-creator.module.css';

export default function CreateAdPage() {
  // Campaign Settings
  const [title, setTitle] = useState('Healthy Lifestyle Bundle');
  const [description, setDescription] = useState('Get the ultimate supplement stack for daily energy and peak performance. Limited time offer!');
  const [ctaText, setCtaText] = useState('Shop Now');
  const [link, setLink] = useState('https://healoxa.com/shop/bundle');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=80&w=600');
  const [keywords, setKeywords] = useState('health, supplements, energy, wellness');
  
  // Customization Settings
  const [placement, setPlacement] = useState<'inline' | 'sidebar' | 'footer'>('inline');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#1a1a1a');
  const [btnColor, setBtnColor] = useState('#65a30d');
  const [btnTextColor, setBtnTextColor] = useState('#ffffff');
  const [borderRadius, setBorderRadius] = useState(16);
  const [imagePos, setImagePos] = useState<'left' | 'right' | 'top'>('left');
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const getPayload = () => {
    return {
      title,
      description,
      cta_text: ctaText,
      link,
      image: imageUrl,
      keywords,
      placement,
      design: {
        background_color: bgColor,
        text_color: textColor,
        button_color: btnColor,
        button_text_color: btnTextColor,
        border_radius: borderRadius,
        image_position: imagePos
      }
    };
  };

  const getAdStyle = (): React.CSSProperties => {
    let style: React.CSSProperties = {
      backgroundColor: bgColor,
      color: textColor,
      borderRadius: `${borderRadius}px`,
      display: 'flex',
    };

    if (placement === 'sidebar') {
      style.flexDirection = 'column';
      style.maxWidth = '300px';
    } else if (placement === 'inline' || placement === 'footer') {
      style.flexDirection = imagePos === 'top' ? 'column' : (imagePos === 'right' ? 'row-reverse' : 'row');
      style.maxWidth = '800px';
    }

    return style;
  };

  const getImageStyle = (): React.CSSProperties => {
    if (placement === 'sidebar' || imagePos === 'top') {
      return { width: '100%', height: '180px' };
    }
    return { width: '200px', height: '100%' };
  };

  return (
    <div className={styles.container}>
      {/* Visual Preview (Sticky Top) */}
      <div className={styles.previewPanel}>
        <div className={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isCollapsed ? '0' : '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className={styles.sectionTitle} style={{ marginBottom: 0 }}>Real-time Client Preview</span>
              <button 
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={styles.toggleBtn}
                title={isCollapsed ? "Expand Preview" : "Collapse Preview"}
              >
                {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
              </button>
            </div>
            {!isCollapsed && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', background: '#f0f9ff', color: '#0369a1', padding: '4px 10px', borderRadius: '6px' }}>
                <Info size={14} /> This is how users will see the ad
              </div>
            )}
          </div>

          <div className={`${styles.previewContainer} ${isCollapsed ? styles.collapsed : ''}`}>
            <div className={styles.mockArticle}>
              {placement === 'inline' && (
                <>
                  <div className={styles.mockText} style={{ width: '90%' }}></div>
                  <div className={styles.mockText} style={{ width: '100%' }}></div>
                  <div className={styles.mockText} style={{ width: '85%', marginBottom: '2rem' }}></div>
                </>
              )}

              <div className={styles.adPreviewUnit} style={getAdStyle()}>
                <div className={styles.adImageWrapper} style={getImageStyle()}>
                  {imageUrl ? <img src={imageUrl} alt="Preview" /> : <ImageIcon size={32} color="#ccc" />}
                </div>
                <div className={styles.adContent}>
                  <h4 className={styles.adTitle} style={{ color: textColor }}>{title}</h4>
                  <p className={styles.adDesc} style={{ color: textColor }}>{description}</p>
                  <div style={{ display: 'flex' }}>
                    <div className={styles.adCTA} style={{ backgroundColor: btnColor, color: btnTextColor }}>
                      {ctaText}
                    </div>
                  </div>
                </div>
              </div>

              {placement === 'inline' && (
                <>
                  <div className={styles.mockText} style={{ width: '100%', marginTop: '2rem' }}></div>
                  <div className={styles.mockText} style={{ width: '95%' }}></div>
                  <div className={styles.mockText} style={{ width: '80%' }}></div>
                </>
              )}
              
              {placement === 'footer' && (
                <div style={{ marginTop: '2rem', textAlign: 'center', color: '#888', fontSize: '0.8rem' }}>
                  End of article
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className={styles.customizerPanel}>
        <div style={{ marginBottom: '1rem' }}>
          <Link href="/admin/ads" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666', fontSize: '0.9rem', textDecoration: 'none' }}>
            <ArrowLeft size={16} /> Back to Ads
          </Link>
        </div>

        <div className={styles.card}>
          <span className={styles.sectionTitle}>Campaign Details</span>
          <div className={styles.formGroup}>
            <label className={styles.label}>Ad Title</label>
            <input 
              className={styles.input} 
              value={title} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} 
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea 
              className={styles.textarea} 
              rows={3} 
              value={description} 
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} 
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>CTA Button Text</label>
            <input 
              className={styles.input} 
              value={ctaText} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCtaText(e.target.value)} 
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Destination Link</label>
            <input 
              className={styles.input} 
              value={link} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => setLink(e.target.value)} 
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Keywords (comma separated)</label>
            <input 
              className={styles.input} 
              value={keywords} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => setKeywords(e.target.value)} 
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Image URL</label>
            <input 
              className={styles.input} 
              value={imageUrl} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => setImageUrl(e.target.value)} 
            />
          </div>
        </div>

        <div className={styles.card}>
          <span className={styles.sectionTitle}>Ad Design</span>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Placement</label>
            <div className={styles.placementTabs}>
              {(['inline', 'sidebar', 'footer'] as const).map((p) => (
                <button 
                  key={p} 
                  type="button"
                  className={`${styles.tabBtn} ${placement === p ? styles.tabActive : ''}`}
                  onClick={() => setPlacement(p)}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {placement !== 'sidebar' && (
            <div className={styles.formGroup}>
              <label className={styles.label}>Image Position</label>
              <select 
                className={styles.select} 
                value={imagePos} 
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setImagePos(e.target.value as any)}
              >
                <option value="left">Left</option>
                <option value="right">Right</option>
                <option value="top">Top</option>
              </select>
            </div>
          )}

          <div className={styles.colorGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Background</label>
              <div className={styles.colorInputWrapper}>
                <input 
                  type="color" 
                  className={styles.colorPicker} 
                  value={bgColor} 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setBgColor(e.target.value)} 
                />
                <span style={{ fontSize: '0.8rem' }}>{bgColor}</span>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Text Color</label>
              <div className={styles.colorInputWrapper}>
                <input 
                  type="color" 
                  className={styles.colorPicker} 
                  value={textColor} 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setTextColor(e.target.value)} 
                />
                <span style={{ fontSize: '0.8rem' }}>{textColor}</span>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Button BG</label>
              <div className={styles.colorInputWrapper}>
                <input 
                  type="color" 
                  className={styles.colorPicker} 
                  value={btnColor} 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setBtnColor(e.target.value)} 
                />
                <span style={{ fontSize: '0.8rem' }}>{btnColor}</span>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Button Text</label>
              <div className={styles.colorInputWrapper}>
                <input 
                  type="color" 
                  className={styles.colorPicker} 
                  value={btnTextColor} 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setBtnTextColor(e.target.value)} 
                />
                <span style={{ fontSize: '0.8rem' }}>{btnTextColor}</span>
              </div>
            </div>
          </div>

          <div className={styles.formGroup}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label className={styles.label}>Corner Roundness</label>
              <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{borderRadius}px</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="40" 
              className={styles.rangeInput} 
              value={borderRadius}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setBorderRadius(parseInt(e.target.value))}
            />
          </div>
        </div>

        {/* Backend Payload (Reference only) */}
        <div className={`${styles.card} ${styles.payloadCard}`}>
          <span className={styles.sectionTitle} style={{ color: '#64748b' }}>Backend Payload JSON</span>
          <pre style={{ fontSize: '0.85rem', overflowX: 'auto' }}>
            {JSON.stringify(getPayload(), null, 2)}
          </pre>
        </div>
      </div>

      {/* Persistent Save Bar */}
      <div className={styles.saveBar}>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={18} color="#888" />
            <span style={{ fontSize: '0.85rem', color: '#666' }}>Campaign Status: <strong>Draft</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Megaphone size={18} color="#888" />
            <span style={{ fontSize: '0.85rem', color: '#666' }}>Targeting: <strong>Keyword Match</strong></span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="button" className={styles.primaryBtn} onClick={() => console.log(getPayload())}>
            <Save size={18} />
            Save Campaign
          </button>
        </div>
      </div>
    </div>
  );
}

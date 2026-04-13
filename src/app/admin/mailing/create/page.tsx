"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, Plus, Trash2, Heading, AlignLeft, 
  Image as ImageIcon, Square, Minus, MousePointer2, 
  Save, Send, Layout, Move, Info, ArrowUp, ArrowDown
} from 'lucide-react';
import styles from '../mailing.module.css';

interface Block {
  id: string;
  type: 'header' | 'heading' | 'text' | 'image' | 'button' | 'spacer' | 'divider';
  content: string;
  metadata?: any;
}

const INITIAL_BLOCKS: Block[] = [
  { id: '1', type: 'header', content: '/log-full-whit.png' },
  { id: '2', type: 'heading', content: 'Transform Your Wellness Journey' },
  { id: '3', type: 'text', content: 'Hello [User],\n\nWelcome to HealoXa. We are thrilled to have you as part of our community. Our goal is to provide you with the most effective, science-backed wellness advice and products.' },
  { id: '4', type: 'button', content: 'Discover Our Products', metadata: { url: 'https://healoxa.com/shop' } }
];

export default function CreateMailPage() {
  const router = useRouter();
  const [blocks, setBlocks] = useState<Block[]>(INITIAL_BLOCKS);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const addBlock = (type: Block['type']) => {
    const newBlock: Block = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: getPlaceholderContent(type),
      metadata: type === 'button' ? { url: '#' } : {}
    };
    setBlocks([...blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
  };

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
    if (selectedBlockId === id) setSelectedBlockId(null);
  };

  const updateBlock = (id: string, newContent: string, newMetadata?: any) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, content: newContent, metadata: newMetadata || b.metadata } : b));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...blocks];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newBlocks.length) return;
    [newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]];
    setBlocks(newBlocks);
  };

  const getPlaceholderContent = (type: Block['type']) => {
    switch(type) {
      case 'heading': return 'New Heading';
      case 'text': return 'Start typing your content here...';
      case 'image': return 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=800';
      case 'button': return 'Click Me';
      default: return '';
    }
  };

  const selectedBlock = blocks.find(b => b.id === selectedBlockId);

  return (
    <div className={styles.mailingContainer}>
      <div className={styles.header}>
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className={styles.secondaryBtn}>
            <ChevronLeft size={18} />
          </button>
          <h1 className="text-xl font-bold">Block Builder</h1>
        </div>
        <div className="flex gap-2">
           <button className={styles.secondaryBtn}><Send size={18} /> Test</button>
           <button className={styles.primaryBtn}><Save size={18} /> Save</button>
        </div>
      </div>

      <div className={styles.builderLayout}>
        {/* Sidebar - Block Library */}
        <div className={styles.sidebar}>
          <span className={styles.sidebarTitle}>Block Library</span>
          <div className={styles.blockLibrary}>
            <button onClick={() => addBlock('heading')} className={styles.blockItem}><Heading size={18} /> Heading</button>
            <button onClick={() => addBlock('text')} className={styles.blockItem}><AlignLeft size={18} /> Text</button>
            <button onClick={() => addBlock('image')} className={styles.blockItem}><ImageIcon size={18} /> Image</button>
            <button onClick={() => addBlock('button')} className={styles.blockItem}><MousePointer2 size={18} /> Button</button>
            <button onClick={() => addBlock('spacer')} className={styles.blockItem}><Square size={18} /> Spacer</button>
            <button onClick={() => addBlock('divider')} className={styles.blockItem}><Minus size={18} /> Divider</button>
          </div>
        </div>

        {/* Canvas - Live Preview */}
        <div className={styles.canvas}>
          <div className={styles.emailFrame}>
            {blocks.map((block, index) => (
              <div 
                key={block.id} 
                className={`${styles.canvasBlock} ${selectedBlockId === block.id ? styles.selected : ''}`}
                onClick={() => setSelectedBlockId(block.id)}
              >
                <div className={styles.blockActions}>
                   <button onClick={(e) => { e.stopPropagation(); moveBlock(index, 'up'); }} className={styles.tinyActionBtn}><ArrowUp size={12}/></button>
                   <button onClick={(e) => { e.stopPropagation(); moveBlock(index, 'down'); }} className={styles.tinyActionBtn}><ArrowDown size={12}/></button>
                   <button onClick={(e) => { e.stopPropagation(); deleteBlock(block.id); }} className={styles.tinyActionBtn}><Trash2 size={12}/></button>
                </div>

                {block.type === 'header' && (
                  <div className={styles.emailHeaderBlock}>
                    <img src={block.content} alt="HealoXa Logo" className={styles.emailLogo} />
                  </div>
                )}
                
                {block.type === 'heading' && (
                  <h2 className={styles.emailTitleBlock}>{block.content}</h2>
                )}

                {block.type === 'text' && (
                  <div className={styles.emailTextBlock}>{block.content}</div>
                )}

                {block.type === 'image' && (
                  <img src={block.content} alt="Mail Image" style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }} />
                )}

                {block.type === 'button' && (
                  <div style={{ textAlign: 'center' }}>
                    <a href={block.metadata?.url} className={styles.emailBtn}>
                      {block.content}
                    </a>
                  </div>
                )}

                {block.type === 'spacer' && <div style={{ height: '40px' }} />}
                {block.type === 'divider' && <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '1rem 0' }} />}
              </div>
            ))}
          </div>
        </div>

        {/* Inspector - Contextual Settings */}
        <div className={styles.inspector}>
          <span className={styles.sidebarTitle}>Settings</span>
          {selectedBlock ? (
            <div className="animate-in fade-in duration-300">
               <div className="flex items-center gap-3 mb-6 p-3 bg-lime-50 dark:bg-lime-900/20 rounded-xl text-lime-600">
                  <Layout size={18} />
                  <span className="font-bold text-sm uppercase">{selectedBlock.type}</span>
               </div>

               <div className={styles.formGroup}>
                  <label>Content</label>
                  {selectedBlock.type === 'text' ? (
                    <textarea 
                      className={styles.textarea} 
                      value={selectedBlock.content}
                      onChange={(e) => updateBlock(selectedBlock.id, e.target.value)}
                      rows={10}
                    />
                  ) : (
                    <input 
                      type="text" 
                      className={styles.input} 
                      value={selectedBlock.content}
                      onChange={(e) => updateBlock(selectedBlock.id, e.target.value)}
                    />
                  )}
               </div>

               {selectedBlock.type === 'button' && (
                  <div className={styles.formGroup}>
                    <label>Link URL</label>
                    <input 
                      type="text" 
                      className={styles.input} 
                      value={selectedBlock.metadata?.url}
                      onChange={(e) => updateBlock(selectedBlock.id, selectedBlock.content, { ...selectedBlock.metadata, url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
               )}

               {selectedBlock.type === 'header' && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 text-center">Brand logo is managed in global settings.</p>
                  </div>
               )}
            </div>
          ) : (
            <div className={styles.noSelection}>
               <Move className={styles.emptyLogo} size={48} />
               <p className="text-sm">Select a block to edit its properties</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

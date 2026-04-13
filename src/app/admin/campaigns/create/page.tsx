"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Plus, X, Tag, FileText, Layout, Info } from 'lucide-react';
import styles from './campaign-creator.module.css';

export default function CreateCampaignPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fields, setFields] = useState<string[]>(['Email Address']);

  const addField = () => {
    if (fields.length < 5) {
      setFields([...fields, '']);
    }
  };

  const removeField = (index: number) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  const updateField = (index: number, value: string) => {
    const newFields = [...fields];
    newFields[index] = value;
    setFields(newFields);
  };

  return (
    <div className={styles.adminContainer}>
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 mb-6 transition-colors font-semibold text-sm"
      >
        <ChevronLeft size={16} />
        Back to Campaigns
      </button>

      <div className={styles.creatorContainer}>
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h2>Create New Campaign</h2>
            <p>Design your blog popup to engage readers and capture leads.</p>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="title">Campaign Title</label>
            <input 
              id="title"
              type="text" 
              className={styles.input} 
              placeholder="e.g. Summer Wellness Sale" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Message / Description</label>
            <textarea 
              id="description"
              className={styles.textarea} 
              placeholder="Write a compelling message for your readers..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className={styles.fieldsSection}>
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-bold flex items-center gap-2">
                Input Fields 
                <span className="text-gray-400 font-normal">({fields.length}/5)</span>
              </label>
            </div>
            
            {fields.map((field, index) => (
              <div key={index} className={styles.fieldItem}>
                <input 
                  type="text" 
                  className={styles.input} 
                  placeholder={`Field name (e.g. ${index === 0 ? 'Email' : 'Full Name'})`}
                  value={field}
                  onChange={(e) => updateField(index, e.target.value)}
                />
                <button 
                  onClick={() => removeField(index)}
                  className={styles.removeField}
                  title="Remove field"
                >
                  <X size={18} />
                </button>
              </div>
            ))}

            <button 
              onClick={addField} 
              disabled={fields.length >= 5}
              className={styles.addFieldBtn}
            >
              <Plus size={16} />
              Add more fields
            </button>
          </div>

          <div className={styles.saveActions}>
            <button className={styles.saveBtn}>Create Campaign</button>
            <button onClick={() => router.back()} className={styles.cancelBtn}>Cancel</button>
          </div>
        </div>

        <div className={styles.previewSection}>
          <span className={styles.previewLabel}>LIVE PREVIEW</span>
          <div className={styles.popupPreview}>
            <div className={styles.previewContent}>
              <h3 className={styles.previewTitle}>
                {title || 'Campaign Title Goes Here'}
              </h3>
              <p className={styles.previewDescription}>
                {description || 'This is where your compelling message will appear to your readers when they visit your blog.'}
              </p>
              
              <div className={styles.previewFields}>
                {fields.map((field, index) => (
                  <div key={index} className={styles.previewInput}>
                    {field || `Placeholder Field ${index + 1}`}
                  </div>
                ))}
              </div>

              <button className={styles.submitBtn}>
                Get Started Now
              </button>
            </div>
          </div>
          
          <div className="mt-8 flex gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
            <Info className="text-lime-600 shrink-0" size={20} />
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              <strong>Note:</strong> Creating this campaign will place it in "Inactive" status. You can activate it from the dashboard. Only one campaign can be active at a time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

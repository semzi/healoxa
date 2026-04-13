"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Edit2, Trash2, Power, Layout, MousePointer2, Clock, MoreVertical } from 'lucide-react';
import styles from './campaigns.module.css';

// Demo data for campaigns
const INITIAL_CAMPAIGNS = [
  {
    id: 1,
    title: "Summer Wellness Sale",
    description: "Get 20% off on all wellness consultation bookings throughout June and July. Subscribe now to get your discount code.",
    status: "active",
    createdAt: "2026-04-01",
    views: 1250,
    conversions: 85,
    fields: ["Email Address", "Full Name"],
  },
  {
    id: 2,
    title: "Mental Health Newsletter",
    description: "Join our weekly newsletter for the latest tips on mindfulness and mental resilience from top therapists.",
    status: "inactive",
    createdAt: "2026-03-20",
    views: 890,
    conversions: 120,
    fields: ["Email Address"],
  },
  {
    id: 3,
    title: "Weight Loss Webinar",
    description: "Sign up for our free webinar next Thursday. Learn the science-backed ways to manage weight effectively.",
    status: "inactive",
    createdAt: "2026-03-15",
    views: 0,
    conversions: 0,
    fields: ["Email Address", "Phone Number", "Current Weight"],
  }
];

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleStatus = (id: number) => {
    setCampaigns(campaigns.map(campaign => {
      if (campaign.id === id) {
        return { ...campaign, status: campaign.status === 'active' ? 'inactive' : 'active' };
      }
      // If setting a new one to active, others should be inactive (as per requirement: only one active)
      if (campaign.status === 'active' && INITIAL_CAMPAIGNS.find(c => c.id === id)?.status !== 'active') {
        return { ...campaign, status: 'inactive' };
      }
      return campaign;
    }));
  };

  const handleToggle = (id: number) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, status: c.status === 'active' ? 'inactive' : 'active' };
      }
      // If we are activating one, deactivate all others
      if (c.status === 'active') {
        return { ...c, status: 'inactive' };
      }
      return c;
    }));
  };

  const filteredCampaigns = campaigns.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.campaignsContainer}>
      <header className={styles.header}>
        <div className={styles.title}>
          <h1>Blog Campaigns</h1>
          <p>Manage your popup campaigns for the blog section.</p>
        </div>
        <Link href="/admin/campaigns/create" className={styles.createBtn}>
          <Plus size={20} />
          Create Campaign
        </Link>
      </header>

      {campaigns.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <Layout size={32} />
          </div>
          <h2>No campaigns yet</h2>
          <p>Create your first campaign to start capturing leads on your blog.</p>
          <Link href="/admin/campaigns/create" className={styles.createBtn}>
            <Plus size={20} />
            Add Campaign
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.campaignsGrid}>
            {filteredCampaigns.map((campaign) => (
              <div 
                key={campaign.id} 
                className={`${styles.campaignCard} ${campaign.status === 'active' ? styles.active : ''}`}
              >
                <div className={styles.cardHeader}>
                  <span className={`${styles.statusBadge} ${campaign.status === 'active' ? styles.statusActive : styles.statusInactive}`}>
                    {campaign.status}
                  </span>
                  <button className={styles.actionBtn}>
                    <MoreVertical size={16} />
                  </button>
                </div>

                <div className={styles.campaignInfo}>
                  <h3>{campaign.title}</h3>
                  <p>{campaign.description}</p>
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.stats}>
                    <div className={styles.statItem}>
                      <span className={styles.statValue}>{campaign.views}</span>
                      <span className={styles.statLabel}>Views</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statValue}>{campaign.conversions}</span>
                      <span className={styles.statLabel}>Leads</span>
                    </div>
                  </div>

                  <div className={styles.actions}>
                    <button 
                      onClick={() => handleToggle(campaign.id)}
                      className={`${styles.actionBtn} ${campaign.status === 'active' ? styles.activeAction : ''}`}
                      title={campaign.status === 'active' ? 'Deactivate' : 'Activate'}
                    >
                      <Power size={18} color={campaign.status === 'active' ? '#16a34a' : 'currentColor'} />
                    </button>
                    <Link href={`/admin/campaigns/edit/${campaign.id}`} className={`${styles.actionBtn} ${styles.editBtn}`}>
                      <Edit2 size={18} />
                    </Link>
                    <button className={`${styles.actionBtn} ${styles.deleteBtn}`}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

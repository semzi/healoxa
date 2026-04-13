"use client";

import React, { useState } from 'react';
import { 
  Megaphone, Plus, Eye, MousePointerClick, TrendingUp, 
  MoreHorizontal, Edit2, Trash2, Pause, Play, BarChart3,
  Search, Filter
} from 'lucide-react';
import Link from 'next/link';
import styles from './ads.module.css';

// Mock Data
const adsSummary = {
  totalAds: 124,
  totalViews: '842.5K',
  totalClicks: '42.1K',
  avgCTR: '5.2%'
};

const adsList = [
  {
    id: 1,
    title: 'Sleep Better Tonight - Melatonin',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=300',
    placement: 'Sidebar',
    views: '124.5K',
    clicks: '8.2K',
    ctr: '6.5%',
    status: 'active'
  },
  {
    id: 2,
    title: 'Premium Omega-3 Supplements',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=300',
    placement: 'Inline Content',
    views: '245.8K',
    clicks: '12.4K',
    ctr: '5.0%',
    status: 'active'
  },
  {
    id: 3,
    title: 'Magnesium Glycinate - 20% Off',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=300',
    placement: 'Footer Banner',
    views: '92.1K',
    clicks: '3.1K',
    ctr: '3.4%',
    status: 'paused'
  },
  {
    id: 4,
    title: 'Immunity Boost Pack',
    image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=80&w=300',
    placement: 'Sidebar',
    views: '380.1K',
    clicks: '18.4K',
    ctr: '4.8%',
    status: 'active'
  }
];

export default function AdsManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <h1>Advertisement Management</h1>
          <p>Track performance and manage your internal ad campaigns</p>
        </div>
        <Link href="/admin/ads/create" className={styles.createBtn}>
          <Plus size={20} />
          Create New Ad
        </Link>
      </header>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Ads</span>
          <div className={styles.statValue}>{adsSummary.totalAds}</div>
          <div className={`${styles.statTrend} ${styles.trendUp}`}>
            <TrendingUp size={14} /> +8 this month
          </div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Views</span>
          <div className={styles.statValue}>{adsSummary.totalViews}</div>
          <div className={`${styles.statTrend} ${styles.trendUp}`}>
            <TrendingUp size={14} /> +12.4%
          </div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Clicks</span>
          <div className={styles.statValue}>{adsSummary.totalClicks}</div>
          <div className={`${styles.statTrend} ${styles.trendUp}`}>
            <TrendingUp size={14} /> +5.2%
          </div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Avg. CTR</span>
          <div className={styles.statValue}>{adsSummary.avgCTR}</div>
          <div className={`${styles.statTrend} ${styles.trendDown}`}>
            <TrendingUp size={14} style={{ transform: 'rotate(180deg)' }} /> -0.2%
          </div>
        </div>
      </section>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: 'white', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)' }} className="dark:bg-[#111] dark:border-white/5">
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
          <input 
            type="text" 
            placeholder="Search campaigns..." 
            style={{ width: '100%', paddingLeft: '40px', paddingRight: '12px', paddingTop: '8px', paddingBottom: '8px', borderRadius: '10px', border: '1px solid #ddd', background: 'transparent' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className={styles.actionBtn} style={{ maxWidth: '120px' }}>
          <Filter size={18} />
          Filter
        </button>
      </div>

      <section className={styles.adsGrid}>
        {adsList.map((ad) => (
          <div key={ad.id} className={styles.adCard}>
            <div className={styles.adImage}>
              <img src={ad.image} alt={ad.title} />
              <span className={`${styles.adStatus} ${ad.status === 'active' ? styles.statusActive : styles.statusPaused}`}>
                {ad.status}
              </span>
            </div>
            <div className={styles.adInfo}>
              <h3 className={styles.adTitle}>{ad.title}</h3>
              <div className={styles.adPlacement}>
                <Megaphone size={14} />
                {ad.placement}
              </div>
              
              <div className={styles.adStats}>
                <div>
                  <div className={styles.miniStatLabel}>Views</div>
                  <div className={styles.miniStatValue}>{ad.views}</div>
                </div>
                <div>
                  <div className={styles.miniStatLabel}>Clicks</div>
                  <div className={styles.miniStatValue}>{ad.clicks}</div>
                </div>
                <div>
                  <div className={styles.miniStatLabel}>CTR</div>
                  <div className={styles.miniStatValue}>{ad.ctr}</div>
                </div>
                <div>
                  <div className={styles.miniStatLabel}>Conversions</div>
                  <div className={styles.miniStatValue}>248</div>
                </div>
              </div>
            </div>
            <div className={styles.adActions}>
              <button className={styles.actionBtn}>
                <Edit2 size={16} />
                Edit
              </button>
              <button className={styles.actionBtn}>
                {ad.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
                {ad.status === 'active' ? 'Pause' : 'Start'}
              </button>
              <button className={styles.actionBtn} style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.1)' }}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

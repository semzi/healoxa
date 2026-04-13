"use client";

import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell, PieChart, Pie 
} from 'recharts';
import { 
  Users, BookOpen, MousePointerClick, ShoppingBag, 
  TrendingUp, TrendingDown, DollarSign, Activity,
  ChevronRight, Calendar, Plus
} from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '../components/ThemeProvider';
import styles from './admin.module.css';

// Mock Data
const liveTrafficData = [
  { time: '14:00', users: 120 },
  { time: '14:05', users: 150 },
  { time: '14:10', users: 180 },
  { time: '14:15', users: 140 },
  { time: '14:20', users: 190 },
  { time: '14:25', users: 210 },
  { time: '14:30', users: 250 },
  { time: '14:35', users: 230 },
  { time: '14:40', users: 280 },
];

const engagementData = [
  { name: 'Mon', interactions: 4000, conversion: 2400 },
  { name: 'Tue', interactions: 3000, conversion: 1398 },
  { name: 'Wed', interactions: 2000, conversion: 9800 },
  { name: 'Thu', interactions: 2780, conversion: 3908 },
  { name: 'Fri', interactions: 1890, conversion: 4800 },
  { name: 'Sat', interactions: 2390, conversion: 3800 },
  { name: 'Sun', interactions: 3490, conversion: 4300 },
];

const productPerformanceData = [
  { name: 'Product A', value: 400 },
  { name: 'Product B', value: 300 },
  { name: 'Ads', value: 300 },
  { name: 'CPA', value: 200 },
];

const COLORS = ['#38bdf8', '#818cf8', '#c084fc', '#fb7185'];

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [liveUsers, setLiveUsers] = useState(284);
  const [liveHistory, setLiveHistory] = useState(liveTrafficData);
  const { theme } = useTheme();

  const isDark = theme === 'dark';
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
  const tooltipBg = isDark ? '#1e293b' : '#ffffff';
  const tooltipBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      const newUsers = Math.max(50, liveUsers + Math.floor(Math.random() * 21) - 10);
      setLiveUsers(newUsers);
      
      const now = new Date();
      const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      setLiveHistory(prev => {
        const updated = [...prev, { time: timeStr, users: newUsers }];
        if (updated.length > 20) return updated.slice(1);
        return updated;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [liveUsers]);

  if (!mounted) return null;

  return (
    <div className={styles.adminContainer}>
      <header className={styles.dashboardHeader}>
        <div className={styles.dashboardTitle}>
          <h1>HealoXa Admin</h1>
          <p>Real-time analytics & performance overview</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link href="/admin/blogs/create" className={styles.createBtn}>
            <Plus size={18} />
            Create Blog
          </Link>
          <div className={styles.liveIndicator}>
            <div className={styles.liveDot}></div>
            {liveUsers} ACTIVE
          </div>
          <div style={{ height: 40, width: 120 }}>
            <ResponsiveContainer>
              <AreaChart data={liveHistory}>
                <Area type="monotone" dataKey="users" stroke="#4ade80" fill="#4ade80" fillOpacity={0.2} strokeWidth={2} isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </header>

      <section className={styles.statsGrid}>
        <StatCard 
          icon={<Users size={24} color="#38bdf8" />}
          label="Live View"
          value={liveUsers.toLocaleString()}
          improvement="+12.5%"
          isUp={true}
          bg="#38bdf820"
        />
        <StatCard 
          icon={<BookOpen size={24} color="#818cf8" />}
          label="Blog Count"
          value="1,248"
          improvement="+24"
          isUp={true}
          bg="#818cf820"
        />
        <StatCard 
          icon={<MousePointerClick size={24} color="#c084fc" />}
          label="Interactions"
          value="84.2K"
          improvement="+18.2%"
          isUp={true}
          bg="#c084fc20"
        />
        <StatCard 
          icon={<ShoppingBag size={24} color="#fb7185" />}
          label="Products/Ads"
          value="452"
          improvement="-2.4%"
          isUp={false}
          bg="#fb718520"
        />
        <StatCard 
          icon={<DollarSign size={24} color="#facc15" />}
          label="CPA Earnings"
          value="$12,840"
          improvement="+32.1%"
          isUp={true}
          bg="#facc1520"
        />
      </section>

      <div className={styles.chartsGrid}>
        <div className={styles.chartContainer}>
          <div className={styles.chartHeader}>
            <div className={styles.chartTitle}>User Engagement Trends</div>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '14px', color: '#94a3b8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: 8, height: 8, background: '#38bdf8', borderRadius: '50%' }}></div>
                Interactions
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: 8, height: 8, background: '#818cf8', borderRadius: '50%' }}></div>
                Conversions
              </div>
            </div>
          </div>
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <AreaChart data={engagementData}>
                <defs>
                  <linearGradient id="colorInteractions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: textColor }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: textColor }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: tooltipBg, 
                    borderColor: tooltipBorder,
                    borderRadius: '12px',
                    color: isDark ? '#f8fafc' : '#1e293b'
                  }}
                  itemStyle={{ color: isDark ? '#f8fafc' : '#1e293b' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="interactions" 
                  stroke="#38bdf8" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorInteractions)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="conversion" 
                  stroke="#818cf8" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorConversions)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.chartContainer}>
          <div className={styles.chartHeader}>
            <div className={styles.chartTitle}>Revenue Streams</div>
          </div>
          <div style={{ width: '100%', height: 350, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={productPerformanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {productPerformanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: tooltipBg, 
                    borderColor: tooltipBorder,
                    borderRadius: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ width: '100%', marginTop: '1rem' }}>
              {productPerformanceData.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: 12, height: 12, borderRadius: '2px', background: COLORS[i] }}></div>
                    <span style={{ color: textColor }}>{item.name}</span>
                  </div>
                  <span style={{ fontWeight: 600 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.chartContainer} style={{ gridColumn: 'span 2' }}>
          <div className={styles.chartHeader}>
            <div className={styles.chartTitle}>Category Performance Metrics</div>
          </div>
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <BarChart data={[
                { name: 'Health & Wellness', views: 4000, interactions: 2400 },
                { name: 'Fitness', views: 3000, interactions: 1398 },
                { name: 'Nutrition', views: 2000, interactions: 9800 },
                { name: 'Mental Health', views: 2780, interactions: 3908 },
                { name: 'Lifestyle', views: 1890, interactions: 4800 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: textColor }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: textColor }} />
                <Tooltip 
                  cursor={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}
                  contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '12px' }}
                />
                <Bar dataKey="views" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="interactions" fill="#818cf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, improvement, isUp, bg }: any) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statIcon} style={{ background: bg }}>
        {icon}
      </div>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statValue}>{value}</div>
      <div className={`${styles.improvement} ${isUp ? styles.up : styles.down}`}>
        {isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
        {improvement}
      </div>
    </div>
  );
}

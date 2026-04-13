"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut, 
  Sun, 
  Moon, 
  Megaphone, 
  Target, 
  Users, 
  Mail, 
  Layers,
  ChevronLeft,
  Menu,
  X
} from 'lucide-react';
import { useTheme } from '../components/ThemeProvider';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const isDark = theme === 'dark';

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Overview', href: '/admin' },
    { icon: <FileText size={20} />, label: 'Blogs', href: '/admin/blogs' },
    { icon: <Megaphone size={20} />, label: 'Ads', href: '/admin/ads' },
    { icon: <Target size={20} />, label: 'Campaigns', href: '/admin/campaigns' },
    { icon: <Users size={20} />, label: 'Leads', href: '/admin/leads' },
    { icon: <Mail size={20} />, label: 'Mailing', href: '/admin/mailing' },
    { icon: <Layers size={20} />, label: 'Page Creator', href: '/admin/pages' },
    { icon: <BarChart3 size={20} />, label: 'Analytics', href: '/admin/analytics' },
    { icon: <Settings size={20} />, label: 'Settings', href: '/admin/settings' },
  ];

  const sidebarContent = (isMobile: boolean) => (
    <div className="admin-sidebar-inner">
      {/* Logo / Brand */}
      <div className={`admin-sidebar-brand ${isCollapsed && !isMobile ? 'collapsed' : ''}`}>
        {(!isCollapsed || isMobile) ? (
          <Link href="/" className="admin-brand-link">
            <Image
              src={isDark ? "/logo-full-white.png" : "/logo-full.png"}
              alt="HealoXa"
              width={120}
              height={36}
              className="admin-brand-logo"
              priority
            />
          </Link>
        ) : (
          <Link href="/" className="admin-brand-link collapsed">
            <Image
              src="/logo.png"
              alt="HealoXa"
              width={32}
              height={32}
              className="admin-brand-icon"
              priority
            />
          </Link>
        )}
        {isMobile ? (
          <button 
            onClick={() => setIsMobileOpen(false)}
            className="admin-sidebar-toggle"
          >
            <X size={20} />
          </button>
        ) : (
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="admin-sidebar-toggle"
          >
            {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </button>
        )}
      </div>
      
      {/* Nav Items */}
      <nav className="admin-sidebar-nav">
        {navItems.map((item) => {
          const isExactMatch = pathname === item.href;
          const isChildMatch = pathname?.startsWith(item.href + '/');
          const isActive = item.href === '/admin' ? isExactMatch : (isExactMatch || isChildMatch);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={isCollapsed && !isMobile ? item.label : ''}
              className={`admin-nav-item ${isActive ? 'active' : ''} ${isCollapsed && !isMobile ? 'collapsed' : ''}`}
            >
              <div className="admin-nav-icon">{item.icon}</div>
              {(!isCollapsed || isMobile) && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="admin-sidebar-footer">
        <button 
          onClick={toggleTheme}
          title={isCollapsed && !isMobile ? (isDark ? 'Light Mode' : 'Dark Mode') : ''}
          className={`admin-nav-item ${isCollapsed && !isMobile ? 'collapsed' : ''}`}
        >
          <div className="admin-nav-icon">{isDark ? <Sun size={20} /> : <Moon size={20} />}</div>
          {(!isCollapsed || isMobile) && <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
        
        <button 
          title={isCollapsed && !isMobile ? 'Sign Out' : ''}
          className={`admin-nav-item sign-out ${isCollapsed && !isMobile ? 'collapsed' : ''}`}
        >
          <div className="admin-nav-icon"><LogOut size={20} /></div>
          {(!isCollapsed || isMobile) && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="admin-layout">
      {/* Mobile Top Bar */}
      <div className="admin-mobile-topbar">
        <button 
          onClick={() => setIsMobileOpen(true)} 
          className="admin-mobile-menu-btn"
        >
          <Menu size={22} />
        </button>
        <Link href="/" className="admin-mobile-brand">
          <Image
            src={isDark ? "/logo-full-white.png" : "/logo-full.png"}
            alt="HealoXa"
            width={100}
            height={30}
            priority
          />
        </Link>
        <button onClick={toggleTheme} className="admin-mobile-theme-btn">
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="admin-mobile-overlay" 
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar — desktop: fixed, mobile: drawer */}
      <aside 
        className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}
      >
        {sidebarContent(isMobileOpen)}
      </aside>

      {/* Main Content Area */}
      <main 
        className={`admin-main ${isCollapsed ? 'sidebar-collapsed' : ''}`}
      >
        <div className="admin-content-wrap">
          {children}
        </div>
      </main>
    </div>
  );
}

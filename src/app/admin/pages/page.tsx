"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, ExternalLink, Edit3, Trash2, MoreVertical, Layout, Eye } from 'lucide-react';

// Mock data for created pages
const MOCK_PAGES = [
  {
    id: '1',
    title: 'Summer Sale Landing Page',
    path: '/landing/summer-sale',
    status: 'Published',
    lastModified: '2024-03-15',
    blocks: 5,
    thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=250&fit=crop'
  },
  {
    id: '2',
    title: 'Product Launch - HealoXa v2',
    path: '/landing/v2-launch',
    status: 'Draft',
    lastModified: '2024-03-12',
    blocks: 8,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop'
  },
  {
    id: '3',
    title: 'Webinar Registration',
    path: '/landing/webinar',
    status: 'Published',
    lastModified: '2024-03-10',
    blocks: 4,
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop'
  }
];

export default function PagesDashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPages = MOCK_PAGES.filter(page => 
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.path.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Page Creator</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and build high-converting landing pages for your campaigns.</p>
        </div>
        <Link 
          href="/admin/pages/create"
          className="inline-flex items-center gap-2 bg-lime-500 hover:bg-lime-600 dark:bg-lime-600 dark:hover:bg-lime-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-lime-500/20 active:scale-95"
        >
          <Plus size={20} />
          <span>Create New Page</span>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400 group-focus-within:text-lime-500 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Search pages by title or URL..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 transition-all text-sm"
        />
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPages.map((page) => (
          <div 
            key={page.id}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-lime-500/5 transition-all duration-300 group"
          >
            {/* Thumbnail Preview */}
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={page.thumbnail} 
                alt={page.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                <button className="p-2.5 bg-white rounded-full text-gray-900 hover:bg-lime-500 hover:text-white transition-colors">
                  <Eye size={18} />
                </button>
                <Link 
                  href={`/admin/pages/create?id=${page.id}`}
                  className="p-2.5 bg-white rounded-full text-gray-900 hover:bg-lime-500 hover:text-white transition-colors"
                >
                  <Edit3 size={18} />
                </Link>
              </div>
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  page.status === 'Published' 
                    ? 'bg-lime-500/90 text-white' 
                    : 'bg-orange-500/90 text-white'
                }`}>
                  {page.status}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate group-hover:text-lime-600 transition-colors">
                  {page.title}
                </h3>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <ExternalLink size={14} />
                <span className="truncate">{page.path}</span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-800">
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                   <Layout size={14} />
                   <span>{page.blocks} Sections</span>
                </div>
                <div className="text-[11px] text-gray-400 font-medium">
                  Updated {page.lastModified}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPages.length === 0 && (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/10 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Layout className="text-gray-400" size={32} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">No pages found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your search query or create a new page.</p>
        </div>
      )}
    </div>
  );
}

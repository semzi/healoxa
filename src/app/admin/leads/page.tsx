"use client";

import React, { useState } from 'react';
import { Search, Download, Calendar, Mail, User, Phone, MapPin, ExternalLink, Filter, ChevronLeft, Layout, ArrowRight } from 'lucide-react';
import styles from './leads.module.css';

// Demo data for leads
const INITIAL_LEADS = [
  {
    id: 1,
    campaignName: "Summer Wellness Sale",
    timestamp: "2026-04-12 10:30 AM",
    responses: {
      "Email Address": "sarah.johnson@example.com",
      "Full Name": "Sarah Johnson"
    }
  },
  {
    id: 2,
    campaignName: "Mental Health Newsletter",
    timestamp: "2026-04-12 09:15 AM",
    responses: {
      "Email Address": "michael.smith@example.com"
    }
  },
  {
    id: 3,
    campaignName: "Weight Loss Webinar",
    timestamp: "2026-04-11 04:45 PM",
    responses: {
      "Email Address": "david.wilson@example.com",
      "Phone Number": "+1 (555) 123-4567",
      "Current Weight": "95kg"
    }
  },
  {
    id: 4,
    campaignName: "Summer Wellness Sale",
    timestamp: "2026-04-11 02:20 PM",
    responses: {
      "Email Address": "emily.rose@example.com",
      "Full Name": "Emily Rose"
    }
  },
  {
    id: 5,
    campaignName: "Weight Loss Webinar",
    timestamp: "2026-04-10 11:10 AM",
    responses: {
      "Email Address": "robert.brown@example.com",
      "Phone Number": "+1 (555) 987-6543",
      "Current Weight": "110kg"
    }
  }
];

// Group campaigns for the selection screen
const CAMPAIGNS = [
  { id: 1, name: "Summer Wellness Sale", count: 2 },
  { id: 2, name: "Mental Health Newsletter", count: 1 },
  { id: 3, name: "Weight Loss Webinar", count: 2 },
];

export default function LeadsPage() {
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLeads = INITIAL_LEADS.filter(lead => 
    lead.campaignName === selectedCampaign &&
    (lead.campaignName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    Object.values(lead.responses).some(val => val.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className={styles.leadsContainer}>
      {!selectedCampaign ? (
        <>
          <header className={styles.header}>
            <div className={styles.title}>
              <h1>Leads</h1>
              <p>Select a campaign to view its specific responses.</p>
            </div>
          </header>

          <div className={styles.campaignGrid}>
            {CAMPAIGNS.map((campaign) => (
              <div 
                key={campaign.id} 
                className={styles.campaignCard}
                onClick={() => setSelectedCampaign(campaign.name)}
              >
                <div className={styles.cardIcon}>
                  <Layout size={24} />
                </div>
                <h3>{campaign.name}</h3>
                <div className={styles.leadCount}>
                  <span className={styles.countBadge}>{campaign.count}</span>
                  Leads captured
                  <ArrowRight size={14} style={{ marginLeft: 'auto' }} />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <button 
            className={styles.backBtn}
            onClick={() => setSelectedCampaign(null)}
          >
            <ChevronLeft size={18} />
            Back to Campaigns
          </button>

          <header className={styles.header}>
            <div className={styles.title}>
              <h1>{selectedCampaign}</h1>
              <p>Viewing leads captured through this campaign.</p>
            </div>
            <button className={styles.exportBtn}>
              <Download size={18} />
              Export CSV
            </button>
          </header>

          <div className={styles.tableCard}>
            <div className={styles.tableHeader}>
              <div className={styles.searchContainer}>
                <Search className={styles.searchIcon} size={18} />
                <input 
                  type="text" 
                  className={styles.searchInput} 
                  placeholder="Search leads in this campaign..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.leadsTable}>
                <thead>
                  <tr>
                    <th>Field Responses</th>
                    <th>Submitted At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.length > 0 ? (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id}>
                        <td>
                          <div className={styles.responseData}>
                            {Object.entries(lead.responses).map(([label, value], idx) => (
                              <div key={idx} className={styles.responseItem}>
                                <span className={styles.fieldLabel}>{label}:</span>
                                <span className={styles.fieldValue}>{value}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td>
                          <div className={styles.timestamp}>
                            <Calendar size={14} />
                            {lead.timestamp}
                          </div>
                        </td>
                        <td>
                          <button className={styles.exportBtn} style={{ padding: '0.4rem' }}>
                            <Mail size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className={styles.emptyState}>
                        <div className={styles.emptyIcon}>
                          <User size={48} />
                        </div>
                        <p>No leads found matching your search.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

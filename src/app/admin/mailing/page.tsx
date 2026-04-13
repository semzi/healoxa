"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Plus, Mail, Edit2, Trash2, Send, Clock,
  Search, X, FileSpreadsheet, Users, ChevronRight,
  TrendingUp, MousePointer, MailOpen, CheckCircle2
} from 'lucide-react';
import styles from './mailing.module.css';

// ── Demo Data ────────────────────────────────────────────────────
const INITIAL_MAILS = [
  {
    id: 1,
    name: "Welcome Email",
    subject: "Welcome to HealoXa! Your journey to wellness starts here.",
    lastEdited: "Apr 10, 2026",
    status: "Draft",
    stats: { sent: 0, open: 0, click: 0 },
  },
  {
    id: 2,
    name: "Weekly Newsletter — April Week 2",
    subject: "This week: Mental Resilience & Healthy Habits",
    lastEdited: "Apr 12, 2026",
    status: "Ready",
    stats: { sent: 1240, open: 642, click: 156 },
  },
  {
    id: 3,
    name: "Password Reset Template",
    subject: "Reset your HealoXa password",
    lastEdited: "Mar 25, 2026",
    status: "Active",
    stats: { sent: 450, open: 410, click: 390 },
  },
  {
    id: 4,
    name: "Spring Wellness Promo",
    subject: "🌿 Exclusive spring deals — just for you",
    lastEdited: "Apr 8, 2026",
    status: "Active",
    stats: { sent: 3120, open: 1870, click: 702 },
  },
];

const CAMPAIGNS = [
  { id: 1, name: "Summer Wellness Sale", count: 250 },
  { id: 2, name: "Mental Health Newsletter", count: 120 },
  { id: 3, name: "Weight Loss Webinar", count: 85 },
];

// ── Helpers ──────────────────────────────────────────────────────
function getStatusClass(status: string) {
  switch (status.toLowerCase()) {
    case 'active': return styles.active;
    case 'ready':  return styles.ready;
    default:       return styles.draft;
  }
}

function openRate(stats: { sent: number; open: number }) {
  return stats.sent > 0 ? Math.round((stats.open / stats.sent) * 100) : 0;
}

// ── Component ────────────────────────────────────────────────────
export default function MailingPage() {
  const [mails, setMails] = useState(INITIAL_MAILS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMail, setSelectedMail] = useState<any>(null);
  const [sendMethod, setSendMethod] = useState<'csv' | 'campaign' | null>(null);

  const openSendModal = (mail: any) => {
    setSelectedMail(mail);
    setIsModalOpen(true);
    setSendMethod(null);
  };

  const deleteMail = (id: number) =>
    setMails(mails.filter((m) => m.id !== id));

  const filtered = mails.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Aggregate stats
  const totalSent  = mails.reduce((a, m) => a + m.stats.sent, 0);
  const totalOpen  = mails.reduce((a, m) => a + m.stats.open, 0);
  const totalClick = mails.reduce((a, m) => a + m.stats.click, 0);
  const avgOpen    = totalSent > 0 ? Math.round((totalOpen / totalSent) * 100) : 0;

  return (
    <div className={styles.mailingContainer}>

      {/* ── Page Header ─────────────────────────────────────── */}
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.pageTitleRow}>
            <div className={styles.pageIconWrap}>
              <Mail size={20} />
            </div>
            <h1 className={styles.pageTitle}>Mailing</h1>
          </div>
          <p className={styles.pageSubtitle}>
            Design, manage and deploy high-converting email campaigns.
          </p>
        </div>

        <div className={styles.headerActions}>
          <div className={styles.searchBar}>
            <Search size={16} />
            <input
              type="text"
              placeholder="Search templates…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', padding: 0 }}
              >
                <X size={14} />
              </button>
            )}
          </div>
          <Link href="/admin/mailing/create" className={styles.createBtn}>
            <Plus size={17} />
            New Template
          </Link>
        </div>
      </div>

      {/* ── Stats Row ───────────────────────────────────────── */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={styles.statIconWrap} style={{ background: 'rgba(132,204,22,0.1)', color: '#65a30d' }}>
            <Send size={18} />
          </div>
          <div className={styles.statInfo}>
            <div className={styles.statValue}>{totalSent.toLocaleString()}</div>
            <div className={styles.statLabel}>Total Sent</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIconWrap} style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}>
            <MailOpen size={18} />
          </div>
          <div className={styles.statInfo}>
            <div className={styles.statValue}>{avgOpen}%</div>
            <div className={styles.statLabel}>Avg. Open Rate</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIconWrap} style={{ background: 'rgba(168,85,247,0.1)', color: '#a855f7' }}>
            <MousePointer size={18} />
          </div>
          <div className={styles.statInfo}>
            <div className={styles.statValue}>{totalClick.toLocaleString()}</div>
            <div className={styles.statLabel}>Total Clicks</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIconWrap} style={{ background: 'rgba(234,179,8,0.1)', color: '#ca8a04' }}>
            <TrendingUp size={18} />
          </div>
          <div className={styles.statInfo}>
            <div className={styles.statValue}>{mails.filter(m => m.status === 'Active').length}</div>
            <div className={styles.statLabel}>Active Campaigns</div>
          </div>
        </div>
      </div>

      {/* ── Templates Table ─────────────────────────────────── */}
      <div className={styles.contentPanel}>
        <div className={styles.panelHeader}>
          <span className={styles.panelTitle}>Email Templates</span>
          <span className={styles.panelCount}>{filtered.length} templates</span>
        </div>

        <div className={styles.tableWrap}>
          {filtered.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}><Mail size={26} /></div>
              <p className={styles.emptyTitle}>No templates found</p>
              <p className={styles.emptyText}>
                {searchQuery ? 'Try a different search term.' : 'Create your first email template to get started.'}
              </p>
            </div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Template</th>
                  <th>Status</th>
                  <th className={styles.colSent}>Sent</th>
                  <th className={styles.colOpenRate}>Open Rate</th>
                  <th className={styles.colClicks}>Clicks</th>
                  <th className={styles.colDate}>Last Edited</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((mail) => {
                  const rate = openRate(mail.stats);
                  return (
                    <tr key={mail.id}>
                      {/* Template */}
                      <td>
                        <div className={styles.templateCell}>
                          <div className={styles.templatePreview}>
                            <div className={styles.mockHeaderBar} />
                            <div className={styles.mockBodyLine} />
                            <div className={styles.mockBodyLineShort} />
                            <div className={styles.mockBodyLine} />
                            <div className={styles.mockCta} />
                          </div>
                          <div className={styles.templateInfo}>
                            <div className={styles.templateName}>{mail.name}</div>
                            <div className={styles.templateSubject}>{mail.subject}</div>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td>
                        <span className={`${styles.statusBadge} ${getStatusClass(mail.status)}`}>
                          <span className={styles.statusDot} />
                          {mail.status}
                        </span>
                      </td>

                      {/* Sent */}
                      <td className={styles.colSent}>
                        <div className={styles.statCellValue}>{mail.stats.sent.toLocaleString()}</div>
                        <div className={styles.statCellSub}>recipients</div>
                      </td>

                      {/* Open Rate */}
                      <td className={styles.colOpenRate}>
                        <div className={styles.rateBar}>
                          <div className={styles.rateBarTrack}>
                            <div className={styles.rateBarFill} style={{ width: `${rate}%` }} />
                          </div>
                          <span className={styles.rateValue}>{rate}%</span>
                        </div>
                      </td>

                      {/* Clicks */}
                      <td className={styles.colClicks}>
                        <div className={styles.statCellValue}>{mail.stats.click.toLocaleString()}</div>
                        <div className={styles.statCellSub}>clicks</div>
                      </td>

                      {/* Date */}
                      <td className={styles.colDate}>
                        <div className={styles.dateCell}>
                          <Clock size={13} />
                          {mail.lastEdited}
                        </div>
                      </td>

                      {/* Actions */}
                      <td>
                        <div className={styles.actionsCell} style={{ justifyContent: 'flex-end' }}>
                          <button
                            onClick={() => openSendModal(mail)}
                            className={`${styles.actionBtn} ${styles.actionBtnSend}`}
                            title="Launch Campaign"
                          >
                            <Send size={15} />
                          </button>
                          <Link
                            href={`/admin/mailing/edit/${mail.id}`}
                            className={styles.actionBtn}
                            title="Edit Template"
                          >
                            <Edit2 size={15} />
                          </Link>
                          <button
                            className={`${styles.actionBtn} ${styles.actionBtnDelete}`}
                            title="Delete Template"
                            onClick={() => deleteMail(mail.id)}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ── Send Modal ──────────────────────────────────────── */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

            {/* Header */}
            <div className={styles.modalHeader}>
              <div>
                <h2 className={styles.modalTitle}>Launch Campaign</h2>
                <p className={styles.modalSubtitle}>Template: {selectedMail?.name}</p>
              </div>
              <button className={styles.modalClose} onClick={() => setIsModalOpen(false)}>
                <X size={17} />
              </button>
            </div>

            {/* Body */}
            <div className={styles.modalBody}>
              {!sendMethod ? (
                <>
                  <p className={styles.modalSectionLabel}>Choose your audience source:</p>
                  <div className={styles.optionGrid}>
                    <div className={styles.selectOption} onClick={() => setSendMethod('campaign')}>
                      <div className={styles.optionIcon}>
                        <Users size={22} style={{ color: '#65a30d' }} />
                      </div>
                      <span className={styles.optionLabel}>Campaign Leads</span>
                      <p className={styles.optionDesc}>Select from existing blog leads</p>
                    </div>
                    <div className={styles.selectOption} onClick={() => setSendMethod('csv')}>
                      <div className={styles.optionIcon}>
                        <FileSpreadsheet size={22} style={{ color: '#65a30d' }} />
                      </div>
                      <span className={styles.optionLabel}>Import CSV</span>
                      <p className={styles.optionDesc}>Upload a custom mailing list</p>
                    </div>
                  </div>
                </>
              ) : sendMethod === 'campaign' ? (
                <div className={styles.slideView}>
                  <div className={styles.slideViewHeader}>
                    <Users size={17} style={{ color: '#65a30d' }} />
                    <span className={styles.slideViewTitle}>Select Targeted Campaign Audience</span>
                  </div>
                  <div className={styles.campaignList}>
                    {CAMPAIGNS.map((camp) => (
                      <button key={camp.id} className={styles.campaignBtn}>
                        <div>
                          <span className={styles.campaignName}>{camp.name}</span>
                          <span className={styles.campaignCount}>{camp.count} leads available</span>
                        </div>
                        <div className={styles.campaignArrow}>
                          <ChevronRight size={15} />
                        </div>
                      </button>
                    ))}
                  </div>
                  <button className={styles.backBtn} onClick={() => setSendMethod(null)}>
                    <ChevronRight size={14} style={{ transform: 'rotate(180deg)' }} />
                    Back to methods
                  </button>
                  <button className={styles.primaryBtn}>
                    <Send size={18} />
                    Launch Campaign Now
                  </button>
                </div>
              ) : (
                <div className={styles.slideView}>
                  <div className={styles.slideViewHeader}>
                    <FileSpreadsheet size={17} style={{ color: '#65a30d' }} />
                    <span className={styles.slideViewTitle}>Upload Recipient List</span>
                  </div>
                  <div className={styles.dropZone}>
                    <div className={styles.dropZoneIcon}>
                      <FileSpreadsheet size={28} />
                    </div>
                    <p className={styles.dropZoneText}>Drag & drop your CSV file here</p>
                    <p className={styles.dropZoneHint}>or click to browse your files</p>
                    <div className={styles.csvFormat}>
                      <b style={{ color: '#65a30d' }}>Required columns:</b>{' '}
                      <span style={{ color: '#64748b', fontWeight: 700 }}>email, full_name, user_id (optional)</span>
                    </div>
                  </div>
                  <button className={styles.backBtn} onClick={() => setSendMethod(null)}>
                    <ChevronRight size={14} style={{ transform: 'rotate(180deg)' }} />
                    Back to methods
                  </button>
                  <button className={styles.primaryBtn}>
                    <Send size={18} />
                    Launch Campaign Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, ShieldCheck, Zap, Mail, Loader2, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
import './App.css';

const API_BASE = 'http://localhost:5000/api/leads';

export default function App() {
  const [domain, setDomain] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentLead, setCurrentLead] = useState(null);
  const [savedLeads, setSavedLeads] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await axios.get(API_BASE);
      setSavedLeads(res.data);
    } catch (err) {
      console.error('Error fetching leads:', err);
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!domain) return;

    setLoading(true);
    setError('');
    setCurrentLead(null);

    try {
      const res = await axios.post(`${API_BASE}/analyze`, { domain, companyName });
      setCurrentLead(res.data.lead);
      setDomain('');
      setCompanyName('');
      fetchLeads();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze domain. Please check URL.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Top Navigation Bar */}
      <nav className="navbar">
        <div className="brand">
          <div className="brand-icon">
            <Zap size={18} fill="#fff" />
          </div>
          <span>SaaSquatch <span style={{ color: 'var(--primary-cyan)', fontWeight: 500 }}>Leads</span></span>
        </div>
        <span className="badge badge-high" style={{ fontSize: '0.75rem' }}>
          <Sparkles size={12} /> AI Lead Qualifier Active
        </span>
      </nav>

      <div className="container">
        {/* Hero Section */}
        <div className="hero-section">
          <h1 className="hero-title">
            Transform Your <span>Lead Qualification</span>
          </h1>
          <p className="hero-subtitle">
            Instant Domain MX Verification & AI-Powered Deal Scoring Engine
          </p>
        </div>

        {/* Input Form Card */}
        <div className="card">
          <form onSubmit={handleAnalyze}>
            <div className="input-grid">
              <input
                type="text"
                className="input-field"
                placeholder="Target Company Domain (e.g. stripe.com)"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                required
              />
              <input
                type="text"
                className="input-field"
                placeholder="Company Name (Optional)"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Zap size={18} />}
                {loading ? 'Qualifying...' : 'Analyze & Score'}
              </button>
            </div>
          </form>
          {error && <p style={{ color: 'var(--accent-red)', marginTop: '14px', fontSize: '0.9rem' }}>{error}</p>}
        </div>

        {/* Active Analysis Result */}
        {currentLead && (
          <div className="card" style={{ borderColor: 'var(--primary-cyan)', boxShadow: '0 0 25px rgba(56, 189, 248, 0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>{currentLead.companyName}</h2>
                <span style={{ color: 'var(--primary-cyan)', fontSize: '0.95rem' }}>{currentLead.domain}</span>
              </div>
              <span className={`badge badge-${currentLead.aiAnalysis.priority.toLowerCase()}`}>
                Deal Score: {currentLead.aiAnalysis.dealScore}/100 ({currentLead.aiAnalysis.priority} Priority)
              </span>
            </div>

            <div className="grid-2">
              <div>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem', margin: '0 0 12px 0' }}>
                  <ShieldCheck size={18} color="var(--primary-cyan)" /> Verification Status
                </h3>
                <p style={{ margin: '0 0 8px 0' }}>
                  <strong>MX Mail Server:</strong>{' '}
                  {currentLead.verification.mxValid ? (
                    <span style={{ color: '#34d399' }}>🟢 Active & Deliverable</span>
                  ) : (
                    <span style={{ color: '#f87171' }}>🔴 No Valid MX Record</span>
                  )}
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Scraped Emails:</strong>{' '}
                  <span style={{ color: 'var(--text-muted)' }}>
                    {currentLead.verification.scrapedEmails.join(', ') || 'No public emails detected'}
                  </span>
                </p>
              </div>

              <div>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem', margin: '0 0 12px 0' }}>
                  <Zap size={18} color="var(--accent-amber)" /> Strategic Highlights
                </h3>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#cbd5e1' }}>
                  {currentLead.aiAnalysis.strengths.map((str, idx) => (
                    <li key={idx} style={{ marginBottom: '6px', fontSize: '0.9rem' }}>{str}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem', margin: '0 0 12px 0' }}>
                <Mail size={18} color="var(--primary-cyan)" /> AI Cold Pitch Recommendation
              </h3>
              <div className="pitch-box">{currentLead.aiAnalysis.coldPitch}</div>
            </div>
          </div>
        )}

        {/* History Table Card */}
        <div className="card">
          <h3 style={{ margin: '0 0 16px 0', fontSize: '1.2rem', fontWeight: 700 }}>Scraping & Qualification History</h3>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Company / Domain</th>
                  <th>MX Status</th>
                  <th>Deal Score</th>
                  <th>Priority Tag</th>
                </tr>
              </thead>
              <tbody>
                {savedLeads.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '32px' }}>
                      No analyzed leads yet. Enter a domain above to get started.
                    </td>
                  </tr>
                ) : (
                  savedLeads.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <strong style={{ color: '#fff' }}>{item.companyName}</strong>
                        <br />
                        <small style={{ color: 'var(--text-muted)' }}>{item.domain}</small>
                      </td>
                      <td>
                        {item.verification.mxValid ? (
                          <span style={{ color: '#34d399', fontSize: '0.85rem', fontWeight: 600 }}>🟢 Verified MX</span>
                        ) : (
                          <span style={{ color: '#f87171', fontSize: '0.85rem', fontWeight: 600 }}>🔴 No MX</span>
                        )}
                      </td>
                      <td>
                        <strong style={{ fontSize: '1.05rem' }}>{item.aiAnalysis.dealScore}</strong>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>/100</span>
                      </td>
                      <td>
                        <span className={`badge badge-${item.aiAnalysis.priority.toLowerCase()}`}>
                          {item.aiAnalysis.priority}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
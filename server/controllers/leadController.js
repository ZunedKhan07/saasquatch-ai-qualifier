import { Lead } from '../models/Lead.js';
import { scrapeWebsite, checkDomainMX } from '../utils/scraper.js';
import { analyzeLeadWithAI } from '../utils/aiAnalyzer.js';

// Controller 1: Analyze Domain & Create Lead
export const analyzeAndSaveLead = async (req, res) => {
  try {
    const { domain, companyName } = req.body;

    if (!domain) {
      return res.status(400).json({ error: 'Domain/URL is required' });
    }

    // Step A: Scrape Content
    const scrapedData = await scrapeWebsite(domain);
    if (!scrapedData.success && !scrapedData.text) {
      return res.status(400).json({ error: 'Failed to extract content from domain' });
    }

    // Step B: Real-time MX Verification
    const isMxValid = await checkDomainMX(domain);

    // Step C: Gemini AI Deal Scoring
    const aiResult = await analyzeLeadWithAI(companyName || domain, scrapedData.text);

    // Step D: Save to MongoDB
    const newLead = new Lead({
      domain,
      companyName: companyName || domain,
      verification: {
        scrapedEmails: scrapedData.emails,
        mxValid: isMxValid,
        status: isMxValid ? 'Verified' : 'No MX Record',
      },
      aiAnalysis: aiResult.data,
    });

    await newLead.save();

    return res.status(201).json({
      message: 'Lead analyzed and saved successfully',
      lead: newLead,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Controller 2: Fetch All Leads
export const getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    return res.json(leads);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
import axios from 'axios';
import * as cheerio from 'cheerio';
import dns from 'dns/promises';

// 1. Email Domain ka MX Record Check Karna (No API Key Required)
export async function checkDomainMX(domain) {
  try {
    const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
    const mxRecords = await dns.resolveMx(cleanDomain);
    return mxRecords && mxRecords.length > 0;
  } catch (error) {
    return false;
  }
}

// 2. Website Text & Public Emails Extract Karna
export async function scrapeWebsite(url) {
  try {
    const targetUrl = url.startsWith('http') ? url : `https://${url}`;
    const { data: html } = await axios.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      timeout: 8000,
    });

    const $ = cheerio.load(html);

    // Script, Style, Navigation extra text ko remove karo
    $('script, style, nav, footer, iframe').remove();

    // Body ka main text fetch karo
    const bodyText = $('body').text().replace(/\s+/g, ' ').trim().slice(0, 3000);

    // Page par maujood public emails regex se find karo
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const foundEmails = [...new Set(html.match(emailRegex) || [])].slice(0, 5);

    return {
      success: true,
      text: bodyText,
      emails: foundEmails,
    };
  } catch (error) {
    return {
      success: false,
      text: '',
      emails: [],
      error: error.message,
    };
  }
}
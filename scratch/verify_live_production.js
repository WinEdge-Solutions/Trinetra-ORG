/**
 * Verify Live Vercel Production Form Endpoints
 */
const https = require('https');

const BASE_URL = 'https://trinetra-gargi-foundation.vercel.app';

function postJson(path, payload) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const url = new URL(path, BASE_URL);

    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        'Origin': BASE_URL,
        'Referer': BASE_URL + '/donate.html',
        'User-Agent': 'Live-Production-Verifier'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, text: body });
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function verifyLive() {
  console.log('Testing Live Production Form Endpoints on Vercel:\n');

  // 1. Donation receipt
  console.log('1. Testing POST /api/donation-receipt...');
  const donRes = await postJson('/api/donation-receipt', {
    donorName: 'Live Verification Donor',
    donorEmail: 'live.test@example.org',
    donorPhone: '9876543210',
    amountPaid: 1200,
    paymentMode: 'upi-qr',
    transactionRefNo: 'UTR-LIVE-998877',
    honeypot_title: ''
  });
  console.log(`   Status: ${donRes.status}`);
  console.log(`   Response:`, donRes.data);
  if (donRes.status !== 200 || !donRes.data.success || !donRes.data.trackingId) {
    throw new Error('Live donation-receipt failed!');
  }

  // 2. Help & Report SOS
  console.log('\n2. Testing POST /api/help-report...');
  const sosRes = await postJson('/api/help-report', {
    isAnonymous: true,
    incidentCategory: 'child-labour',
    district: 'Jaipur',
    landmarkLocation: 'Near Live Test Verification Point',
    description: 'Automated live verification test for confidential intake report.',
    honeypot_website: ''
  });
  console.log(`   Status: ${sosRes.status}`);
  console.log(`   Response:`, sosRes.data);
  if (sosRes.status !== 200 || !sosRes.data.success || !sosRes.data.trackingId) {
    throw new Error('Live help-report failed!');
  }

  // 3. Volunteer
  console.log('\n3. Testing POST /api/volunteer...');
  const volRes = await postJson('/api/volunteer', {
    fullName: 'Live Volunteer',
    email: 'live.volunteer@example.org',
    phone: '9876543210',
    city: 'Jaipur',
    preferredRole: 'bridge-school',
    weeklyAvailabilityHours: 'weekends',
    skillsAndBackground: 'Legal and educational support background',
    safeguardingAgreement: true,
    message: 'Live test verification message.',
    honeypot_company: ''
  });
  console.log(`   Status: ${volRes.status}`);
  console.log(`   Response:`, volRes.data);
  if (volRes.status !== 200 || !volRes.data.success || !volRes.data.trackingId) {
    throw new Error('Live volunteer failed!');
  }

  // 4. CSR Partnership
  console.log('\n4. Testing POST /api/partnership...');
  const csrRes = await postJson('/api/partnership', {
    companyName: 'Live Enterprise Ltd',
    contactPersonName: 'Live CSR Director',
    officialEmail: 'csr.lead@example.org',
    phone: '9876543210',
    partnershipType: 'csr-grant',
    targetPillar: 'education',
    budgetRange: '25-50L',
    message: 'Live test inquiry for CSR partnership.',
    honeypot_fax: ''
  });
  console.log(`   Status: ${csrRes.status}`);
  console.log(`   Response:`, csrRes.data);
  if (csrRes.status !== 200 || !csrRes.data.success || !csrRes.data.trackingId) {
    throw new Error('Live partnership failed!');
  }

  // 5. Contact
  console.log('\n5. Testing POST /api/contact...');
  const conRes = await postJson('/api/contact', {
    fullName: 'Live Citizen Inquirer',
    email: 'citizen@example.org',
    inquiryType: 'general',
    message: 'Live test general inquiry message for verification.',
    honeypot_url: ''
  });
  console.log(`   Status: ${conRes.status}`);
  console.log(`   Response:`, conRes.data);
  if (conRes.status !== 200 || !conRes.data.success || !conRes.data.trackingId) {
    throw new Error('Live contact failed!');
  }

  console.log('\nALL 5 LIVE PRODUCTION ENDPOINTS TESTED AND VERIFIED 100% OPERATIONAL!');
}

verifyLive().catch(err => {
  console.error('\nLive Verification Error:', err.message);
  process.exit(1);
});

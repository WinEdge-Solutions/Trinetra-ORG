/**
 * Test all 5 Vercel Serverless Form Endpoints locally
 * Adheres strictly to docs/FORMS-SPEC.md:
 * - Valid submissions return HTTP 200 with authentic statutory trackingId
 * - Honeypot submissions return HTTP 200 { success: true } to silently drop spam without dispatch
 * - Invalid inputs return HTTP 400 with helpful error messages
 */
const donationHandler = require('../api/donation-receipt');
const helpReportHandler = require('../api/help-report');
const volunteerHandler = require('../api/volunteer');
const partnershipHandler = require('../api/partnership');
const contactHandler = require('../api/contact');

function createMockReqRes(body, method = 'POST') {
  const req = {
    method,
    headers: {
      'x-forwarded-for': '127.0.0.1',
      'user-agent': 'Automated-Local-Tester'
    },
    body
  };
  let statusCode = 200;
  let responseData = null;

  const res = {
    status(code) {
      statusCode = code;
      return res;
    },
    json(data) {
      responseData = data;
      return res;
    },
    setHeader() {
      return res;
    }
  };

  return { req, res, getStatus: () => statusCode, getData: () => responseData };
}

async function runTests() {
  console.log('Testing All Form Endpoints Locally...\n');
  let passed = 0;
  let total = 0;

  async function assertTest(name, fn) {
    total++;
    try {
      await fn();
      console.log(`✔ PASS: ${name}`);
      passed++;
    } catch (e) {
      console.error(`✖ FAIL: ${name} ->`, e.message);
    }
  }

  // 1. Donation Receipt API
  await assertTest('Donation Receipt: Valid Submission returns 200 with TGF-DON trackingId', async () => {
    const { req, res, getStatus, getData } = createMockReqRes({
      donorName: 'Test Donor',
      donorEmail: 'test.donor@example.org',
      donorPhone: '9876543210',
      amountPaid: 1200,
      paymentMode: 'upi-qr',
      transactionRefNo: 'TEST-UTR-123456',
      honeypot_title: ''
    });
    await donationHandler(req, res);
    if (getStatus() !== 200) throw new Error(`Expected 200, got ${getStatus()}: ${JSON.stringify(getData())}`);
    if (!getData().trackingId || !getData().trackingId.startsWith('TGF-DON-')) {
      throw new Error(`Invalid tracking ID: ${getData().trackingId}`);
    }
  });

  await assertTest('Donation Receipt: Honeypot silently drops spam with 200 per FORMS-SPEC.md Section 3', async () => {
    const { req, res, getStatus, getData } = createMockReqRes({
      donorName: 'Bot',
      donorEmail: 'bot@spam.com',
      donorPhone: '9876543210',
      amountPaid: 500,
      transactionRefNo: 'UTR123',
      honeypot_title: 'I am a spam bot'
    });
    await donationHandler(req, res);
    if (getStatus() !== 200 || !getData().success) throw new Error(`Expected 200 success: true, got ${getStatus()}`);
  });

  await assertTest('Donation Receipt: Invalid input returns 400', async () => {
    const { req, res, getStatus } = createMockReqRes({
      donorName: 'X', // too short (< 2 chars)
      donorEmail: 'bad-email',
      donorPhone: '123',
      amountPaid: 50, // < 100
      transactionRefNo: '',
      honeypot_title: ''
    });
    await donationHandler(req, res);
    if (getStatus() !== 400) throw new Error(`Expected 400, got ${getStatus()}`);
  });

  // 2. Help & Report SOS API
  await assertTest('Help & Report: Anonymous report returns 200 with TGF-SOS trackingId', async () => {
    const { req, res, getStatus, getData } = createMockReqRes({
      isAnonymous: true,
      incidentCategory: 'child-labour',
      district: 'Jaipur',
      landmarkLocation: 'Near Railway Station Market',
      description: 'Observed school-aged minor working at roadside tea stall during school hours.',
      honeypot_website: ''
    });
    await helpReportHandler(req, res);
    if (getStatus() !== 200) throw new Error(`Expected 200, got ${getStatus()}: ${JSON.stringify(getData())}`);
    if (!getData().trackingId || !getData().trackingId.startsWith('TGF-SOS-')) {
      throw new Error(`Invalid tracking ID: ${getData().trackingId}`);
    }
    if (!getData().isAnonymous) throw new Error(`Expected isAnonymous true`);
  });

  await assertTest('Help & Report: Honeypot silently drops spam with 200 per FORMS-SPEC.md Section 3', async () => {
    const { req, res, getStatus, getData } = createMockReqRes({
      isAnonymous: true,
      incidentCategory: 'other',
      district: 'Jaipur',
      landmarkLocation: 'Test Location',
      description: 'Long enough description for testing purposes...',
      honeypot_website: 'http://spam.org'
    });
    await helpReportHandler(req, res);
    if (getStatus() !== 200 || !getData().success) throw new Error(`Expected 200 success: true, got ${getStatus()}`);
  });

  // 3. Volunteer Application API
  await assertTest('Volunteer Application: Valid enrolment returns 200 with TGF-VOL trackingId', async () => {
    const { req, res, getStatus, getData } = createMockReqRes({
      fullName: 'Priyanshu Sharma',
      email: 'priyanshu@example.org',
      phone: '9876543210',
      city: 'Jaipur',
      preferredRole: 'bridge-school',
      weeklyAvailabilityHours: 'weekends',
      skillsAndBackground: 'Legal literacy and volunteer teaching experience',
      safeguardingAgreement: true,
      message: 'Committed to child rights and literacy advancement.',
      honeypot_company: ''
    });
    await volunteerHandler(req, res);
    if (getStatus() !== 200) throw new Error(`Expected 200, got ${getStatus()}: ${JSON.stringify(getData())}`);
    if (!getData().trackingId || !getData().trackingId.startsWith('TGF-VOL-')) {
      throw new Error(`Invalid tracking ID: ${getData().trackingId}`);
    }
  });

  // 4. CSR Partnership API
  await assertTest('CSR Partnership: Valid inquiry returns 200 with TGF-CSR trackingId', async () => {
    const { req, res, getStatus, getData } = createMockReqRes({
      companyName: 'Apex Capital Partners',
      contactPersonName: 'Ananya Sen',
      officialEmail: 'ananya.sen@apex.com',
      phone: '9876543210',
      partnershipType: 'csr-grant',
      targetPillar: 'education',
      budgetRange: '25-50L',
      message: 'Looking to support bridge school expansion across rural Rajasthan.',
      honeypot_fax: ''
    });
    await partnershipHandler(req, res);
    if (getStatus() !== 200) throw new Error(`Expected 200, got ${getStatus()}: ${JSON.stringify(getData())}`);
    if (!getData().trackingId || !getData().trackingId.startsWith('TGF-CSR-')) {
      throw new Error(`Invalid tracking ID: ${getData().trackingId}`);
    }
  });

  // 5. Contact Inquiry API
  await assertTest('Contact Inquiry: Valid submission returns 200 with TGF-INQ trackingId', async () => {
    const { req, res, getStatus, getData } = createMockReqRes({
      fullName: 'Vikram Singh',
      email: 'vikram.singh@example.org',
      phone: '9876543210',
      inquiryType: 'scheme-assistance',
      message: 'Need information regarding RTE 12(1)(c) admission documents and procedures.',
      honeypot_url: ''
    });
    await contactHandler(req, res);
    if (getStatus() !== 200) throw new Error(`Expected 200, got ${getStatus()}: ${JSON.stringify(getData())}`);
    if (!getData().trackingId || !getData().trackingId.startsWith('TGF-INQ-')) {
      throw new Error(`Invalid tracking ID: ${getData().trackingId}`);
    }
  });

  console.log(`\nAll Form Endpoint Tests: ${passed}/${total} Passed!`);
  if (passed !== total) process.exit(1);
}

runTests().catch(err => {
  console.error('Test Suite Failed:', err);
  process.exit(1);
});

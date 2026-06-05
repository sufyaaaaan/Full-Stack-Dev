require('dotenv').config();
const mongoose = require('mongoose');
const Customer = require('./models/Customer');
const User = require('./models/User');

const customers = [
  { name: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '+1-555-0101', company: 'TechVision Corp', status: 'Active', address: '123 Tech Ave, San Francisco, CA 94105', notes: 'Long-term enterprise client. Renewal due Q3.', totalRevenue: 45000 },
  { name: 'Bob Martinez', email: 'bob.martinez@example.com', phone: '+1-555-0102', company: 'Nexus Solutions', status: 'Lead', address: '456 Innovation Blvd, Austin, TX 78701', notes: 'Interested in full-stack development services.', totalRevenue: 0 },
  { name: 'Carol White', email: 'carol.white@example.com', phone: '+1-555-0103', company: 'Global Retail Inc', status: 'Active', address: '789 Commerce St, New York, NY 10001', notes: 'eCommerce platform upgrade project ongoing.', totalRevenue: 78500 },
  { name: 'David Lee', email: 'david.lee@example.com', phone: '+1-555-0104', company: 'CloudBase Systems', status: 'Inactive', address: '321 Cloud Rd, Seattle, WA 98101', notes: 'Contract ended. May renew in Q4.', totalRevenue: 22000 },
  { name: 'Emma Davis', email: 'emma.davis@example.com', phone: '+1-555-0105', company: 'StartupHub', status: 'Lead', address: '654 Startup Lane, Boston, MA 02101', notes: 'Startup accelerator referral. Demo scheduled.', totalRevenue: 0 },
  { name: 'Frank Wilson', email: 'frank.wilson@example.com', phone: '+1-555-0106', company: 'Precision Analytics', status: 'Active', address: '987 Data Dr, Chicago, IL 60601', notes: 'Data analytics dashboard project. Very satisfied.', totalRevenue: 63000 },
  { name: 'Grace Chen', email: 'grace.chen@example.com', phone: '+1-555-0107', company: 'Bright Minds Agency', status: 'Active', address: '147 Creative Blvd, Los Angeles, CA 90001', notes: 'Marketing automation client. High value.', totalRevenue: 91500 },
  { name: 'Henry Brown', email: 'henry.brown@example.com', phone: '+1-555-0108', company: 'SafeGuard Insurance', status: 'Inactive', address: '258 Insurance Ave, Denver, CO 80201', notes: 'Legacy system migration stalled. Follow up required.', totalRevenue: 15000 },
  { name: 'Isabella Taylor', email: 'isabella.taylor@example.com', phone: '+1-555-0109', company: 'EduLearn Platform', status: 'Active', address: '369 Learning St, Portland, OR 97201', notes: 'LMS development client. Phase 2 in progress.', totalRevenue: 54000 },
  { name: 'Jack Anderson', email: 'jack.anderson@example.com', phone: '+1-555-0110', company: 'Velocity Motors', status: 'Lead', address: '741 Auto Row, Detroit, MI 48201', notes: 'Inquiry about fleet management software.', totalRevenue: 0 },
  { name: 'Karen Thompson', email: 'karen.thompson@example.com', phone: '+1-555-0111', company: 'Harmony Health', status: 'Active', address: '852 Wellness Way, Nashville, TN 37201', notes: 'Healthcare portal client. HIPAA compliant solution.', totalRevenue: 87000 },
  { name: 'Liam Garcia', email: 'liam.garcia@example.com', phone: '+1-555-0112', company: 'FreshFarm Organics', status: 'Lead', address: '963 Farm Rd, Phoenix, AZ 85001', notes: 'Looking for inventory & POS integration.', totalRevenue: 0 },
  { name: 'Mia Robinson', email: 'mia.robinson@example.com', phone: '+1-555-0113', company: 'FinEdge Capital', status: 'Active', address: '159 Finance Plaza, Miami, FL 33101', notes: 'Fintech dashboard. Priority client.', totalRevenue: 120000 },
  { name: 'Nathan Clark', email: 'nathan.clark@example.com', phone: '+1-555-0114', company: 'EcoBuilders LLC', status: 'Inactive', address: '753 Green Ave, Minneapolis, MN 55401', notes: 'Project completed. Positive review given.', totalRevenue: 31000 },
  { name: 'Olivia Scott', email: 'olivia.scott@example.com', phone: '+1-555-0115', company: 'SwiftLogistics', status: 'Active', address: '486 Logistics Pkwy, Dallas, TX 75201', notes: 'Supply chain tracking system. Contract renewed.', totalRevenue: 68000 },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find or create a default admin user for createdBy reference
    let adminUser = await User.findOne({ email: 'admin@crm.com' });
    if (!adminUser) {
      adminUser = await User.create({
        name: 'CRM Admin',
        email: 'admin@crm.com',
        password: 'admin123456',
        role: 'admin',
      });
      console.log('✅ Default admin user created: admin@crm.com / admin123456');
    }

    // Clear existing customers
    await Customer.deleteMany({});
    console.log('🗑️  Cleared existing customers');

    // Insert seed customers
    const insertedCustomers = await Customer.insertMany(
      customers.map((c) => ({ ...c, createdBy: adminUser._id }))
    );

    console.log(`✅ Successfully seeded ${insertedCustomers.length} customers`);
    console.log('\n--- SEED COMPLETE ---');
    console.log('Default login credentials:');
    console.log('  Email:    admin@crm.com');
    console.log('  Password: admin123456');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedDB();

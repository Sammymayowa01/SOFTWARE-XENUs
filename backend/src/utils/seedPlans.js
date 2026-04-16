const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Plan = require('../models/Plan');

// Load .env from root backend directory
dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

const connectDB = require('../config/db');

const plans = [
  {
    title: "Basic",
    price: "$99",
    amount: 99,
    features: [
      "5 Web Pages",
      "Mobile-Responsive Design",
      "Basic SEO",
      "1 Month of Support",
    ],
  },
  {
    title: "Pro",
    price: "$199",
    amount: 199,
    features: [
      "10 Web Pages",
      "Advanced UI/UX Design",
      "Advanced SEO",
      "Content Management System",
      "3 Months of Support",
    ],
    isPopular: true,
  },
  {
    title: "Enterprise",
    price: "Contact Us",
    amount: 0,
    features: [
      "Unlimited Web Pages",
      "Custom UI/UX Design",
      "Dedicated SEO and Marketing",
      "Custom Features and Integrations",
      "24/7 Priority Support",
    ],
  },
];

const seedPlans = async () => {
  try {
    await connectDB();

    await Plan.deleteMany();
    await Plan.insertMany(plans);

    console.log('Plans seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding plans:', error);
    process.exit(1);
  }
};

seedPlans();
const express = require('express');
const router = express.Router();
const { getPlans, createPlan } = require('../controllers/planController');

router.route('/').get(getPlans).post(createPlan);

module.exports = router;

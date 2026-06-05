const express = require('express');
const router = express.Router();
const {
  getInvoices,
  getInvoice,
  createInvoice,
  deleteInvoice,
  updateInvoiceStatus,
} = require('../controllers/invoiceController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/').get(getInvoices).post(createInvoice);
router.route('/:id').get(getInvoice).delete(deleteInvoice);
router.put('/:id/status', updateInvoiceStatus);

module.exports = router;


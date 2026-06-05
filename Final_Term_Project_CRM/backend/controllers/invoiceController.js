const Invoice = require('../models/Invoice');
const Customer = require('../models/Customer');

// Generate invoice number
const generateInvoiceNumber = () => {
  const now = new Date();
  const year = now.getFullYear();
  const rand = Math.floor(Math.random() * 90000) + 10000;
  return `INV-${year}-${rand}`;
};

// @desc    Get all invoices
// @route   GET /api/invoices
// @access  Private
const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate('customer', 'name email company').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: invoices.length, data: invoices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single invoice
// @route   GET /api/invoices/:id
// @access  Private
const getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate('customer');
    if (!invoice) return res.status(404).json({ success: false, message: 'Invoice not found.' });
    res.status(200).json({ success: true, data: invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create invoice
// @route   POST /api/invoices
// @access  Private
const createInvoice = async (req, res) => {
  try {
    const { customerId, items, tax, discount, dueDate, notes, status } = req.body;

    const customer = await Customer.findById(customerId);
    if (!customer) return res.status(404).json({ success: false, message: 'Customer not found.' });

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const taxAmount = subtotal * ((tax || 0) / 100);
    const discountAmount = subtotal * ((discount || 0) / 100);
    const totalAmount = subtotal + taxAmount - discountAmount;

    const processedItems = items.map((item) => ({
      ...item,
      total: item.quantity * item.unitPrice,
    }));

    const invoice = await Invoice.create({
      invoiceNumber: generateInvoiceNumber(),
      customer: customerId,
      customerSnapshot: {
        name: customer.name,
        email: customer.email,
        company: customer.company,
        phone: customer.phone,
        address: customer.address,
      },
      items: processedItems,
      subtotal,
      tax: tax || 0,
      discount: discount || 0,
      totalAmount,
      status: status || 'Draft',
      dueDate,
      notes,
      createdBy: req.user._id,
    });

    res.status(201).json({ success: true, message: 'Invoice created successfully!', data: invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete invoice
// @route   DELETE /api/invoices/:id
// @access  Private
const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ success: false, message: 'Invoice not found.' });
    await invoice.deleteOne();
    res.status(200).json({ success: true, message: 'Invoice deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update invoice status
// @route   PUT /api/invoices/:id/status
// @access  Private
const updateInvoiceStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Draft', 'Sent', 'Paid', 'Overdue'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: `Status must be one of: ${validStatuses.join(', ')}` });
    }
    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!invoice) return res.status(404).json({ success: false, message: 'Invoice not found.' });
    res.status(200).json({ success: true, message: `Status updated to ${status}.`, data: invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getInvoices, getInvoice, createInvoice, deleteInvoice, updateInvoiceStatus };

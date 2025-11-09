import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: `INV-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    companyName: '',
    companyAddress: '',
    companyPhone: '',
    customerName: '',
    customerAddress: '',
    customerPhone: '',
    items: [{ id: 1, description: '', quantity: 1, price: 0 }],
    tax: 0,
    notes: ''
  });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('invoiceData');
    if (saved) {
      setInvoiceData(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('invoiceData', JSON.stringify(invoiceData));
  }, [invoiceData]);

  // Update field
  const updateField = (field, value) => {
    setInvoiceData(prev => ({ ...prev, [field]: value }));
  };

  // Add new item
  const addItem = () => {
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, { id: Date.now(), description: '', quantity: 1, price: 0 }]
    }));
  };

  // Remove item
  const removeItem = (id) => {
    if (invoiceData.items.length > 1) {
      setInvoiceData(prev => ({
        ...prev,
        items: prev.items.filter(item => item.id !== id)
      }));
    }
  };

  // Update item
  const updateItem = (id, field, value) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, [field]: parseFloat(value) || (field === 'description' ? value : 0) } : item
      )
    }));
  };

  // Calculate totals
  const getSubtotal = () => {
    return invoiceData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  const getTaxAmount = () => {
    return (getSubtotal() * invoiceData.tax) / 100;
  };

  const getTotal = () => {
    return getSubtotal() + getTaxAmount();
  };

  // Clear form
  const clearForm = () => {
    setInvoiceData({
      invoiceNumber: `INV-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      companyName: '',
      companyAddress: '',
      companyPhone: '',
      customerName: '',
      customerAddress: '',
      customerPhone: '',
      items: [{ id: Date.now(), description: '', quantity: 1, price: 0 }],
      tax: 0,
      notes: ''
    });
    localStorage.removeItem('invoiceData');
  };

  // Print invoice
  const printInvoice = () => {
    window.print();
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>💰 Bill Invoice App</h1>
          <p>Create professional invoices easily</p>
        </header>

        <div className="main-content">
          {/* Form Section */}
          <div className="form-section">
            <h2>Create Invoice</h2>

            {/* Invoice Info */}
            <div className="form-group">
              <label>Invoice Number</label>
              <input
                type="text"
                value={invoiceData.invoiceNumber}
                onChange={(e) => updateField('invoiceNumber', e.target.value)}
                placeholder="INV-001"
              />
            </div>

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={invoiceData.date}
                onChange={(e) => updateField('date', e.target.value)}
              />
            </div>

            {/* Company Info */}
            <div className="section-title">Your Company Details</div>
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                value={invoiceData.companyName}
                onChange={(e) => updateField('companyName', e.target.value)}
                placeholder="Your Company Name"
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                value={invoiceData.companyAddress}
                onChange={(e) => updateField('companyAddress', e.target.value)}
                placeholder="Company Address"
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                value={invoiceData.companyPhone}
                onChange={(e) => updateField('companyPhone', e.target.value)}
                placeholder="Company Phone"
              />
            </div>

            {/* Customer Info */}
            <div className="section-title">Customer Details</div>
            <div className="form-group">
              <label>Customer Name</label>
              <input
                type="text"
                value={invoiceData.customerName}
                onChange={(e) => updateField('customerName', e.target.value)}
                placeholder="Customer Name"
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                value={invoiceData.customerAddress}
                onChange={(e) => updateField('customerAddress', e.target.value)}
                placeholder="Customer Address"
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                value={invoiceData.customerPhone}
                onChange={(e) => updateField('customerPhone', e.target.value)}
                placeholder="Customer Phone"
              />
            </div>

            {/* Items */}
            <div className="section-title">Invoice Items</div>
            {invoiceData.items.map((item, index) => (
              <div key={item.id} className="item-row">
                <div className="item-number">{index + 1}</div>
                <input
                  type="text"
                  placeholder="Item Description"
                  value={item.description}
                  onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                  className="item-description"
                />
                <input
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                  className="item-qty"
                  min="0"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) => updateItem(item.id, 'price', e.target.value)}
                  className="item-price"
                  min="0"
                />
                <div className="item-total">${(item.quantity * item.price).toFixed(2)}</div>
                {invoiceData.items.length > 1 && (
                  <button onClick={() => removeItem(item.id)} className="btn-remove">×</button>
                )}
              </div>
            ))}

            <button onClick={addItem} className="btn-add">+ Add Item</button>

            {/* Tax and Notes */}
            <div className="form-group">
              <label>Tax Rate (%)</label>
              <input
                type="number"
                value={invoiceData.tax}
                onChange={(e) => updateField('tax', parseFloat(e.target.value) || 0)}
                placeholder="0"
                min="0"
                max="100"
              />
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                value={invoiceData.notes}
                onChange={(e) => updateField('notes', e.target.value)}
                placeholder="Additional notes..."
                rows="3"
              />
            </div>

            {/* Buttons */}
            <div className="button-group">
              <button onClick={clearForm} className="btn-clear">Clear All</button>
              <button onClick={printInvoice} className="btn-print">Print Invoice</button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="preview-section">
            <h2>Invoice Preview</h2>
            <div className="invoice-preview">
              <div className="invoice-header">
                <h1>INVOICE</h1>
                <div className="invoice-number">#{invoiceData.invoiceNumber}</div>
                <div className="invoice-date">Date: {new Date(invoiceData.date).toLocaleDateString()}</div>
              </div>

              <div className="invoice-body">
                <div className="invoice-from">
                  <h3>From:</h3>
                  <p><strong>{invoiceData.companyName || 'Your Company'}</strong></p>
                  <p>{invoiceData.companyAddress || 'Company Address'}</p>
                  <p>{invoiceData.companyPhone || 'Phone Number'}</p>
                </div>

                <div className="invoice-to">
                  <h3>To:</h3>
                  <p><strong>{invoiceData.customerName || 'Customer Name'}</strong></p>
                  <p>{invoiceData.customerAddress || 'Customer Address'}</p>
                  <p>{invoiceData.customerPhone || 'Phone Number'}</p>
                </div>
              </div>

              <table className="invoice-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Description</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.items.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.description || '-'}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>${(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="invoice-totals">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span>${getSubtotal().toFixed(2)}</span>
                </div>
                {invoiceData.tax > 0 && (
                  <div className="total-row">
                    <span>Tax ({invoiceData.tax}%):</span>
                    <span>${getTaxAmount().toFixed(2)}</span>
                  </div>
                )}
                <div className="total-row final-total">
                  <span>Total:</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
              </div>

              {invoiceData.notes && (
                <div className="invoice-notes">
                  <h4>Notes:</h4>
                  <p>{invoiceData.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

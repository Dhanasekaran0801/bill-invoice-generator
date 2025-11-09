# 💰 Bill & Invoice App

A simple and easy-to-use bill/invoice application built with React.js, HTML, CSS, and JavaScript.

## Features

- ✅ **Easy Invoice Creation** - Simple form to create invoices quickly
- ✅ **Real-time Preview** - See your invoice as you type
- ✅ **Auto Calculations** - Automatic subtotal, tax, and total calculations
- ✅ **Multiple Items** - Add as many items as you need
- ✅ **Local Storage** - Your invoices are automatically saved
- ✅ **Print/PDF** - Print or save as PDF directly from browser
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Simple UI** - Clean and user-friendly interface

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

1. **Fill Invoice Details**
   - Enter invoice number, date, and due date

2. **Add Your Company Info (Bill From)**
   - Company name, email, address, and phone

3. **Add Customer Info (Bill To)**
   - Customer name, email, address, and phone

4. **Add Items**
   - Click "+ Add Item" to add more items
   - Enter description, quantity, and price for each item
   - Amount is calculated automatically

5. **Set Tax Rate**
   - Enter tax rate percentage (e.g., 10 for 10%)

6. **Add Notes** (Optional)
   - Add any additional notes

7. **Preview & Print**
   - See the invoice preview on the right side
   - Click "Print / PDF" to print or save as PDF
   - All data is automatically saved in browser storage

8. **New Invoice**
   - Click "New Invoice" to start fresh

## Technologies Used

- React.js 18
- HTML5
- CSS3
- JavaScript (ES6+)
- Local Storage API

## Project Structure

```
bill-invoice-app/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx          (Main component - all in one file)
│   ├── App.css          (All styles)
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Simple Code

All code is in one main file (`App.jsx`) for easy understanding and modification. The code is simple, clean, and easy to read.

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## License

MIT License - feel free to use this project for your needs!

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import DatePicker from 'react-datepicker';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import 'react-datepicker/dist/react-datepicker.css';

const AdminSalesReport = () => {
  const [sales, setSales] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const fetchSales = async () => {
    try {
      const params = {};

      if (startDate && endDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);

        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        params.startDate = start.toISOString();
        params.endDate = end.toISOString();
      }

      const res = await axios.get('http://localhost:3000/sales', { params });
      setSales(res.data);
      console.log('Sales data:', res.data);
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  // Optionally fetch initial sales on first render (you can remove if not needed)
  useEffect(() => {
    fetchSales();
  }, []);

  const columns = [
    { name: 'Medicine', selector: row => row.productName, sortable: true },
    { name: 'Seller Email', selector: row => row.sellerEmail, sortable: true },
    { name: 'Buyer Email', selector: row => row.userEmail, sortable: true },
    { name: 'Qty', selector: row => row.qty },
    { name: 'Price', selector: row => `৳${row.subtotal}` },
    { name: 'Date', selector: row => new Date(row.orderDate).toLocaleDateString() }
  ];

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Sales Report', 14, 10);
    const rows = sales.map(s => [
      s.productName, s.sellerEmail, s.userEmail, s.qty, s.subtotal, new Date(s.orderDate).toLocaleDateString()
    ]);
    doc.autoTable({
      head: [['Medicine', 'Seller', 'Buyer', 'Qty', 'Total', 'Date']],
      body: rows
    });
    doc.save('sales-report.pdf');
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(sales.map(s => ({
      Medicine: s.productName,
      Seller: s.sellerEmail,
      Buyer: s.userEmail,
      Quantity: s.qty,
      Total: s.subtotal,
      Date: new Date(s.orderDate).toLocaleDateString()
    })));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'SalesReport');
    XLSX.writeFile(wb, 'sales-report.xlsx');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Sales Report</h2>

      <div className="flex gap-4 mb-4 items-center flex-wrap">
        <DatePicker
          selected={startDate}
          onChange={setStartDate}
          placeholderText="Start Date"
          className="input input-bordered"
        />
        <DatePicker
          selected={endDate}
          onChange={setEndDate}
          placeholderText="End Date"
          className="input input-bordered"
        />
        <button onClick={fetchSales} className="btn btn-primary">Filter</button>
        <button onClick={exportPDF} className="btn btn-outline">Export PDF</button>
        <button onClick={exportExcel} className="btn btn-outline">Export Excel</button>
      </div>

      <DataTable
        columns={columns}
        data={sales}
        pagination
        highlightOnHover
        striped
        responsive
      />
    </div>
  );
};

export default AdminSalesReport;


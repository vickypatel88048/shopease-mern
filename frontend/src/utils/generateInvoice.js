import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const generateInvoice = (order) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("ShopEase Invoice", 14, 20);

  doc.setFontSize(12);
  doc.text(`Order ID: ${order._id}`, 14, 35);
  doc.text(`Customer: ${order.customerName}`, 14, 43);
  doc.text(`Email: ${order.email}`, 14, 51);
  doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 14, 59);

  const tableData = order.items.map((item) => [
    item.name,
    item.quantity,
    `₹${item.price}`,
    `₹${item.price * item.quantity}`,
  ]);

  autoTable(doc, {
    startY: 70,
    head: [["Product", "Qty", "Price", "Total"]],
    body: tableData,
  });

  doc.text(
    `Grand Total: ₹${order.totalPrice}`,
    14,
    doc.lastAutoTable.finalY + 15
  );

  doc.save(`Invoice-${order._id}.pdf`);
};

export default generateInvoice;
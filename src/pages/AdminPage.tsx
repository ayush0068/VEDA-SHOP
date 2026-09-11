import React, { useState } from 'react';
import { DollarSign, ShoppingBag, Users, Package, AlertTriangle, FileText, CheckCircle, XCircle, Plus, Edit, Trash2, Eye, ShieldCheck } from 'lucide-react';
import { GEMSTONE_PRODUCTS_LIST, BLOG_ARTICLES_DATA, VERIFIED_GEMSTONE_REVIEWS } from '../data/gemstoneData';

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'blog' | 'reviews'>('overview');
  const [productList, setProductList] = useState(GEMSTONE_PRODUCTS_LIST);
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');

  // Simulated Orders
  const [orders, setOrders] = useState([
    {
      id: 'ORD-8921',
      customerName: 'Aarav Sharma',
      date: '2026-09-02',
      items: 'Natural Unheated Ceylon Ruby (5.25 Ct)',
      total: 34500,
      paymentStatus: 'Paid (Razorpay)',
      status: 'Confirmed'
    },
    {
      id: 'ORD-8922',
      customerName: 'Priya Patel',
      date: '2026-09-03',
      items: 'Natural Zambian Emerald (4.15 Ct)',
      total: 28900,
      paymentStatus: 'Paid (Razorpay)',
      status: 'Shipped'
    },
    {
      id: 'ORD-8923',
      customerName: 'Rajiv Malhotra',
      date: '2026-09-04',
      items: 'Certified Ceylon Yellow Sapphire (6.10 Ct)',
      total: 48500,
      paymentStatus: 'Paid (Razorpay)',
      status: 'Pending'
    }
  ]);

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus as any } : o))
    );
  };

  const handleDeleteProduct = (id: string) => {
    setProductList((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8 min-h-screen">
      {/* ADMIN HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-vedic-gold/20 pb-6 gap-4">
        <div>
          <span className="text-xs font-bold text-vedic-goldDark uppercase tracking-widest flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-vedic-gold" /> Veda Structure Control Center
          </span>
          <h1 className="font-serif font-extrabold text-3xl text-vedic-maroon">
            Platform Admin Dashboard
          </h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-2xl border border-vedic-gold/20 shadow-sm text-xs font-serif font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'overview' ? 'bg-vedic-maroon text-vedic-gold shadow' : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'products' ? 'bg-vedic-maroon text-vedic-gold shadow' : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            Products ({productList.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'orders' ? 'bg-vedic-maroon text-vedic-gold shadow' : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'blog' ? 'bg-vedic-maroon text-vedic-gold shadow' : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            Blog
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'reviews' ? 'bg-vedic-maroon text-vedic-gold shadow' : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            Reviews
          </button>
        </div>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-vedic-gold/20 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-vedic-muted uppercase">Gross Revenue</span>
                <h3 className="font-serif font-extrabold text-2xl text-vedic-maroon mt-1">₹1,11,900</h3>
                <span className="text-[10px] text-emerald-600 font-bold">+18.5% this month</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-vedic-gold/20 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-vedic-muted uppercase">Total Orders</span>
                <h3 className="font-serif font-extrabold text-2xl text-vedic-maroon mt-1">3 Orders</h3>
                <span className="text-[10px] text-emerald-600 font-bold">100% Razorpay Verified</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-vedic-gold/20 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-vedic-muted uppercase">Active Customers</span>
                <h3 className="font-serif font-extrabold text-2xl text-vedic-maroon mt-1">1,420 Users</h3>
                <span className="text-[10px] text-vedic-goldDark font-bold">Registered Profiles</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-vedic-gold/20 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-vedic-muted uppercase">Low-Stock Alert</span>
                <h3 className="font-serif font-extrabold text-2xl text-rose-700 mt-1">2 Items</h3>
                <span className="text-[10px] text-rose-600 font-bold">Stock &lt; 3 Units</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Quick Table of Low Stock Items */}
          <div className="bg-white rounded-3xl p-6 border border-vedic-gold/20 shadow-sm space-y-4">
            <h3 className="font-serif font-extrabold text-lg text-vedic-maroon flex items-center gap-2">
              <Package className="w-5 h-5 text-vedic-gold" /> Low Stock Gemstone Inventory
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-vedic-dark border-collapse">
                <thead>
                  <tr className="border-b border-vedic-beige text-vedic-muted font-serif">
                    <th className="py-2 font-bold">SKU</th>
                    <th className="py-2 font-bold">Gemstone Title</th>
                    <th className="py-2 font-bold">Price</th>
                    <th className="py-2 font-bold">Stock Remaining</th>
                    <th className="py-2 font-bold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-vedic-beige">
                  {productList.filter(p => p.stock <= 3).map((p) => (
                    <tr key={p.id}>
                      <td className="py-3 font-mono text-[11px] font-bold">{p.sku}</td>
                      <td className="py-3 font-serif font-bold text-vedic-maroon">{p.title}</td>
                      <td className="py-3 font-bold text-emerald-700">₹{p.price.toLocaleString()}</td>
                      <td className="py-3">
                        <span className="bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full text-[10px]">
                          {p.stock} left
                        </span>
                      </td>
                      <td className="py-3">
                        <button className="bg-vedic-ivory text-vedic-maroon font-bold px-3 py-1 rounded-lg border border-vedic-gold/30 hover:bg-vedic-gold">
                          Restock
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-3xl p-6 border border-vedic-gold/20 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-vedic-beige pb-4">
            <h3 className="font-serif font-extrabold text-xl text-vedic-maroon">Manage Gemstone Catalog</h3>
            <button className="bg-gold-gradient text-vedic-dark font-serif font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 shadow hover:scale-105 transition-transform">
              <Plus className="w-4 h-4" /> Add New Gemstone
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-vedic-beige text-vedic-muted font-serif">
                  <th className="py-2.5 font-bold">Image</th>
                  <th className="py-2.5 font-bold">Title</th>
                  <th className="py-2.5 font-bold">SKU</th>
                  <th className="py-2.5 font-bold">Price</th>
                  <th className="py-2.5 font-bold">Stock</th>
                  <th className="py-2.5 font-bold">Lab Certified</th>
                  <th className="py-2.5 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-vedic-beige">
                {productList.map((prod) => (
                  <tr key={prod.id}>
                    <td className="py-3">
                      <img src={prod.images[0]} alt={prod.title} className="w-10 h-10 rounded-lg object-cover border border-vedic-gold/30" />
                    </td>
                    <td className="py-3 font-serif font-bold text-vedic-dark max-w-xs truncate">{prod.title}</td>
                    <td className="py-3 font-mono text-[11px] text-vedic-muted">{prod.sku}</td>
                    <td className="py-3 font-bold text-emerald-700">₹{prod.price.toLocaleString()}</td>
                    <td className="py-3 font-bold">{prod.stock}</td>
                    <td className="py-3">
                      {prod.labCertified ? (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Yes</span>
                      ) : (
                        <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded-full">No</span>
                      )}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <button className="text-vedic-maroon hover:text-vedic-goldDark p-1">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteProduct(prod.id)} className="text-rose-600 hover:text-rose-800 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl p-6 border border-vedic-gold/20 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-vedic-beige pb-4">
            <h3 className="font-serif font-extrabold text-xl text-vedic-maroon">Order Fulfillment Workflow</h3>
            <div className="flex items-center gap-2 text-xs font-bold">
              <span>Filter Status:</span>
              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="bg-vedic-ivory border border-vedic-gold/30 rounded-xl px-3 py-1.5 text-xs text-vedic-dark"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-vedic-beige text-vedic-muted font-serif">
                  <th className="py-2.5 font-bold">Order ID</th>
                  <th className="py-2.5 font-bold">Customer</th>
                  <th className="py-2.5 font-bold">Item Purchased</th>
                  <th className="py-2.5 font-bold">Total</th>
                  <th className="py-2.5 font-bold">Payment</th>
                  <th className="py-2.5 font-bold">Status</th>
                  <th className="py-2.5 font-bold">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-vedic-beige">
                {orders.map((ord) => (
                  <tr key={ord.id}>
                    <td className="py-3 font-mono font-bold text-vedic-maroon">{ord.id}</td>
                    <td className="py-3 font-semibold">{ord.customerName}</td>
                    <td className="py-3 text-stone-700 max-w-xs truncate">{ord.items}</td>
                    <td className="py-3 font-bold text-emerald-700">₹{ord.total.toLocaleString()}</td>
                    <td className="py-3 text-[10px] font-bold text-blue-700">{ord.paymentStatus}</td>
                    <td className="py-3">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        ord.status === 'Shipped' ? 'bg-indigo-100 text-indigo-800' :
                        ord.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <select
                        value={ord.status}
                        onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                        className="bg-vedic-ivory border border-vedic-gold/30 rounded-lg px-2 py-1 text-[11px] font-bold text-vedic-maroon"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';

export default function Orders() {
  const orders = [
    {
      id: 'ORD001',
      date: '2025-05-20',
      status: 'Delivered',
      total: 2500,
      items: [
        { name: 'Battery A', qty: 2 },
        { name: 'Battery C', qty: 1 },
      ],
    },
    {
      id: 'ORD002',
      date: '2025-05-18',
      status: 'Processing',
      total: 1800,
      items: [
        { name: 'Battery B', qty: 1 },
        { name: 'Battery D', qty: 3 },
      ],
    },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-tr from-green-400 to-blue-600 text-gray-900 p-8"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1470&q=80')" }}
    >
      <div className="max-w-5xl mx-auto bg-white bg-opacity-90 rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-extrabold mb-8 text-center">Your Orders</h1>
        {orders.length === 0 ? (
          <p className="text-center text-xl">No orders placed yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map(({ id, date, status, total, items }) => (
              <div key={id} className="border border-gray-300 rounded p-4 shadow-sm bg-white">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Order ID: {id}</span>
                  <span className={`font-semibold ${
                    status === 'Delivered' ? 'text-green-600' :
                    status === 'Processing' ? 'text-yellow-600' :
                    'text-gray-600'
                  }`}>
                    {status}
                  </span>
                </div>
                <div className="mb-2 text-sm text-gray-700">Date: {date}</div>
                <div className="mb-4">
                  <ul className="list-disc list-inside">
                    {items.map(({ name, qty }, idx) => (
                      <li key={idx}>{name} x {qty}</li>
                    ))}
                  </ul>
                </div>
                <div className="font-bold text-right text-lg">Total: ₹{total}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

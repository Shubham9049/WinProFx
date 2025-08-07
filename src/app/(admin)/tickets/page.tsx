"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [activeTicket, setActiveTicket] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetchTickets();
  }, [currentPage]);

  const updateStatus = async (status: string) => {
    if (!activeTicket) return;

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/tickets/${activeTicket._id}/status`,
        { status }
      );

      // Refresh ticket in modal
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/tickets/one/${activeTicket._id}`
      );
      setMessages(res.data.messages);
      setActiveTicket({ ...activeTicket, status });

      // Refresh ticket list
      fetchTickets();
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  const fetchTickets = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/tickets/admin`
      );
      const allTickets = res.data;
      const paginated = allTickets.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
      setTickets(paginated);
    } catch (err) {
      console.error("Error fetching tickets", err);
    }
  };

  const openModal = async (ticket: any) => {
    setActiveTicket(ticket);
    setShowModal(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/tickets/one/${ticket._id}`
      );
      setMessages(res.data.messages);
    } catch (err) {
      alert("Failed to fetch messages.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setActiveTicket(null);
    setMessages([]);
    setNewMessage("");
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeTicket) return;

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/tickets/${activeTicket._id}/messages`,
        {
          senderType: "Admin",
          message: newMessage,
        }
      );
      setNewMessage("");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/tickets/one/${activeTicket._id}`
      );
      setMessages(res.data.messages);
    } catch (err) {
      alert("Failed to send message.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Tickets</h2>
      {tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {tickets.map((ticket: any) => (
            <div
              key={ticket._id}
              onClick={() => openModal(ticket)}
              className="p-4 border rounded cursor-pointer  transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium">{ticket.subject}</p>
                  <p className="text-sm text-gray-500">
                    {ticket.user?.fullName}
                  </p>
                </div>
                <span
                  className={`text-sm px-2 py-1 rounded ${
                    ticket.status === "Open"
                      ? "bg-red-100 text-red-500"
                      : ticket.status === "Pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {ticket.status || "open"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Messages */}
      {showModal && activeTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-black text-whtie border w-full max-w-2xl p-6 rounded relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-4 text-2xl font-bold"
            >
              &times;
            </button>
            <div className="flex justify-between items-start mb-4 mt-4">
              <div>
                <h2 className="text-xl mb-1">
                  Category: {activeTicket.category}
                </h2>
                <h2 className="text-lg mb-1">{activeTicket.subject}</h2>
                <h3 className="text-md text-gray-600">
                  User: {activeTicket.user?.fullName}
                </h3>
              </div>
              <div className="ml-4 text-right">
                <label className="block text-sm font-medium mb-1 text-white">
                  Update Status:
                </label>
                <select
                  value={activeTicket.status}
                  onChange={(e) => updateStatus(e.target.value)}
                  className="border border-gray-300 rounded p-2 bg-black text-white"
                >
                  <option value="Open">Open</option>
                  <option value="Pending">Pending</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            <hr className="mb-4" />

            <div className="h-[300px] overflow-y-auto no-scrollbar">
              {messages.map((msg: any) => (
                <div
                  key={msg._id}
                  className={`${
                    msg.senderType === "Admin" ? "text-left" : "text-right"
                  }`}
                >
                  <div className="text-xs text-gray-400">
                    {msg.senderType === "Admin"
                      ? "BillionDollarFX"
                      : activeTicket.user?.fullName || "User"}
                    <br />
                    {new Date(msg.createdAt).toLocaleString()}
                  </div>
                  <div
                    className={`inline-block py-2 rounded ${
                      msg.senderType === "Admin" ? " text-white" : " text-white"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded p-2"
              />
              <button
                onClick={sendMessage}
                className="bg-[var(--primary)] text-white px-4 py-2 rounded"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

interface Reply {
  message: string;
  sender: string;
  createdAt: string;
}

interface Ticket {
  _id: string;
  category: string;
  message: string;
  description: string;
  status: string;
  replies: Reply[];
}

export default function Support() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newTicket, setNewTicket] = useState({ category: "", message: "" });
  const [replyMessage, setReplyMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Load token and fetch tickets
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchTickets(storedToken);
    }
  }, []);

  const fetchTickets = async (authToken: string) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/tickets`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const data = res.data?.tickets || res.data;
      setTickets(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTicket = async () => {
    if (!newTicket.category || !newTicket.message || !token) return;

    const payload = {
      category: newTicket.category,
      subject: "Support Ticket", // Provide actual subject if needed
      description: newTicket.message,
    };

    try {
      const res = await axios.post(`${API_BASE_URL}/api/tickets`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTickets((prev) => [...prev, res.data]);
      setNewTicket({ category: "", message: "" });
    } catch (err) {
      console.error("Ticket creation failed:", err);
    }
  };

  const handleReply = async (ticketId: string) => {
    if (!replyMessage.trim() || !token) return;

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/tickets/${ticketId}/reply`, // changed to POST
        { message: replyMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Optional: you might want to re-fetch the updated ticket here if your backend returns it
      setSelectedTicket(res.data);
      setTickets((prev) =>
        prev.map((t) => (t._id === res.data._id ? res.data : t))
      );
      setReplyMessage("");
    } catch (err) {
      console.error("Reply failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-raleway">
      <h1 className="text-2xl font-bold mb-6">Support Tickets</h1>

      {/* CREATE TICKET */}
      <div className="bg-[#121a2a] p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-3">Create Ticket</h2>
        <select
          value={newTicket.category}
          onChange={(e) =>
            setNewTicket({ ...newTicket, category: e.target.value })
          }
          className="w-full bg-black border border-gray-700 p-2 rounded mb-3"
        >
          <option value="">Select Category</option>
          <option value="Deposit/Withdrawal">Deposit/Withdrawal</option>
          <option value="Account-verification">Account-verification</option>
          <option value="MT5 Support">MT5 Support</option>
          <option value="IB Commission">IB Commission</option>
          <option value="Bonous&Other Promotion">Bonous&Other Promotion</option>
          <option value="Others">Others</option>
        </select>
        <textarea
          placeholder="Describe your issue..."
          value={newTicket.message}
          onChange={(e) =>
            setNewTicket({ ...newTicket, message: e.target.value })
          }
          className="w-full bg-black border border-gray-700 p-2 rounded mb-3 h-24"
        ></textarea>
        <button
          onClick={handleCreateTicket}
          className="bg-[var(--primary)] px-4 py-2 rounded text-white cursor-pointer"
        >
          Submit Ticket
        </button>
      </div>

      {/* TICKET LIST */}
      <div className="bg-[#121a2a] p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-3">My Tickets</h2>
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : tickets.length === 0 ? (
          <p className="text-gray-400">No tickets found.</p>
        ) : (
          <ul className="space-y-3">
            {tickets.map((ticket) => (
              <li
                key={ticket._id}
                className="p-3 border border-gray-700 rounded cursor-pointer hover:bg-[#1c253a]"
                onClick={() => setSelectedTicket(ticket)}
              >
                <div className="flex justify-between">
                  <span className="font-semibold">{ticket.category}</span>
                  <span className="text-sm text-gray-400">
                    {ticket.status || "open"}
                  </span>
                </div>
                <p className="text-sm text-gray-300">
                  {(ticket.message || ticket.description || "").slice(0, 50)}...
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* TICKET DETAIL VIEW */}
      {selectedTicket && (
        <div className="bg-[#121a2a] p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Ticket Detail</h2>
          <p>
            <strong>Category:</strong> {selectedTicket.category}
          </p>
          <p>
            <strong>Status:</strong> {selectedTicket.status || "open"}
          </p>
          <p className="mt-2 text-sm text-gray-300">
            {selectedTicket.message || selectedTicket.description}
          </p>

          <div className="mt-4 space-y-2">
            <h3 className="font-semibold">Replies</h3>
            {(selectedTicket.replies || []).map((r, i) => (
              <div
                key={i}
                className={`p-2 rounded-md text-sm max-w-lg ${
                  r.sender === "admin"
                    ? "bg-green-800 ml-auto text-right"
                    : "bg-gray-800"
                }`}
              >
                <p>{r.message}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(r.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <textarea
              placeholder="Write a reply..."
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              className="w-full bg-black border border-gray-700 p-2 rounded mb-2 h-20"
            ></textarea>
            <button
              onClick={() => handleReply(selectedTicket._id)}
              className="bg-blue-600 px-4 py-2 rounded text-white"
            >
              Send Reply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

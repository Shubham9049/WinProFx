"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";

interface User {
  fullName: string;
}

interface Message {
  _id: string;
  senderType: "Admin" | "User";
  message: string;
  createdAt: string;
}

interface Ticket {
  _id: string;
  subject: string;
  category: string;
  status: "Open" | "Pending" | "Closed";
  user?: User;
  unreadByAdmin?: number;
}

export default function AdminTicketsPage() {
  const [allTickets, setAllTickets] = useState<Ticket[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const totalPages = Math.ceil(allTickets.length / itemsPerPage);

  const fetchTickets = useCallback(async () => {
    try {
      const res = await axios.get<Ticket[]>(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/tickets/admin`
      );
      setAllTickets(res.data);
    } catch {
      console.error("Error fetching tickets");
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    setTickets(allTickets.slice(start, end));
  }, [currentPage, allTickets]);

  const updateStatus = async (status: Ticket["status"]) => {
    if (!activeTicket) return;

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/tickets/${activeTicket._id}/status`,
        { status }
      );

      const res = await axios.get<{ messages: Message[] }>(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/tickets/one/${activeTicket._id}`
      );

      setMessages(res.data.messages);
      setActiveTicket({ ...activeTicket, status });
      fetchTickets();
    } catch {
      alert("Failed to update status.");
    }
  };

  const openModal = async (ticket: Ticket) => {
    setActiveTicket(ticket);
    setShowModal(true);
    try {
      const res = await axios.get<{ messages: Message[] }>(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/tickets/one/${ticket._id}?viewer=Admin`
      );
      setMessages(res.data.messages);

      // 🔹 Reset unread count locally (backend already resets it)
      setAllTickets((prev) =>
        prev.map((t) => (t._id === ticket._id ? { ...t, unreadByAdmin: 0 } : t))
      );
    } catch {
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

      const res = await axios.get<{ messages: Message[] }>(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/tickets/one/${activeTicket._id}?viewer=Admin`
      );
      setMessages(res.data.messages);
    } catch {
      alert("Failed to send message.");
    }
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (currentPage <= half) {
      end = Math.min(totalPages, maxVisible);
    } else if (currentPage + half >= totalPages) {
      start = Math.max(1, totalPages - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-1 border rounded ${
            i === currentPage ? "bg-[var(--primary)] text-white" : ""
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex items-center gap-2 mt-6 justify-center">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        {pages}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Tickets</h2>
      {tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                onClick={() => openModal(ticket)}
                className="p-4 border rounded cursor-pointer transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-medium">
                      {ticket.subject}{" "}
                      {Number(ticket.unreadByAdmin) > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                          {ticket.unreadByAdmin}
                        </span>
                      )}
                    </p>

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

          {renderPagination()}
        </>
      )}

      {showModal && activeTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-black text-white border w-full max-w-2xl p-6 rounded relative">
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
                <h3 className="text-md text-gray-400">
                  User: {activeTicket.user?.fullName}
                </h3>
              </div>
              <div className="ml-4 text-right">
                <label className="block text-sm font-medium mb-1 text-white">
                  Update Status:
                </label>
                <select
                  value={activeTicket.status}
                  onChange={(e) =>
                    updateStatus(e.target.value as Ticket["status"])
                  }
                  className="border border-gray-300 rounded p-2 bg-black text-white"
                >
                  <option value="Open">Open</option>
                  <option value="Pending">Pending</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            <hr className="mb-4" />

            <div className="h-[300px] overflow-y-auto no-scrollbar space-y-3">
              {messages.map((msg) => (
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
                  <div className="inline-block py-2 text-white">
                    {msg.message}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex items-center gap-2 mt-4">
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

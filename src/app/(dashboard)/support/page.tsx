"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Ticket {
  _id: string;
  category: string;
  subject: string;
  description: string;
  status: string;
  createdAt: string;
}

interface Message {
  _id: string;
  senderType: "User" | "Admin";
  message: string;
  createdAt: string;
}

export default function Support() {
  const [email, setEmail] = useState("");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [newTicket, setNewTicket] = useState({
    category: "",
    subject: "",
    description: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 5;

  const [showModal, setShowModal] = useState(false);
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const storedEmail = JSON.parse(localStorage.getItem("user") || "{}").email;
    if (!storedEmail) {
      alert("User email not found.");
      return;
    }
    setEmail(storedEmail);
  }, []);

  useEffect(() => {
    if (!email) return;
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE}/api/tickets/${email}`)
      .then((res) => {
        // Sort tickets by latest
        const sorted = res.data.sort(
          (a: Ticket, b: Ticket) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setTickets(sorted);
      })
      .catch((err) => console.error("Error fetching tickets:", err));
  }, [email]);

  const handleCreateTicket = () => {
    const { category, subject, description } = newTicket;
    if (!category || !subject || !description) {
      alert("Please fill in all fields.");
      return;
    }

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/tickets/${email}`,
        newTicket
      )
      .then((res) => {
        setTickets((prev) => [res.data, ...prev]);
        setNewTicket({ category: "", subject: "", description: "" });
        setCurrentPage(1);
      })
      .catch((err) =>
        alert("Error creating ticket: " + err.response?.data?.message || err)
      );
  };

  const openTicketModal = (ticket: Ticket) => {
    setActiveTicket(ticket);
    fetchMessages(ticket._id);
    setShowModal(true);
  };

  const fetchMessages = (ticketId: string) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE}/api/tickets/one/${ticketId}`)
      .then((res) => {
        setMessages(res.data.messages);
      })
      .catch((err) => {
        alert("Failed to fetch messages.");
        console.error(err);
      });
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !activeTicket) return;

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/tickets/${activeTicket._id}/messages`,
        {
          senderType: "User",

          message: newMessage,
        }
      )
      .then(() => {
        setNewMessage("");
        fetchMessages(activeTicket._id);
      })
      .catch((err) => {
        alert("Failed to send message.");
        console.error(err);
      });
  };

  const closeModal = () => {
    setShowModal(false);
    setActiveTicket(null);
    setMessages([]);
    setNewMessage("");
  };

  // Pagination
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);
  const totalPages = Math.ceil(tickets.length / ticketsPerPage);

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
          <option value="Bonous&Other Promotion">
            Bonous & Other Promotion
          </option>
          <option value="Others">Others</option>
        </select>
        <input
          type="text"
          placeholder="Subject"
          value={newTicket.subject}
          onChange={(e) =>
            setNewTicket({ ...newTicket, subject: e.target.value })
          }
          className="w-full bg-black border border-gray-700 p-2 rounded mb-3"
        />
        <textarea
          placeholder="Describe your issue..."
          value={newTicket.description}
          onChange={(e) =>
            setNewTicket({ ...newTicket, description: e.target.value })
          }
          className="w-full bg-black border border-gray-700 p-2 rounded mb-3 h-24"
        ></textarea>
        <button
          onClick={handleCreateTicket}
          className="bg-[var(--primary)] px-4 py-2 rounded text-white"
        >
          Submit Ticket
        </button>
      </div>

      {/* TICKET LIST */}
      <div className="bg-[#121a2a] p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-3">My Tickets</h2>
        {currentTickets.length === 0 ? (
          <p className="text-gray-400">No tickets found.</p>
        ) : (
          <ul className="space-y-3">
            {currentTickets.map((ticket) => (
              <li
                key={ticket._id}
                onClick={() => openTicketModal(ticket)}
                className="p-3 border border-gray-700 rounded cursor-pointer hover:bg-[#1c253a]"
              >
                <div className="flex justify-between">
                  <span className="font-semibold">{ticket.category}</span>
                  <span
                    className={`text-sm ${
                      ticket.status === "Open"
                        ? "text-red-500"
                        : ticket.status === "Pending"
                        ? "text-yellow-500"
                        : ticket.status === "Closed"
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  >
                    {ticket.status || "open"}
                  </span>
                </div>
                <p className="text-sm text-gray-300">{ticket.subject}</p>
                <p className="text-xs text-gray-500">
                  Created: {new Date(ticket.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-[var(--primary)] text-white"
                  : "bg-gray-700 text-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* MODAL FOR TICKET MESSAGES */}
      {showModal && activeTicket && (
        <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50">
          <div className="bg-[#1a1a2c] rounded-lg w-full max-w-2xl p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-gray-400 hover:text-white text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">
              Category: {activeTicket.category}
            </h2>
            <h2 className="text-lg  mb-4">Ticket: {activeTicket.subject}</h2>
            <hr />
            <div className="max-h-[400px] overflow-y-auto space-y-3 mb-4">
              {messages.length === 0 ? (
                <p className="text-gray-400">No messages yet.</p>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`p-3  ${
                      msg.senderType === "Admin" ? " text-right " : "text-left"
                    }`}
                  >
                    <div className="text-xs text-gray-400 mb-1">
                      {msg.senderType === "User" ? "You" : "BillionDollarFX"}{" "}
                      <br />
                      <span className="text-xs text-gray-500">
                        {new Date(msg.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <p>{msg.message}</p>
                  </div>
                ))
              )}
            </div>

            {/* Message Input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-black border border-gray-600 rounded p-2 text-white"
              />
              <button
                onClick={sendMessage}
                className="bg-[var(--primary)] px-4 py-2 rounded text-white"
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

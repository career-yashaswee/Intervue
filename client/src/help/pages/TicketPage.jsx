import React, { useState, useEffect } from "react";
import axios from "axios";
import EditTicketForm from "../components/EditTicketForm";
import { useParams } from "react-router-dom";
const getTicketById = async (id) => {
  try {
    const res = await axios.get(`http://localhost:8080/ticket/${id}`);

    return res.data;
  } catch (error) {
    console.error("Error fetching ticket:", error);
    throw error;
  }
};

const TicketPage = () => {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace 'sample-id' with the actual ticket ID you want to fetch
  const { id } = useParams(); // Get ticketId from URL parameters
  const ticketId = id;
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const data = await getTicketById(ticketId);
        setTicket(data.foundTicket);
      } catch (error) {
        setError("Error loading ticket");
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return <EditTicketForm ticket={ticket} />;
};

export default TicketPage;

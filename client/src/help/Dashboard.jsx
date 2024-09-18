import React, { useState, useEffect } from "react";
import TicketCard from "./components/TicketCard";

const getTickets = async () => {
  try {
    const res = await fetch("http://localhost:8080/ticket", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch tickets");
    }
    return res.json();
  } catch (error) {
    console.error("Error loading tickets: ", error);
    throw error;
  }
};

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getTickets();
        setTickets(data?.tickets || []);
      } catch (error) {
        setError("Error loading tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const uniqueCategories = [
    ...new Set(tickets.map(({ category }) => category)),
  ];

  return (
    <div className="p-5">
      <div>
        {uniqueCategories.length === 0 ? (
          <p>No tickets.</p>
        ) : (
          uniqueCategories.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h2>{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket, _index) => (
                    <TicketCard
                      id={_index}
                      key={_index}
                      ticket={filteredTicket}
                    />
                  ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;

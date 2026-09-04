import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTickets } from '../hooks/useTickets';
import { useNavigate } from 'react-router-dom';
import type { Ticket } from '../api/tickets';  

export const Tickets: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { tickets, loading, error, refetch } = useTickets();
   
  console.log(tickets);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error} <button onClick={refetch}>Retry</button></div>;
  if (!tickets.length) return <div>No tickets found</div>;

  return (
    <div>
      <div>
        <h1>Tickets</h1>
        {user && <p>Welcome, {user.name}!</p>}
        <button onClick={refetch}>Refresh</button>
        <button onClick={async () => { await logout(); navigate('/login'); }}>Logout</button>
      </div>
      
      {tickets.map((ticket: Ticket) => (  
        <div key={ticket.id}>
          <h3>#{ticket.id} {ticket.title || ticket.service || 'Без названия'}</h3>
          <p>{ticket.description || 'Нет описания'}</p>
          {ticket.status && <span>{ticket.status.replace('_', ' ')}</span>}
          {ticket.priority && <span>{ticket.priority}</span>}
          <p>Created: {ticket.created_at ? new Date(ticket.created_at).toLocaleDateString() : ticket.date || 'N/A'}</p>
          {ticket.phone && <p>Phone: {ticket.phone}</p>}
          <hr />
        </div>
      ))}
    </div>
  );
};
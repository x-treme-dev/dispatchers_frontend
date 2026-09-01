import React, { useState } from 'react';
import { useAuth} from '../contexts/AuthContext';
import { useTickets } from '../hooks/useTickets';

export const Tickets: React.FC = () => {
  const { user, logout } = useAuth();
  const [statusFilter, setStatusFilter] = useState('all');
  const { tickets, loading, error, refetch } = useTickets({
    status: statusFilter === 'all' ? undefined : statusFilter
  });

  return (
    <div>
      <div>
        <div>
          <h1>Tickets</h1>
          {user && <p>Welcome, {user.name}!</p>}
        </div>
        <div>
          <button onClick={refetch}>Refresh</button>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <div>
        <span>Filter:</span>
        {['all', 'open', 'in_progress', 'closed'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
          >
            {status === 'all' ? 'All' : status.replace('_', ' ')}
          </button>
        ))}
      </div>

      {loading && <p>Loading...</p>}
      
      {error && (
        <div>
          <p>Error: {error}</p>
        </div>
      )}

      {!loading && !error && tickets.length === 0 && (
        <p>No tickets found</p>
      )}

      {!loading && !error && tickets.length > 0 && (
        <div>
          {tickets.map((ticket) => (
            <div key={ticket.id}>
              <div>
                <div>
                  <h3>{ticket.title}</h3>
                  <p>{ticket.description}</p>
                </div>
                <div>
                  <div>
                    <span>{ticket.status.replace('_', ' ')}</span>
                  </div>
                  <div>
                    <span>{ticket.priority}</span>
                  </div>
                </div>
              </div>
              <div>
                <span>Created: {new Date(ticket.created_at).toLocaleDateString()}</span>
              </div>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
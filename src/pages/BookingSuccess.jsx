import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Home, Download } from 'lucide-react';

const BookingSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const booking = location.state?.booking;

    if (!booking) {
        return (
            <div className="success-container">
                <div className="success-card">
                    <h2>No Booking Found</h2>
                    <p className="subtitle">It seems you haven't booked any tickets yet.</p>
                    <button onClick={() => navigate('/')} className="btn btn-primary">
                        <Home size={18} /> Go Home
                    </button>
                </div>
                <style>{`
                    .success-container {
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 2rem;
                        background: radial-gradient(circle at center, #1a1d29 0%, #0f111a 100%);
                    }
                    .success-card {
                        background: var(--bg-secondary);
                        border: 1px solid var(--glass-border);
                        border-radius: 24px;
                        padding: 3rem;
                        text-align: center;
                        color: white;
                    }
                    .btn-primary {
                        background: var(--accent-red);
                        color: white;
                        border: none;
                        padding: 0.75rem 1.5rem;
                        border-radius: 8px;
                        cursor: pointer;
                        display: inline-flex;
                        align-items: center;
                        gap: 0.5rem;
                        margin-top: 1rem;
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div className="success-container">
            <div className="success-card">
                <div className="icon-wrapper">
                    <CheckCircle size={64} color="var(--accent-red)" />
                </div>
                <h1>Booking Confirmed!</h1>
                <p className="subtitle">Your ticket has been sent to your email.</p>

                <div className="ticket-details">
                    <div className="movie-info">
                        <img src={booking.image} alt={booking.movie} className="poster-thumb" />
                        <div>
                            <h3>{booking.movie}</h3>
                            <p>{booking.theater}</p>
                            <p className="meta">{booking.date} | {booking.time}</p>
                        </div>
                    </div>

                    <div className="divider"></div>

                    <div className="seat-info">
                        <div className="row">
                            <span>Seats</span>
                            <span className="value">{booking.seats.join(', ')}</span>
                        </div>
                        <div className="row">
                            <span>Booking ID</span>
                            <span className="value">#{booking.id.toString().slice(-6)}</span>
                        </div>
                        <div className="row total">
                            <span>Total Amount</span>
                            <span className="value">₹{booking.total}</span>
                        </div>
                    </div>
                </div>

                <div className="actions">
                    <button className="btn btn-secondary" onClick={() => alert("Downloading ticket...")}>
                        <Download size={18} /> Download Ticket
                    </button>
                    <button onClick={() => navigate('/')} className="btn btn-primary">
                        <Home size={18} /> Back to Home
                    </button>
                </div>
            </div>

            <style>{`
                .success-container {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    background: radial-gradient(circle at center, #1a1d29 0%, #0f111a 100%);
                }
                .success-card {
                    background: var(--bg-secondary);
                    border: 1px solid var(--glass-border);
                    border-radius: 24px;
                    padding: 3rem;
                    max-width: 500px;
                    width: 100%;
                    text-align: center;
                    box-shadow: 0 0 40px rgba(248, 68, 100, 0.1);
                    animation: slideUp 0.5s ease-out;
                }
                .icon-wrapper {
                    margin-bottom: 1.5rem;
                    animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                h1 {
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                    background: linear-gradient(to right, white, #cbd5e1);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .subtitle {
                    color: var(--text-secondary);
                    margin-bottom: 2.5rem;
                }
                .ticket-details {
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: 16px;
                    padding: 1.5rem;
                    margin-bottom: 2rem;
                    text-align: left;
                }
                .movie-info {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }
                .poster-thumb {
                    width: 60px;
                    height: 80px;
                    object-fit: cover;
                    border-radius: 8px;
                }
                .movie-info h3 {
                    margin: 0 0 0.25rem 0;
                    font-size: 1.1rem;
                    color: white;
                }
                .movie-info p {
                    margin: 0;
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                }
                .divider {
                    height: 1px;
                    background: var(--glass-border);
                    margin: 1rem 0;
                    border-bottom: 1px dashed var(--glass-border);
                }
                .row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.75rem;
                    font-size: 0.95rem;
                }
                .row span:first-child { color: var(--text-secondary); }
                .row span:last-child { font-weight: 500; color: white; }
                .row.total {
                    margin-top: 1rem;
                    padding-top: 1rem;
                    border-top: 1px solid var(--glass-border);
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: var(--accent-red) !important;
                }
                .row.total span:last-child { color: var(--accent-red); }
                .actions {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                }
                .btn {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1.5rem;
                    border-radius: 12px;
                    border: none;
                    font-weight: 600;
                    cursor: pointer;
                    transition: transform 0.2s;
                }
                .btn:active { transform: scale(0.98); }
                .btn-primary {
                    background: var(--accent-red);
                    color: white;
                    box-shadow: 0 4px 15px rgba(248, 68, 100, 0.3);
                }
                .btn-secondary {
                    background: transparent;
                    border: 1px solid var(--glass-border);
                    color: white;
                }
                .btn-secondary:hover {
                    background: rgba(255, 255, 255, 0.05);
                }
                @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                @keyframes scaleIn { from { transform: scale(0); } to { transform: scale(1); } }
            `}</style>
        </div>
    );
};

export default BookingSuccess;

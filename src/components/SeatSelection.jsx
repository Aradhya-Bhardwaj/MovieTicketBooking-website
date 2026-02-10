import React, { useState } from 'react';
import { ArrowLeft, Calendar, Star, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SEAT_PRICE = 250;
const ROWS = 8;
const COLS = 12;

const SeatSelection = ({ movie, city, onBack }) => {
    const navigate = useNavigate();
    const [selectedSeats, setSelectedSeats] = useState([]);

    // Selection States
    const [selectedDate, setSelectedDate] = useState(0); // Index of DATES array
    const [selectedTheater, setSelectedTheater] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    // Mock Data Generators
    const DATES = Array.from({ length: 5 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return {
            day: d.toLocaleDateString('en-US', { weekday: 'short' }),
            date: d.getDate(),
            fullDate: d.toLocaleDateString()
        };
    });

    const THEATERS = [
        { id: 1, name: `PVR ${city} Mall`, timings: ["10:00 AM", "01:00 PM", "04:00 PM", "07:00 PM", "10:00 PM"] },
        { id: 2, name: `INOX ${city} City`, timings: ["11:00 AM", "02:00 PM", "05:00 PM", "08:00 PM", "11:00 PM"] },
        { id: 3, name: `Cinepolis ${city} Square`, timings: ["09:00 AM", "12:00 PM", "03:00 PM", "06:00 PM", "09:00 PM"] },
    ];

    // Generate simple seat map (0: gap, 1: available, 2: occupied)
    const [seatMap] = useState(() => {
        const map = [];
        for (let i = 0; i < ROWS; i++) {
            const row = [];
            for (let j = 0; j < COLS; j++) {
                // Randomly mark some as occupied or gaps
                if (j === 5 || j === 6) row.push(0); // Aisle
                else if (Math.random() < 0.15) row.push(2); // Occupied
                else row.push(1); // Available
            }
            map.push(row);
        }
        return map;
    });

    const toggleSeat = (rowIndex, colIndex) => {
        const seatId = `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`;
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(id => id !== seatId));
        } else {
            if (selectedSeats.length >= 8) {
                alert("You can only select up to 8 seats");
                return;
            }
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    const handleBook = () => {
        if (!selectedTime || !selectedTheater) {
            alert("Please select a theater and time!");
            return;
        }

        const booking = {
            id: Date.now(),
            movie: movie.title,
            image: movie.image,
            seats: selectedSeats,
            total: selectedSeats.length * SEAT_PRICE,
            date: DATES[selectedDate].fullDate,
            time: selectedTime,
            theater: selectedTheater.name,
            city: city
        };

        const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        localStorage.setItem('bookings', JSON.stringify([booking, ...existingBookings]));

        navigate('/booking-success', { state: { booking } });
    };

    return (
        <div className="seat-selection-container">
            <button onClick={onBack} className="back-btn">
                <ArrowLeft size={20} /> Back to Movies
            </button>

            <div className="movie-header">
                <div className="movie-poster">
                    <img src={movie.image} alt={movie.title} />
                </div>
                <div className="movie-details">
                    <h1>{movie.title}</h1>
                    <div className="tags">
                        <span className="tag">{movie.year}</span>
                        <span className="tag">{movie.genre}</span>
                        <span className="rating-tag">
                            <Star size={14} fill="#f84464" color="#f84464" />
                            {movie.rating}/10
                        </span>
                    </div>
                    <p className="description">{movie.description}</p>
                </div>
            </div>

            {/* Date Selection */}
            <div className="selection-section">
                <h3>Select Date</h3>
                <div className="date-scroll">
                    {DATES.map((d, idx) => (
                        <button
                            key={idx}
                            className={`date-card ${selectedDate === idx ? 'active' : ''}`}
                            onClick={() => setSelectedDate(idx)}
                        >
                            <span className="day">{d.day}</span>
                            <span className="date">{d.date}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Theater & Time Selection */}
            <div className="selection-section">
                <h3>Select Theater & Time</h3>
                <div className="theater-list">
                    {THEATERS.map(theater => (
                        <div key={theater.id} className="theater-row">
                            <div className="theater-name">
                                <span className={`heart-icon ${selectedTheater?.id === theater.id ? 'active' : ''}`}>❤️</span>
                                {theater.name}
                            </div>
                            <div className="time-grid">
                                {theater.timings.map(time => (
                                    <button
                                        key={time}
                                        className={`time-chip ${selectedTime === time && selectedTheater?.id === theater.id ? 'active' : ''}`}
                                        onClick={() => {
                                            setSelectedTheater(theater);
                                            setSelectedTime(time);
                                        }}
                                    >
                                        {time}
                                        <div className="price-hover">₹{SEAT_PRICE}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="theatre-screen">
                <div className="screen">SCREEN THIS WAY</div>

                <div className="seats-grid">
                    {seatMap.map((row, rowIndex) => (
                        <div key={rowIndex} className="seat-row">
                            <span className="row-label">{String.fromCharCode(65 + rowIndex)}</span>
                            {row.map((status, colIndex) => {
                                if (status === 0) return <div key={colIndex} className="seat-gap" />;

                                const seatId = `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`;
                                const isSelected = selectedSeats.includes(seatId);
                                const isOccupied = status === 2;

                                return (
                                    <button
                                        key={colIndex}
                                        className={`seat ${isOccupied ? 'occupied' : ''} ${isSelected ? 'selected' : ''}`}
                                        onClick={() => !isOccupied && toggleSeat(rowIndex, colIndex)}
                                        disabled={isOccupied}
                                    >
                                        {colIndex + 1}
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </div>

                <div className="legend">
                    <div className="legend-item">
                        <div className="seat-box available"></div>
                        <span>Available</span>
                    </div>
                    <div className="legend-item">
                        <div className="seat-box selected"></div>
                        <span>Selected</span>
                    </div>
                    <div className="legend-item">
                        <div className="seat-box occupied"></div>
                        <span>Sold</span>
                    </div>
                </div>
            </div>

            {selectedSeats.length > 0 && (
                <div className="booking-summary">
                    <div className="summary-content">
                        <div>
                            <span className="label">
                                {selectedTheater ? `${selectedTheater.name} | ${selectedTime}` : 'Select Show'}
                            </span>
                            <div className="value">{selectedSeats.length} Seats <span style={{ fontSize: '0.8rem', fontWeight: 400 }}>({selectedSeats.join(', ')})</span></div>
                        </div>
                        <div>
                            <span className="label">Total Price</span>
                            <div className="value">₹{selectedSeats.length * SEAT_PRICE}</div>
                        </div>
                        <button
                            onClick={handleBook}
                            className="btn btn-primary pay-btn"
                            disabled={!selectedTime || !selectedTheater}
                        >
                            Book Tickets
                        </button>
                    </div>
                </div>
            )}

            <style>{`
                .seat-selection-container {
                    animation: fadeIn 0.3s ease-out;
                }

                .back-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--text-secondary);
                    margin-bottom: 2rem;
                    padding: 0;
                }

                .back-btn:hover {
                    color: var(--text-primary);
                }

                .movie-header {
                    display: flex;
                    gap: 2rem;
                    margin-bottom: 3rem;
                    background: var(--bg-secondary);
                    padding: 2rem;
                    border-radius: var(--radius-lg);
                }

                .movie-poster {
                    width: 140px;
                    border-radius: var(--radius-md);
                    overflow: hidden;
                    box-shadow: var(--shadow-lg);
                }

                .movie-poster img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .movie-details h1 {
                    font-size: 2rem;
                    margin-bottom: 1rem;
                }

                .tags {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }

                .tag {
                    background: rgba(255, 255, 255, 0.1);
                    padding: 0.25rem 0.75rem;
                    border-radius: 4px;
                    font-size: 0.85rem;
                }

                .rating-tag {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    color: var(--text-primary);
                    font-weight: 600;
                }

                .description {
                    color: var(--text-secondary);
                    max-width: 600px;
                    line-height: 1.6;
                }

                .theatre-screen {
                    text-align: center;
                    max-width: 800px;
                    margin: 0 auto 100px;
                }

                .screen {
                    height: 40px;
                    background: linear-gradient(to bottom, var(--accent-blue), transparent);
                    opacity: 0.3;
                    transform: perspective(400px) rotateX(-10deg);
                    margin-bottom: 3rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-secondary);
                    font-size: 0.8rem;
                    letter-spacing: 2px;
                    box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
                }

                .seats-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    align-items: center;
                }

                .seat-row {
                    display: flex;
                    gap: 0.5rem;
                    align-items: center;
                }

                .row-label {
                    width: 24px;
                    color: var(--text-secondary);
                    font-size: 0.8rem;
                    margin-right: 1rem;
                }

                .seat-gap {
                    width: 20px;
                }

                .seat {
                    width: 32px;
                    height: 32px;
                    border-radius: 6px;
                    border: 1px solid var(--glass-border);
                    background-color: var(--bg-secondary);
                    color: var(--text-secondary);
                    font-size: 0.75rem;
                    transition: all 0.2s;
                }

                .seat:hover:not(:disabled) {
                    border-color: var(--accent-red);
                    color: var(--text-primary);
                    transform: scale(1.1);
                }

                .seat.selected {
                    background-color: var(--accent-red);
                    border-color: var(--accent-red);
                    color: white;
                }

                .seat.occupied {
                    background-color: #333;
                    border-color: #333;
                    color: #555;
                    cursor: not-allowed;
                }

                .legend {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    margin-top: 3rem;
                }

                .legend-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                }

                .seat-box {
                    width: 20px;
                    height: 20px;
                    border-radius: 4px;
                }

                .seat-box.available {
                    border: 1px solid var(--glass-border);
                    background-color: var(--bg-secondary);
                }

                .seat-box.selected {
                    background-color: var(--accent-red);
                }

                .seat-box.occupied {
                    background-color: #333;
                }

                .booking-summary {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    background: var(--bg-secondary);
                    border-top: 1px solid var(--glass-border);
                    padding: 1.5rem;
                    animation: slideUp 0.3s ease-out;
                    z-index: 200;
                }

                @keyframes slideUp {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }

                .summary-content {
                    max-width: 1280px;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content:space-between;
                    padding: 0 1rem;
                }

                .label {
                    display: block;
                    color: var(--text-secondary);
                    font-size: 0.85rem;
                    margin-bottom: 0.25rem;
                }

                .value {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: var(--text-primary);
                }

                .pay-btn {
                    padding: 0.75rem 3rem;
                    font-size: 1.1rem;
                }
                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.8);
                    backdrop-filter: blur(5px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    animation: fadeIn 0.3s ease;
                }

                .modal-content {
                    background: var(--bg-secondary);
                    border: 1px solid var(--glass-border);
                    padding: 2.5rem;
                    border-radius: var(--radius-lg);
                    text-align: center;
                    max-width: 400px;
                    width: 90%;
                    box-shadow: var(--shadow-neon);
                    animation: slideUp 0.3s ease;
                }

                .success-icon {
                    width: 80px;
                    height: 80px;
                    background: rgba(255, 51, 95, 0.1);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1.5rem;
                }

                .modal-content h2 {
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                    color: white;
                }

                .modal-content p {
                    color: var(--text-secondary);
                    margin-bottom: 2rem;
                    line-height: 1.6;
                }

                .ticket-info {
                    background: rgba(255, 255, 255, 0.03);
                    padding: 1rem;
                    border-radius: var(--radius-md);
                    margin-bottom: 2rem;
                }

                .info-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.5rem;
                    font-size: 0.9rem;
                }

                .info-row span:first-child {
                    color: var(--text-secondary);
                }

                .info-row span:last-child {
                    color: white;
                    font-weight: 600;
                }

                .full-width {
                    width: 100%;
                }

                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .selection-section {
                    margin-bottom: 2rem;
                }

                .selection-section h3 {
                    font-size: 1.1rem;
                    color: white;
                    margin-bottom: 1rem;
                    border-left: 3px solid var(--accent-red);
                    padding-left: 0.75rem;
                }

                .date-scroll {
                    display: flex;
                    gap: 1rem;
                    overflow-x: auto;
                    padding-bottom: 0.5rem;
                }

                .date-card {
                    background: var(--bg-secondary);
                    border: 1px solid var(--glass-border);
                    border-radius: var(--radius-md);
                    padding: 0.75rem 1.5rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    min-width: 80px;
                    transition: all 0.2s;
                }

                .date-card:hover {
                    border-color: var(--accent-red);
                }

                .date-card.active {
                    background: var(--accent-red);
                    border-color: var(--accent-red);
                    color: white;
                }

                .date-card .day {
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    opacity: 0.8;
                }

                .date-card .date {
                    font-size: 1.25rem;
                    font-weight: 700;
                }

                .theater-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .theater-row {
                    border-bottom: 1px solid var(--glass-border);
                    padding-bottom: 1.5rem;
                }

                .theater-name {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: white;
                    font-weight: 600;
                    margin-bottom: 1rem;
                }

                .heart-icon {
                    color: #444;
                    cursor: pointer;
                }

                .heart-icon.active {
                    color: var(--accent-red);
                }

                .time-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.75rem;
                }

                .time-chip {
                    position: relative;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid var(--glass-border);
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    color: var(--accent-blue); /* Greenish/Blue for available */
                    font-size: 0.85rem;
                    transition: all 0.2s;
                    overflow: hidden;
                }

                .time-chip:hover {
                    color: white;
                    border-color: var(--accent-blue);
                }

                .time-chip.active {
                    background: var(--accent-blue);
                    color: #000;
                    border-color: var(--accent-blue);
                    font-weight: 600;
                }

                .price-hover {
                    display: none;
                    position: absolute;
                    inset: 0;
                    background: var(--bg-secondary);
                    color: white;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                }

                .time-chip:hover .price-hover {
                    display: flex;
                }
            `}</style>
        </div>
    );
};

export default SeatSelection;

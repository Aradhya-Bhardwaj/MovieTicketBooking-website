import React, { useState } from 'react';
import { Star, Calendar } from 'lucide-react';

const MovieCard = ({ movie, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="movie-card-wrapper"
        >
            {/* Hover Highlight Background */}
            <div className={`hover-highlight ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

            <div className="card-content-relative">
                <div className="poster-container">
                    <img src={movie.image} alt={movie.title} loading="lazy" />
                    {/* Overlay Button */}
                    <div className={`poster-overlay ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                        <button className="book-now-btn">Book Ticket</button>
                    </div>
                </div>

                <div className="info-container">
                    <h3 className="movie-title">{movie.title}</h3>
                    <div className="movie-meta">
                        <span className="genre-badge">{movie.genre.split('/')[0]}</span>
                        <div className="flex items-center gap-3">
                            <span className="rating-flex">
                                <Star size={14} fill="#facc15" color="#facc15" />
                                {movie.rating}
                            </span>
                            <span className="year-flex">
                                <Calendar size={14} />
                                {movie.year}
                            </span>
                        </div>
                    </div>
                    <p className="description-snippet">{movie.description}</p>
                </div>
            </div>

            <style>{`
                .movie-card-wrapper {
                    position: relative;
                    padding: 1rem;
                    border-radius: var(--radius-lg);
                    cursor: pointer;
                    height: 100%;
                    background: transparent;
                    transition: transform 0.2s;
                    isolation: isolate;
                }

                .movie-card-wrapper:hover {
                    transform: translateY(-4px);
                }

                /* The "Card Hover Effect" Background */
                .hover-highlight {
                    position: absolute;
                    inset: 0;
                    background: var(--bg-secondary);
                    border-radius: var(--radius-lg);
                    z-index: -1;
                    transition: opacity 0.3s ease;
                    border: 1px solid var(--glass-border);
                    box-shadow: var(--shadow-lg);
                }

                .card-content-relative {
                    position: relative;
                    z-index: 10;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    height: 100%;
                }

                .poster-container {
                    aspect-ratio: 2/3;
                    border-radius: var(--radius-md);
                    overflow: hidden;
                    position: relative;
                    box-shadow: var(--shadow-md);
                }

                .poster-container img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .poster-overlay {
                    position: absolute;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: opacity 0.2s;
                }

                .book-now-btn {
                    background: var(--accent-red);
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 99px;
                    font-weight: 600;
                    transform: scale(1);
                    transition: transform 0.2s;
                }

                .book-now-btn:hover {
                    transform: scale(1.05);
                    background: var(--accent-red-hover);
                }

                .info-container {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                .movie-title {
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin-bottom: 0.5rem;
                    line-height: 1.4;
                }

                .movie-meta {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 0.75rem;
                    font-size: 0.9rem;
                    color: var(--text-secondary);
                }

                .genre-badge {
                    background: rgba(59, 130, 246, 0.15);
                    color: var(--accent-blue);
                    padding: 0.2rem 0.6rem;
                    border-radius: 6px;
                    font-size: 0.75rem;
                    font-weight: 600;
                }

                .rating-flex, .year-flex {
                    display: flex;
                    align-items: center;
                    gap: 0.3rem;
                }

                .description-snippet {
                    font-size: 0.85rem;
                    color: #64748b;
                    line-height: 1.5;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                /* Utility for conditional classes */
                .opacity-0 { opacity: 0; }
                .opacity-100 { opacity: 1; }
                .flex { display: flex; }
                .items-center { align-items: center; }
                .gap-3 { gap: 0.75rem; }
            `}</style>
        </div>
    );
};

export default MovieCard;

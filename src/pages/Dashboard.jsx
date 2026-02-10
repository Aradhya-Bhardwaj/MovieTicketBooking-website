import React, { useState } from 'react';
import { Star, Calendar, MapPin, Search, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import SeatSelection from '../components/SeatSelection';

// Expanded Mock Data
const MOVIES = [
    {
        id: 1,
        title: "Dune: Part Two",
        year: "2024",
        rating: 8.8,
        genre: "Sci-Fi/Adventure",
        image: "https://image.tmdb.org/t/p/original/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
        description: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family."
    },
    {
        id: 2,
        title: "Oppenheimer",
        year: "2023",
        rating: 8.6,
        genre: "Biography/Drama",
        image: "https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb."
    },
    {
        id: 3,
        title: "Spider-Man: Across the Spider-Verse",
        year: "2023",
        rating: 8.7,
        genre: "Animation/Action",
        image: "https://image.tmdb.org/t/p/original/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
        description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence."
    },
    {
        id: 4,
        title: "The Batman",
        year: "2022",
        rating: 7.9,
        genre: "Action/Crime",
        image: "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
        description: "When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption."
    },
    {
        id: 5,
        title: "Interstellar",
        year: "2014",
        rating: 8.7,
        genre: "Sci-Fi/Adventure",
        image: "https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
    },
    {
        id: 6,
        title: "Inception",
        year: "2010",
        rating: 8.8,
        genre: "Action/Sci-Fi",
        image: "https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
    },
    {
        id: 7,
        title: "Avatar: The Way of Water",
        year: "2022",
        rating: 7.6,
        genre: "Sci-Fi/Action",
        image: "https://image.tmdb.org/t/p/original/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
        description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home."
    },
    {
        id: 8,
        title: "Top Gun: Maverick",
        year: "2022",
        rating: 8.3,
        genre: "Action/Drama",
        image: "https://image.tmdb.org/t/p/original/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
        description: "After more than thirty years of service as one of the Navy's top aviators, and dodging the advancement in rank that would ground him, Pete 'Maverick' Mitchell finds himself training a detachment of TOP GUN graduates for a specialized mission the likes of which no living pilot has ever seen."
    },
    {
        id: 9,
        title: "Everything Everywhere All At Once",
        year: "2022",
        rating: 7.8,
        genre: "Action/Adventure",
        image: "https://image.tmdb.org/t/p/original/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
        description: "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes connecting with the lives she could have led."
    },
    {
        id: 10,
        title: "Joker",
        year: "2019",
        rating: 8.4,
        genre: "Crime/Drama",
        image: "https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
        description: "During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure."
    },
    {
        id: 11,
        title: "Avengers: Endgame",
        year: "2019",
        rating: 8.4,
        genre: "Action/Sci-Fi",
        image: "https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        description: "After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe."
    },
    {
        id: 12,
        title: "Black Panther",
        year: "2018",
        rating: 7.3,
        genre: "Action/Adventure",
        image: "https://image.tmdb.org/t/p/original/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
        description: "T'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his country's past."
    },
    {
        id: 13,
        title: "Jawan",
        year: "2023",
        rating: 7.6,
        genre: "Action/Thriller",
        image: "https://image.tmdb.org/t/p/original/kF7I5ZQbh2iMb4SJb1C6sw6q2jf.jpg",
        description: "A high-octane action thriller which outlines the emotional journey of a man who is set to rectify the wrongs in the society."
    },
    {
        id: 14,
        title: "Animal",
        year: "2023",
        rating: 7.0,
        genre: "Action/Drama",
        image: "https://image.tmdb.org/t/p/original/14zedCaF044yj3at1TJ2uHpaNQD.jpg",
        description: "The hardened son of a powerful industrialist returns home after years abroad and vows to protect his family from assassin threats."
    },
    {
        id: 15,
        title: "Mardaani 3",
        year: "2026",
        rating: 7.2,
        genre: "Action/Thriller",
        image: "https://image.tmdb.org/t/p/original/muhNhCTsRzR95Z0PmSUwlql46Rg.jpg",
        description: "Officer Shivani Shivaji Roy returns to hunt down those behind the disappearance of young girls, risking everything to bring them back alive."
    },
    {
        id: 16,
        title: "Dhadak 2",
        year: "2025",
        rating: 7.5,
        genre: "Romance/Thriller",
        image: "https://image.tmdb.org/t/p/original/s3o23GbRXvHPPRm50kqQjjjCoKP.jpg",
        description: "Nilesh and Vidhi fall in love. Tragedy strikes when their relationship is threatened by caste differences, creating a significant obstacle to their union."
    },
    {
        id: 17,
        title: "Chhaava",
        year: "2025",
        rating: 8.4,
        genre: "Action",
        image: "https://image.tmdb.org/t/p/original/eD6s6LHOIrLMcarJtcRwn0EQXKA.jpg",
        description: "Shivaji's death sparks the Maratha-Mughal conflict. His son Sambhaji leads resistance against Aurangzeb's forces. Amid battles and intrigue, both sides face challenges in a struggle for power."
    }
];

const Dashboard = () => {
    const navigate = useNavigate();
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('All');
    const [city, setCity] = useState('Mumbai');
    const user = JSON.parse(localStorage.getItem('user'));

    const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune'];

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
        window.location.reload(); // Simple reload to update auth state
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    const handleMovieClick = (movie) => {
        if (!user) {
            navigate('/login');
        } else {
            setSelectedMovie(movie);
        }
    };

    const filteredMovies = MOVIES.filter(movie => {
        const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = activeTab === 'All' || movie.genre.includes(activeTab);
        return matchesSearch && matchesTab;
    });

    return (
        <div className="dashboard-container">
            {/* Navbar */}
            <nav className="navbar">
                <div className="container nav-content">
                    <div className="logo">
                        <h2>MovieTix</h2>
                    </div>

                    <div className="search-bar">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search for movies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="nav-actions">
                        <div className="location-selector">
                            <MapPin size={16} className="location-icon" />
                            <select
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="city-select"
                            >
                                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        {user ? (
                            <button onClick={handleLogout} className="btn-logout" title="Logout">
                                <LogOut size={18} />
                            </button>
                        ) : (
                            <button onClick={handleLoginRedirect} className="btn btn-primary btn-sm">
                                <User size={16} style={{ marginRight: '6px' }} /> Login
                            </button>
                        )}

                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container main-content">
                {selectedMovie ? (
                    <SeatSelection
                        movie={selectedMovie}
                        city={city}
                        onBack={() => setSelectedMovie(null)}
                    />
                ) : (
                    <>
                        <div className="section-header">
                            <h1>Now Showing</h1>
                            <div className="tabs">
                                {['All', 'Action', 'Sci-Fi', 'Drama', 'Adventure'].map(tab => (
                                    <button
                                        key={tab}
                                        className={`tab ${activeTab === tab ? 'active' : ''}`}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="movie-grid">
                            {filteredMovies.map(movie => (
                                <MovieCard
                                    key={movie.id}
                                    movie={movie}
                                    onClick={() => handleMovieClick(movie)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </main>

            <style>{`
                .dashboard-container {
                    min-height: 100vh;
                    /* Background handled by body styles */
                }

                .navbar {
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    background-color: rgba(26, 29, 41, 0.95);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid var(--glass-border);
                    padding: 1rem 0;
                    box-shadow: var(--shadow-md);
                }

                .nav-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .logo h2 {
                    background: linear-gradient(to right, var(--accent-red), var(--accent-purple));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    font-weight: 800;
                    font-size: 1.5rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .search-bar {
                    position: relative;
                    width: 100%;
                    max-width: 400px;
                }

                .search-icon {
                    position: absolute;
                    left: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--text-secondary);
                }

                .search-bar input {
                    width: 100%;
                    padding: 0.6rem 1rem 0.6rem 2.5rem;
                    background-color: rgba(255, 255, 255, 0.05);
                    border: 1px solid transparent;
                    border-radius: var(--radius-md);
                    color: var(--text-primary);
                    transition: all 0.2s;
                }

                .search-bar input:focus {
                    outline: none;
                    border-color: var(--accent-red);
                    background-color: rgba(255, 255, 255, 0.1);
                    box-shadow: var(--shadow-neon);
                }

                .nav-actions {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                }

                .location-selector {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                    background: rgba(255, 255, 255, 0.05);
                    padding: 0.4rem 0.8rem;
                    border-radius: var(--radius-md);
                    border: 1px solid transparent;
                    transition: all 0.2s;
                }

                .location-selector:hover {
                    border-color: var(--accent-red);
                    background: rgba(255, 255, 255, 0.1);
                }
                
                .location-icon {
                    color: var(--accent-red);
                }

                .city-select {
                    background: transparent;
                    border: none;
                    color: var(--text-primary);
                    font-family: inherit;
                    font-size: 0.9rem;
                    outline: none;
                    cursor: pointer;
                }

                .city-select option {
                    background-color: var(--bg-secondary);
                    color: var(--text-primary);
                }

                .btn-logout {
                    color: var(--text-secondary);
                    padding: 0.5rem;
                    border-radius: 50%;
                    transition: background 0.2s;
                }

                .btn-logout:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                    color: var(--accent-red);
                }

                .btn-sm {
                    padding: 0.5rem 1rem;
                    font-size: 0.9rem;
                }

                .main-content {
                    padding-top: 2rem;
                    padding-bottom: 4rem;
                }

                .section-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 2rem;
                }

                .section-header h1 {
                    font-size: 2rem;
                    font-weight: 700;
                    background: linear-gradient(to right, #fff, #bbb);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .tabs {
                    display: flex;
                    gap: 1rem;
                }

                .tab {
                    padding: 0.5rem 1.25rem;
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                    position: relative;
                    border-radius: var(--radius-lg);
                    transition: all 0.3s;
                }

                .tab:hover {
                    color: var(--text-primary);
                    background: rgba(255, 255, 255, 0.05);
                }

                .tab.active {
                    color: white;
                    font-weight: 600;
                    background: var(--accent-red);
                    box-shadow: var(--shadow-neon);
                }

                .movie-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
                    gap: 2rem;
                    padding: 1rem 0;
                }

                .movie-card-container {
                    height: 100%;
                }
            `}</style>
        </div>
    );
};

export default Dashboard;

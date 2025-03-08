import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos } from '../redux/feedSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import "../styles.css";

const Feed = () => {
    const dispatch = useDispatch();
    const { photos, status } = useSelector((state) => state.feed);
    const [allPhotos, setAllPhotos] = useState([]);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        if (photos.length === 0) {
            dispatch(fetchPhotos());
        }
    }, [dispatch, photos.length]);

    useEffect(() => {
        if (photos.length > 0) {
            setAllPhotos((prevPhotos) => [...prevPhotos, ...photos]);
        }
    }, [photos]);

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className={`container ${theme}`}>
            <div className="header">
                <h1 className="title">PhotoVista</h1>
                <button className="theme-toggle-btn" onClick={toggleTheme}>
                    {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                </button>
            </div>

            <InfiniteScroll
                dataLength={allPhotos.length}
                next={() => dispatch(fetchPhotos())}
                hasMore={status !== 'failed'}
                loader={<p className="text-center">Loading more photos...</p>}
            >
                <div className="row">
                    {allPhotos.map((photo) => (
                        <div key={photo.id} className="grid-item">
                            <img src={photo.urls.small} alt={photo.alt_description} />
                            <div className="card-body">
                                <h5 className="card-title">
                                    📸 <a href={`/user/${photo.user.username}`}>{photo.user.name}</a>
                                </h5>
                                <p className="card-text">📍 {photo.user.location || "Unknown"}</p>
                                <p className="card-text">❤️ {photo.likes} Likes</p>
                                <a href={photo.urls.full} target="_blank" rel="noopener noreferrer" className="btn">
                                    View Full Image
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default Feed;

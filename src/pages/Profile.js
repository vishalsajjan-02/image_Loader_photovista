// import React, { useEffect, useState, useCallback } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import "../styles.css"; // Ensure styles are linked

// const Profile = () => {
//     const { username } = useParams();
//     const [user, setUser] = useState(null);
//     const [photos, setPhotos] = useState([]);
//     const [page, setPage] = useState(1);
//     const [hasMore, setHasMore] = useState(true);
//     const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light'); // ✅ Theme state

//     // ✅ Toggle Light/Dark Mode
//     const toggleTheme = () => {
//         const newTheme = theme === 'light' ? 'dark' : 'light';
//         setTheme(newTheme);
//         localStorage.setItem('theme', newTheme); // ✅ Save to localStorage
//     };

//     useEffect(() => {
//         document.body.className = theme; // ✅ Apply theme to body
//     }, [theme]);

//     // ✅ Fetch User Photos (Paginated)
//     const fetchUserPhotos = useCallback(async (pageNumber) => {
//         try {
//             const API_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
//             const response = await axios.get(
//                 `https://api.unsplash.com/users/${username}/photos?page=${pageNumber}&per_page=15&client_id=${API_KEY}`
//             );

//             if (response.data.length === 0) {
//                 setHasMore(false);
//             } else {
//                 setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
//             }
//         } catch (error) {
//             console.error("Error fetching user photos:", error);
//             setHasMore(false);
//         }
//     }, [username]);

//     // ✅ Fetch User Profile
//     const fetchUserProfile = async () => {
//         try {
//             const API_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
//             const response = await axios.get(`https://api.unsplash.com/users/${username}?client_id=${API_KEY}`);
//             setUser(response.data);
//         } catch (error) {
//             console.error("Error fetching user profile:", error);
//         }
//     };

//     useEffect(() => {
//         fetchUserProfile();
//         fetchUserPhotos(1);
//     }, [fetchUserPhotos]);

//     useEffect(() => {
//         if (page > 1) {
//             fetchUserPhotos(page);
//         }
//     }, [page, fetchUserPhotos]);

//     if (!user) return <p className="text-center">Loading...</p>;

//     return (
//         <div className={`container ${theme}`}>
//             <div className="profile-header">
//                 <h2>{user.name}</h2>
//                 <p>{user.bio || "No bio available"}</p>
//                 <p>📷 Total Photos: {user.total_photos}</p>
//                 <button className="theme-toggle-btn" onClick={toggleTheme}>
//                     {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
//                 </button>
//             </div>

//             {/* ✅ Infinite Scroll Component */}
//             <InfiniteScroll
//                 dataLength={photos.length}
//                 next={() => setPage((prevPage) => prevPage + 1)}
//                 hasMore={hasMore}
//                 loader={<p className="text-center">Loading more photos...</p>}
//             >
//                 <div className="row">
//                     {photos.map((photo) => (
//                         <div key={photo.id} className="grid-item">
//                             <img src={photo.urls.small} alt={photo.alt_description} />
//                             <div className="card-body">
//                                 <p className="card-text">❤️ {photo.likes} Likes</p>
//                                 <a href={photo.urls.full} target="_blank" rel="noopener noreferrer" className="btn">
//                                     View Full Image
//                                 </a>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </InfiniteScroll>
//         </div>
//     );
// };

// export default Profile;







import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import "../styles.css"; // Ensure styles are linked

const Profile = () => {
    const { username } = useParams();
    const [user, setUser] = useState(null); // Pexels doesn't support user profiles, so this is optional
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light'); // ✅ Theme state

    const API_KEY = process.env.REACT_APP_PEXELS_API_KEY;

    // ✅ Toggle Light/Dark Mode
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    // ✅ Fetch User Photos (Paginated)
    const fetchUserPhotos = useCallback(async (pageNumber) => {
        try {
            const response = await axios.get(
                `https://api.pexels.com/v1/search?query=${username}&page=${pageNumber}&per_page=15`,
                {
                    headers: { Authorization: API_KEY }
                }
            );

            if (response.data.photos.length === 0) {
                setHasMore(false);
            } else {
                setPhotos((prevPhotos) => [...prevPhotos, ...response.data.photos]);
            }
        } catch (error) {
            console.error("Error fetching user photos:", error);
            setHasMore(false);
        }
    }, [username, API_KEY]);

    useEffect(() => {
        fetchUserPhotos(1);
    }, [fetchUserPhotos]);

    useEffect(() => {
        if (page > 1) {
            fetchUserPhotos(page);
        }
    }, [page, fetchUserPhotos]);

    return (
        <div className={`container ${theme}`}>
            <div className="profile-header">
                <h2>{username}</h2>
                <p>📷 Photos from Pexels</p>
                <button className="theme-toggle-btn" onClick={toggleTheme}>
                    {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                </button>
            </div>

            {/* ✅ Infinite Scroll Component */}
            <InfiniteScroll
                dataLength={photos.length}
                next={() => setPage((prevPage) => prevPage + 1)}
                hasMore={hasMore}
                loader={<p className="text-center">Loading more photos...</p>}
            >
                <div className="row">
                    {photos.map((photo) => (
                        <div key={photo.id} className="grid-item">
                            <img src={photo.src.small} alt={photo.alt} />
                            <div className="card-body">
                                <p className="card-text">📷 Photographer: {photo.photographer}</p>
                                <a href={photo.src.original} target="_blank" rel="noopener noreferrer" className="btn">
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

export default Profile;

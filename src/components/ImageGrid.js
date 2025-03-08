// import React from "react";
// import { Link } from "react-router-dom";
// import "../styles.css"; // Make sure styles are correctly linked

// const ImageGrid = ({ photos, isGridView = true }) => {
//     return (
//         <div className="row">
//             {photos.map((photo) => (
//                 <div key={photo.id} className="grid-item">
//                     <img src={photo.urls.small} alt={photo.alt_description} />
//                     <div className="card-body">
//                         <h5 className="card-title">
//                             📸 <Link to={`/user/${photo.user.username}`}>{photo.user.name}</Link>
//                         </h5>
//                         <p className="card-text">📍 {photo.user.location || "Unknown"}</p>
//                         <p className="card-text">❤️ {photo.likes} Likes</p>
//                         <a href={photo.urls.full} target="_blank" rel="noopener noreferrer" className="btn">
//                             View Full Image
//                         </a>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default ImageGrid;

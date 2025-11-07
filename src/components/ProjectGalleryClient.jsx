import React, { useState } from 'react';
import './ProjectGallery.css';

export default function ProjectGalleryClient({ media }) {
  const [selected, setSelected] = useState(0);
  const current = media[selected];

  return (
    <div className="gallery">
      <div className="gallery-main">
        {current.type === 'video' ? (
          <video 
            src={current.src} 
            controls 
            controlsList="nodownload"
            preload="metadata"
          />
        ) : (
          <img src={current.src} alt={`Media ${selected + 1}`} />
        )}
      </div>

      <div className="gallery-thumbs">
        {media.map((item, index) => (
          <button 
            key={index}
            className={`thumb ${index === selected ? 'active' : ''}`}
            onClick={() => setSelected(index)}
          >
            {item.type === 'video' ? (
              <video src={item.src} muted preload="metadata" />
            ) : (
              <img src={item.src} alt={`Thumbnail ${index + 1}`} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}


// import React, { useEffect, useRef, useState } from "react";

// export default function ProjectGallery({ media = [] }) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const mainRef = useRef(null);
//   const thumbsRef = useRef(null);

//   useEffect(() => {
//     function onKey(e) {
//       if (e.key === "ArrowRight") next();
//       if (e.key === "ArrowLeft") prev();
//       if (e.key === "Escape") setCurrentIndex(0);
//     }
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [currentIndex]);

//   useEffect(() => {
//     // ensure active thumbnail is visible
//     const thumbs = thumbsRef.current;
//     const active = thumbs?.querySelectorAll(".thumb-btn")[currentIndex];
//     if (active && thumbs) {
//       const rect = active.getBoundingClientRect();
//       const parentRect = thumbs.getBoundingClientRect();
//       if (rect.left < parentRect.left || rect.right > parentRect.right) {
//         active.scrollIntoView({ behavior: "smooth", inline: "center" });
//       }
//     }
//   }, [currentIndex]);

//   function prev() {
//     setCurrentIndex((i) => (i - 1 + media.length) % media.length);
//   }

//   function next() {
//     setCurrentIndex((i) => (i + 1) % media.length);
//   }

//   const current = media[currentIndex] || {};

//   return (
//     <div className="gallery" aria-roledescription="image gallery">
//       <div className="gallery-main" ref={mainRef}>
//         <button
//           className="gallery-nav gallery-nav-left"
//           aria-label="Previous"
//           onClick={prev}
//         >
//           ‹
//         </button>

//         {current.type === "video" ? (
//           <video
//             key={current.src}
//             src={current.src}
//             controls
//             playsInline
//             className="gallery-video"
//           />
//         ) : (
//           <img
//             key={current.src}
//             src={current.src}
//             alt={current.alt || `Preview ${currentIndex + 1}`}
//             className="gallery-image"
//           />
//         )}

//         <button
//           className="gallery-nav gallery-nav-right"
//           aria-label="Next"
//           onClick={next}
//         >
//           ›
//         </button>
//       </div>

//       <div className="gallery-footer">
//         <div className="gallery-counter">{`${currentIndex + 1}/${media.length}`}</div>
//         <div className="gallery-thumbnails" ref={thumbsRef} role="list">
//           {media.map((item, i) => (
//             <button
//               key={i}
//               role="listitem"
//               className={`thumb-btn ${i === currentIndex ? "active" : ""}`}
//               onClick={() => setCurrentIndex(i)}
//               onMouseEnter={(e) => {
//                 // if thumbnail is video, play preview
//                 const vid = e.currentTarget.querySelector("video");
//                 if (vid) vid.play().catch(() => {});
//               }}
//               onMouseLeave={(e) => {
//                 const vid = e.currentTarget.querySelector("video");
//                 if (vid) {
//                   vid.pause();
//                   vid.currentTime = 0;
//                 }
//               }}
//               aria-label={`Show ${i + 1}`}
//             >
//               {item.type === "video" ? (
//                 <video muted loop playsInline preload="metadata">
//                   <source src={item.src} type="video/mp4" />
//                 </video>
//               ) : (
//                 <img src={item.src} alt={item.alt || `Thumbnail ${i + 1}`} />
//               )}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

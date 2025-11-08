// src/components/ProjectGalleryClient.jsx
import React, { useState, useEffect, useRef } from "react";
import "./ProjectGallery.css"; // asegúrate de tener este archivo o mover estilos a global

export default function ProjectGalleryClient({ media }) {
  // Normalizar media a array vacío si viene undefined/null
  const safeMedia = Array.isArray(media) ? media : [];

  // selected: índice del item seleccionado; -1 = ninguno / placeholder
  const [selected, setSelected] = useState(safeMedia.length ? 0 : -1);
  const mainRef = useRef(null);

  // Si la prop media cambia dinámicamente, ajustamos selected
  useEffect(() => {
    if (safeMedia.length === 0) {
      setSelected(-1);
      return;
    }
    // Si antes no había nada y ahora sí, seleccionamos el primero
    if (selected === -1 && safeMedia.length > 0) {
      setSelected(0);
      return;
    }
    // Si el índice seleccionado excede el nuevo tamaño, lo recortamos
    if (selected >= safeMedia.length) {
      setSelected(safeMedia.length - 1);
    }
  }, [media]); // dependemos de media (prop) para reaccionar a cambios

  // Fade simple al cambiar seleccionado
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    el.classList.remove("fade-in");
    // trigger reflow para reiniciar la animación
    void el.offsetWidth;
    el.classList.add("fade-in");
  }, [selected]);

  const current = selected >= 0 ? safeMedia[selected] : null;

  return (
    <div className="gallery">
      <div className="gallery-main" ref={mainRef}>
        {current ? (
          current.type === "video" ? (
            // El video NO hace autoplay; el usuario debe pulsar play
            <video
              key={current.src}
              src={current.src}
              controls
              playsInline
              preload="metadata"
              className="gallery-video"
            />
          ) : (
            <img
              key={current.src}
              src={current.src}
              alt={`Preview ${selected + 1}`}
              className="gallery-image"
            />
          )
        ) : (
          <div className="gallery-placeholder">
            <p>No media available</p>
          </div>
        )}
      </div>

      {safeMedia.length > 0 && (
        <div className="gallery-thumbs" role="list">
          {safeMedia.map((item, i) => (
            <button
              key={i}
              className={`thumb ${i === selected ? "active" : ""}`}
              onClick={() => setSelected(i)}
              aria-label={`Select media ${i + 1}`}
            >
              {item.type === "video" ? (
                <video src={item.src} muted loop playsInline preload="metadata" />
              ) : (
                <img src={item.src} alt={`Thumbnail ${i + 1}`} />
              )}
            </button>
          ))}
        </div>
      )}
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

import React from "react";

export default function GallerySection() {
  const galleryImages = [
    {
      url: `${import.meta.env.BASE_URL}gallery/rpwl_gallery_1.jpeg`,
      title: "Match Action & Practice",
    },
    {
      url: `${import.meta.env.BASE_URL}gallery/rpwl_gallery_2.jpeg`,
      title: "Cricket Camp & Match Moments",
    },
    {
      url: `${import.meta.env.BASE_URL}gallery/girl_gallery_ne.png`,
      title: "RWPL 2.0 Tournament Action",
    },
    {
      url: `${import.meta.env.BASE_URL}gallery/file_girl_gallery.png`,
      title: "Ground Energy & Celebration",
    },
  ];

  return (
    <section className="section gallery-section" id="gallery">
      <div className="container-custom">
        {/* GALLERY HEADER */}
        <div className="gallery-header-clean">
          <div className="gallery-accent-bar"></div>
          <h2 className="gallery-title">GALLERY</h2>
          <p className="gallery-subtitle">MOMENTS THAT INSPIRE</p>
        </div>

        {/* 4-CARD ROW GRID */}
        <div className="gallery-grid-row">
          {galleryImages.map((img, idx) => (
            <div className="gallery-card-item group" key={idx}>
              <img
                src={img.url}
                alt={img.title}
                className="gallery-card-img"
                loading="lazy"
              />
              <div className="gallery-card-hover">
                <span className="gallery-hover-text">{img.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

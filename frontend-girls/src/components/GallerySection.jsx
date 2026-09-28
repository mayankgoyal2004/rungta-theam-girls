import React from 'react';

export default function GallerySection() {
  const galleryImages = [
    {
      url: "/gallery/rpl_gallery_1.jpeg",
      title: "Match Action & Practice"
    },
    {
      url: "/gallery/rpl_gallery_2.jpeg",
      title: "Cricket Camp & Match Moments"
    },
    {
      url: "/gallery/file_0000000085b88211955db56a354a66d1.png",
      title: "RPL 5.0 Tournament Action"
    },
    {
      url: "/gallery/file_0000000093f88211a06340816a0470a3.png",
      title: "Ground Energy & Celebration"
    }
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

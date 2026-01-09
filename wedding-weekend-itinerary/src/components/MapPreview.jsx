import "./MapPreview.css";

//helpers
function getMapEmbedUrl(event) {
  const query = [event?.Location, event?.Address].filter(Boolean).join(", ");
  if (!query) return "";
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export default function MapPreview({ event }) {
  const embedUrl = getMapEmbedUrl(event);
  const label = event?.Address || event?.Location;

  if (!embedUrl) return null;

  return (
    <div className="map-card">
      <div className="map-frame">
        <iframe
          title="Map preview"
          src={embedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {label && (
        <div className="map-details">
          <span className="map-pin">📍</span>
          <span className="map-text">{label}</span>
        </div>
      )}
    </div>
  );
}

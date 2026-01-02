export default function BottomNav({ activeTab, onChange }) {
  return (
    <nav className="bottom-nav">
      <button
        className={activeTab === "schedule" ? "nav-btn active" : "nav-btn"}
        onClick={() => onChange("schedule")}
        type="button"
      >
        Schedule
      </button>

      <button
        className={activeTab === "info" ? "nav-btn active" : "nav-btn"}
        onClick={() => onChange("info")}
        type="button"
      >
        Info
      </button>

      <button
        className={activeTab === "map" ? "nav-btn active" : "nav-btn"}
        onClick={() => onChange("map")}
        type="button"
      >
        Map
      </button>

      <button
        className={activeTab === "faq" ? "nav-btn active" : "nav-btn"}
        onClick={() => onChange("faq")}
        type="button"
      >
        FAQ
      </button>
    </nav>
  );
}

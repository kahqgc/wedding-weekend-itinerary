import "./ModeToggle.css";

export default function ModeToggle({ mode, onChange }) {
  return (
    <div className="mode-toggle">
      <button
        type="button"
        className={mode === "today" ? "mode-btn active" : "mode-btn"}
        onClick={() => onChange("today")}
      >
        Today
      </button>
      <button
        type="button"
        className={mode === "all" ? "mode-btn active" : "mode-btn"}
        onClick={() => onChange("all")}
      >
        All
      </button>
    </div>
  );
}

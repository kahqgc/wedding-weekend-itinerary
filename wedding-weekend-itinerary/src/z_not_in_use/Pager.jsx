export default function Pager({ index, total, onPrev, onNext }) {
  return (
    <div className="pager">
      <button
        className="pager-btn"
        onClick={onPrev}
        disabled={index === 0}
      >
        ← Prev
      </button>

      <span className="pager-count">
        {index + 1} / {total}
      </span>

      <button
        className="pager-btn"
        onClick={onNext}
        disabled={index === total - 1}
      >
        Next →
      </button>
    </div>
  );
}

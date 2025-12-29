
import './App.css'

function App() {
    return (
    <div className="app">
      <header className="header">
        <h1>Vegas Weekend Itinerary</h1>
        <p>Kayla & Chris • April 18, 2026</p>
      </header>

      <main className="main">
        <section className="day-picker">
          <button>Thu</button>
          <button>Fri</button>
          <button>Sat</button>
          <button>Sun</button>
        </section>

        <section className="events">
          <h2>Friday</h2>

          <article className="event-card">
            <div className="event-time">10:00 AM</div>
            <div className="event-info">
              <h3>Spa Day</h3>
              <p className="event-location">Fontainebleau Spa</p>
              <p className="event-notes">Tap for details</p>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export default App

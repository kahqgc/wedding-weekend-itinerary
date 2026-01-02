import "./App.css";
import { useState } from "react";
import BottomNav from "./components/BottomNav.jsx";
import ScheduleView from "./components/ScheduleView.jsx";
import InfoView from "./components/InfoView.jsx";
import MapView from "./components/MapView.jsx";
import FaqView from "./components/FaqView.jsx";

function App() {
  // VEGAS_WEDDING_MASTER_SCHEDULE_SPA_FRIDAY
  const [activeTab, setActiveTab] = useState("schedule");

  return (
    <div className="app">
      <header className="header">
        <h1>Vegas Weekend Itinerary</h1>
        <p>Kayla & Chris • April 18, 2026</p>
      </header>

      <main className="main">
        <section className="screen">
          {activeTab === "schedule" && <ScheduleView />}
          {activeTab === "info" && <InfoView />}
          {activeTab === "map" && <MapView />}
          {activeTab === "faq" && <FaqView />}
        </section>

        <BottomNav activeTab={activeTab} onChange={setActiveTab} />
      </main>
    </div>
  );
}

export default App;

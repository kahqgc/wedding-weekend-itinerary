import "./App.css";
import { useState } from "react";
import Header from "./components/Header.jsx";
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
      <main className="main">
        <Header />
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

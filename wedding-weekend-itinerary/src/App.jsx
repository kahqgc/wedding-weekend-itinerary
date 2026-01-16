import "./App.css";
import { useState } from "react";
import Header from "./components/Header/Header.jsx";
import BottomNav from "./components/BottomNav/BottomNav.jsx";
import ScheduleView from "./views/ScheduleView.jsx";
import InfoView from "./views/InfoView.jsx";
import MapView from "./views/MapView.jsx";
import FaqView from "./views/FaqView.jsx";

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

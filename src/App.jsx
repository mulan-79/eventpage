import { useState } from "react";
import SettingForm from "./components/SettingForm.jsx";
import ResultView from "./components/ResultView.jsx";

const INITIAL_WINNERS = Array.from({ length: 5 }, (_, i) => ({
  rank: i + 1,
  prize: "",
  name: "",
  phone: ""
}));

function App() {
  const [view, setView] = useState("settings");
  const [formData, setFormData] = useState({
    theme: "congrats",
    eventName: "",
    winners: INITIAL_WINNERS
  });

  const handlePreview = (nextData) => {
    setFormData(nextData);
    setView("result");
  };

  const handleCreate = (nextData) => {
    setFormData(nextData);
    setView("result");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 to-white px-4 py-10">
      <div className="mx-auto w-full max-w-5xl">
        {view === "settings" ? (
          <SettingForm
            initialData={formData}
            onPreview={handlePreview}
            onCreate={handleCreate}
          />
        ) : (
          <ResultView data={formData} onBack={() => setView("settings")} />
        )}
      </div>
    </main>
  );
}

export default App;

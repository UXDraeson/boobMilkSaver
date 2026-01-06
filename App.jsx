import { useState } from "react";

export default function NursingSavingsCalculator() {
  const [months, setMonths] = useState(6);
  const [sessionsPerDay, setSessionsPerDay] = useState(8);
  const [minutesPerSession, setMinutesPerSession] = useState(20);
  const [costPerCan, setCostPerCan] = useState(35);

  const daysPerMonth = 30.4;
  const cansPerMonth = 8.3;

  const totalSessions = months * daysPerMonth * sessionsPerDay;
  const totalMinutes = totalSessions * minutesPerSession;
  const totalHours = totalMinutes / 60;
  const cansAvoided = months * cansPerMonth;
  const moneySaved = cansAvoided * costPerCan;

  const shareData = {
    title: "Nursing Savings Calculator",
    text: `I've nursed for ${totalHours.toFixed(1)} hours and saved about $${moneySaved.toFixed(0)} on formula.`
  };

  function handleShare() {
    const params = new URLSearchParams({
      months,
      sessionsPerDay,
      minutesPerSession,
      costPerCan
    });
    const shareUrl = `${window.location.origin}?${params.toString()}`;

    if (navigator.share) {
      navigator.share({ ...shareData, url: shareUrl });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Share link copied to clipboard");
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-neutral-900">
          Nursing Savings Calculator
        </h1>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Months Nursing" value={months} onChange={setMonths} />
          <Input
            label="Sessions / Day"
            value={sessionsPerDay}
            onChange={setSessionsPerDay}
          />
          <Input
            label="Minutes / Session"
            value={minutesPerSession}
            onChange={setMinutesPerSession}
          />
          <Input
            label="Cost per Formula Can ($)"
            value={costPerCan}
            onChange={setCostPerCan}
          />
        </div>

        <div className="border-t pt-4 space-y-3">
          <Result label="Total Hours Nursed" value={`${totalHours.toFixed(1)} hrs`} />
          <Result label="Formula Cans Avoided" value={`${cansAvoided.toFixed(1)} cans`} />
          <Result
            label="Estimated Money Saved"
            value={`$${moneySaved.toFixed(2)}`}
          />
        </div>

        <button
          onClick={handleShare}
          className="w-full mt-4 rounded-xl bg-neutral-900 text-white py-3 font-medium hover:bg-neutral-800 transition"
        >
          Share My Results
        </button>

        <p className="text-sm text-neutral-500">
          Estimates are based on average formula consumption (≈8.3 cans/month).
        </p>
      </div>
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-neutral-600 mb-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-300"
      />
    </div>
  );
}

function Result({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-neutral-700">{label}</span>
      <span className="font-medium text-neutral-900">{value}</span>
    </div>
  );
}

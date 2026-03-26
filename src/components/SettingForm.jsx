import { useState } from "react";

const THEMES = [
  {
    id: "congrats",
    label: "축하해요",
    description: "밝고 경쾌한 느낌의 축하 테마"
  },
  {
    id: "calm",
    label: "차분함",
    description: "깔끔하고 안정적인 톤의 테마"
  },
  {
    id: "intense",
    label: "강렬함",
    description: "선명한 대비와 임팩트 있는 테마"
  }
];

function SettingForm({ initialData, onPreview, onCreate }) {
  const [theme, setTheme] = useState(initialData.theme);
  const [eventName, setEventName] = useState(initialData.eventName);
  const [winners, setWinners] = useState(initialData.winners);

  const updateWinner = (index, field, value) => {
    setWinners((prev) =>
      prev.map((winner, i) =>
        i === index ? { ...winner, [field]: value } : winner
      )
    );
  };

  const buildPayload = () => ({
    theme,
    eventName,
    winners
  });

  return (
    <section className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/60 backdrop-blur sm:p-8">
      <header className="mb-8">
        <p className="text-sm font-medium text-indigo-600">이벤트 설정</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
          당첨자 발표 페이지 만들기
        </h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          테마와 당첨자 정보를 입력한 뒤 미리보기를 확인하세요.
        </p>
      </header>

      <div className="space-y-8">
        <div>
          <h2 className="text-base font-semibold text-slate-800">디자인 선택</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {THEMES.map((item) => {
              const selected = theme === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTheme(item.id)}
                  className={`rounded-xl border p-4 text-left transition ${
                    selected
                      ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="text-base font-semibold text-slate-800" htmlFor="eventName">
            이벤트명
          </label>
          <input
            id="eventName"
            type="text"
            placeholder="예: 봄맞이 고객 감사 이벤트"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <h2 className="text-base font-semibold text-slate-800">당첨자 정보 (1위~5위)</h2>
          <div className="mt-3 grid gap-3">
            {winners.map((winner, index) => (
              <div
                key={winner.rank}
                className="grid gap-2 rounded-xl border border-slate-200 bg-slate-50/70 p-3 sm:grid-cols-[80px_1fr_1fr_1fr]"
              >
                <div className="flex items-center text-sm font-semibold text-slate-700">
                  {winner.rank}위
                </div>
                <input
                  type="text"
                  placeholder="상품명 (예: 아이패드, 기프티콘)"
                  value={winner.prize ?? ""}
                  onChange={(e) => updateWinner(index, "prize", e.target.value)}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
                <input
                  type="text"
                  placeholder="이름"
                  value={winner.name}
                  onChange={(e) => updateWinner(index, "name", e.target.value)}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
                <input
                  type="text"
                  placeholder="전화번호 뒷자리 (예: 1234)"
                  value={winner.phone}
                  onChange={(e) =>
                    updateWinner(index, "phone", e.target.value.replace(/[^0-9]/g, ""))
                  }
                  maxLength={4}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => onPreview(buildPayload())}
          className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          미리보기
        </button>
        <button
          type="button"
          onClick={() => onCreate(buildPayload())}
          className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          생성하기
        </button>
      </div>
    </section>
  );
}

export default SettingForm;

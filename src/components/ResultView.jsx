const THEME_STYLES = {
  congrats: {
    page: "from-yellow-50 via-pink-50 to-indigo-50",
    badge: "bg-pink-100 text-pink-700",
    title: "text-pink-700",
    card: "border-pink-100 bg-white/95"
  },
  calm: {
    page: "from-slate-100 via-sky-50 to-cyan-50",
    badge: "bg-sky-100 text-sky-700",
    title: "text-sky-700",
    card: "border-sky-100 bg-white/95"
  },
  intense: {
    page: "from-slate-900 via-violet-950 to-fuchsia-900",
    badge: "bg-fuchsia-200/90 text-fuchsia-900",
    title: "text-white",
    card: "border-violet-400/40 bg-white/10"
  }
};

function maskPhone(phone) {
  if (!phone) return "****";
  return phone.padStart(4, "*");
}

function ResultView({ data, onBack }) {
  const theme = THEME_STYLES[data.theme] ?? THEME_STYLES.congrats;
  const isDark = data.theme === "intense";

  return (
    <section
      className={`rounded-3xl bg-gradient-to-br ${theme.page} p-6 shadow-2xl sm:p-8`}
    >
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${theme.badge}`}
          >
            당첨 결과 발표
          </span>
          <h1
            className={`mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl ${theme.title}`}
          >
            {data.eventName || "이벤트명을 입력해주세요"}
          </h1>
        </div>
        <button
          type="button"
          onClick={onBack}
          className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
            isDark
              ? "bg-white/20 text-white hover:bg-white/30"
              : "bg-white text-slate-700 hover:bg-slate-100"
          }`}
        >
          설정으로 돌아가기
        </button>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {data.winners.map((winner) => (
          <article
            key={winner.rank}
            className={`rounded-2xl border p-4 backdrop-blur ${theme.card}`}
          >
            <p
              className={`text-sm font-bold ${
                isDark ? "text-fuchsia-100" : "text-slate-600"
              }`}
            >
              {winner.rank}위 당첨자
            </p>
            <p
              className={`mt-2 text-sm font-semibold ${
                isDark ? "text-slate-200" : "text-slate-600"
              }`}
            >
              상품: {winner.prize || "상품 미입력"}
            </p>
            <p
              className={`mt-1 text-lg font-semibold ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {winner.name || "이름 미입력"}
            </p>
            <p
              className={`mt-1 text-sm ${
                isDark ? "text-slate-200" : "text-slate-500"
              }`}
            >
              전화번호 뒷자리: {maskPhone(winner.phone)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ResultView;

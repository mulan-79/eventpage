import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    if (this.state.error) {
      const err = this.state.error;
      return (
        <div className="min-h-screen bg-slate-50 p-6 text-slate-900">
          <h1 className="text-lg font-bold">화면을 불러오는 중 오류가 났습니다</h1>
          <pre className="mt-3 whitespace-pre-wrap break-all text-sm text-red-700">
            {String(err?.message || err)}
            {err?.stack ? `\n\n${err.stack}` : ""}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

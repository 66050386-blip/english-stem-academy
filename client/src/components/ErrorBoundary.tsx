import React, { Component, ErrorInfo, ReactNode } from 'react';
import { DuoMascot } from './Mascot/DuoMascot';
import { RotateCcw, Home, AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  private handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#F7F9FA] p-6 text-center select-none dark:bg-[#0F172A]">
          <div className="w-full max-w-md rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900">
            {/* Mascot */}
            <div className="animate-float mb-4 flex justify-center">
              <DuoMascot mood="thinking" size={130} />
            </div>

            {/* Title & Message */}
            <h2 className="text-xl font-black text-slate-800 dark:text-white">
              น้องกุ้งนักดาบกำลังดูแลระบบให้คุณ!
            </h2>
            <p className="mt-2 text-xs font-bold text-slate-500 dark:text-slate-400">
              เกิดความผิดพลาดชั่วคราวในการแสดงผลหน้านี้ ไม่ต้องกังวล ข้อมูลการเรียนของคุณยังปลอดภัย
            </p>

            {/* Error detail */}
            {this.state.error && (
              <div className="mt-4 rounded-2xl bg-amber-50 border border-amber-200 p-3 text-left text-[11px] font-mono text-amber-900 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-300">
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>รายละเอียด:</span>
                </div>
                <p className="truncate">{this.state.error.message}</p>
              </div>
            )}

            {/* Action buttons */}
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={this.handleReset}
                className="w-full flex items-center justify-center gap-2 py-3 btn-duo-green text-xs"
              >
                <RotateCcw className="h-4 w-4" />
                <span>ลองใหม่อีกครั้ง</span>
              </button>

              <button
                onClick={this.handleGoHome}
                className="w-full flex items-center justify-center gap-2 py-3 btn-duo-blue text-xs"
              >
                <Home className="h-4 w-4" />
                <span>กลับสู่หน้าหลัก</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

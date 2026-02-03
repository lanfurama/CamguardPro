import { useState, useCallback } from 'react';
import { Camera } from '../types';

export function useReport(cameras: Camera[]) {
  const [reportLoading, setReportLoading] = useState(false);
  const [reportContent, setReportContent] = useState<string | null>(null);

  const generateReport = useCallback(async () => {
    setReportLoading(true);
    try {
      const res = await fetch('/api/ai/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cameras }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || data.detail || `HTTP ${res.status}`);
      }
      setReportContent(data.text ?? '');
    } catch (err) {
      console.error('generateReport failed:', err);
      setReportContent('Không thể tạo báo cáo. Vui lòng kiểm tra kết nối và cấu hình AI (Vertex / Gemini) rồi thử lại.');
    } finally {
      setReportLoading(false);
    }
  }, [cameras]);

  const clearReport = useCallback(() => setReportContent(null), []);

  return { reportLoading, reportContent, generateReport, clearReport };
}

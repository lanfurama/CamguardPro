import { useState, useCallback } from 'react';
import { Camera } from '../types';
import { generateSystemReport } from '../services/geminiService';

export function useReport(cameras: Camera[]) {
  const [reportLoading, setReportLoading] = useState(false);
  const [reportContent, setReportContent] = useState<string | null>(null);

  const generateReport = useCallback(async () => {
    setReportLoading(true);
    const text = await generateSystemReport(cameras);
    setReportContent(text);
    setReportLoading(false);
  }, [cameras]);

  const clearReport = useCallback(() => setReportContent(null), []);

  return { reportLoading, reportContent, generateReport, clearReport };
}

import { GoogleGenAI } from "@google/genai";
import { Camera } from "../types";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key not found in environment variables");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeCameraLogs = async (camera: Camera): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "Chưa cấu hình API Key. Vui lòng kiểm tra cài đặt.";

  const logText = camera.logs.map(l => `- [${l.date}] (${l.type}): ${l.description}`).join('\n');
  
  const prompt = `
    Bạn là một chuyên gia kỹ thuật hệ thống CCTV. Hãy phân tích lịch sử bảo trì sau đây của Camera: "${camera.name}" (Model: ${camera.model}, Hãng: ${camera.brand}).
    
    Lịch sử Log:
    ${logText}

    Ghi chú hiện tại: ${camera.notes}
    Trạng thái hiện tại: ${camera.status}

    Hãy đưa ra:
    1. Tóm tắt tình trạng sức khỏe của camera.
    2. Dự đoán các lỗi có thể xảy ra tiếp theo dựa trên lịch sử (nếu có).
    3. Đề xuất hành động bảo trì cụ thể tiếp theo.
    
    Trả lời ngắn gọn, chuyên nghiệp bằng tiếng Việt.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Không thể phân tích dữ liệu.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Đã xảy ra lỗi khi gọi AI. Vui lòng thử lại sau.";
  }
};

export const generateSystemReport = async (cameras: Camera[]): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "Chưa cấu hình API Key.";

  const offlineCameras = cameras.filter(c => c.status === 'OFFLINE');
  const maintenanceCameras = cameras.filter(c => c.status === 'MAINTENANCE');
  
  const prompt = `
    Hãy tạo báo cáo tổng quan hệ thống Camera giám sát.
    Tổng số camera: ${cameras.length}
    Số camera Offline (Mất tín hiệu): ${offlineCameras.length}
    Số camera đang bảo trì: ${maintenanceCameras.length}
    
    Danh sách camera Offline:
    ${offlineCameras.map(c => `- ${c.name} (IP: ${c.ip}, Property: ${c.propertyId})`).join('\n')}

    Đưa ra nhận định về độ ổn định của hệ thống và các khuyến nghị ưu tiên cho đội kỹ thuật. Trả lời bằng tiếng Việt, định dạng Markdown.
  `;

   try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Không tạo được báo cáo.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Lỗi hệ thống AI.";
  }
}

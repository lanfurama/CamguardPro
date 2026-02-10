<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

## CamGuard Pro

Quản lý hệ thống camera (site, zone, camera, lịch sử bảo trì) cho Furama và các site tương tự.  
Tối ưu cho team IT đang quản lý bằng file Excel.

## Quick start

1. Cài Node.js (>= 18) và PostgreSQL.
2. Clone project và cài package:

```bash
git clone <repo-url>
cd CamguardPro
npm install
```

3. Tạo file `.env.local` (tối thiểu):

```bash
GEMINI_API_KEY=your_gemini_api_key_here
DATABASE_URL=postgres://user:password@host:5432/dbname
```

4. Tạo database trống, chạy các script trong thư mục `database/` (schema + seed).
5. Chạy app:

```bash
npm run dev
```

Frontend + API sẽ chạy local (Vite + middleware).  
API chi tiết xem `docs/API.md`.

## Dùng cho team IT

- Cấu hình các site (Resort, Villas, Ariyana) và zone.
- Import / quản lý danh sách camera.
- Ghi nhận lỗi, thời gian sửa, kỹ thuật viên, solution.

So sánh trực tiếp với file Excel: `docs/SO_SANH_EXCEL_VS_CAMGUARDPRO.md`.

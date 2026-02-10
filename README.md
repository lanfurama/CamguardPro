<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

## CamGuard Pro

Ứng dụng quản lý hệ thống camera cho Furama (và các site tương tự), tập trung hoá dữ liệu camera, status, lịch sử bảo trì, và tích hợp AI để hỗ trợ phân tích / báo cáo.

### Tính năng chính

- Quản lý **Site / Property** (RESORT, VILLAS, ARIYANA, …) và **Zone** theo khu vực.
- CRUD **Camera**: IP, Brand, Model, vị trí, trạng thái, ghi chú, nhà cung cấp, v.v.
- Quản lý **maintenance logs**: lỗi, thời gian lỗi/sửa, lý do, kỹ thuật viên, giải pháp.
- Import danh sách camera từ **CSV / Excel (.xlsx)** theo checklist hiện tại của team IT.
- API REST chuẩn (`/api/cameras`, `/api/properties`, `/api/brands`, …) để tích hợp hệ thống khác.
- Tích hợp **Gemini / GenAI** cho các use case AI (báo cáo, phân tích, trợ lý IT).

### Tech stack

- React + Vite (SPA)
- Node.js / Vercel serverless (middleware + API)
- PostgreSQL (database chính)
- `@google/genai` cho tích hợp Gemini
- `xlsx` cho xử lý file Excel, `recharts` cho biểu đồ

## Yêu cầu hệ thống

- Node.js >= 18
- npm (hoặc pnpm/yarn, tuỳ chọn – hướng dẫn dưới đây dùng npm)
- PostgreSQL (local hoặc managed: RDS, Supabase, Neon, …)
- Tài khoản Google AI Studio và **Gemini API key**

## Cài đặt & chạy local

### 1. Clone & cài dependencies

```bash
git clone <repo-url>
cd CamguardPro
npm install
```

### 2. Cấu hình biến môi trường

Tạo file `.env.local` ở thư mục root (cùng mức với `package.json`):

```bash
cp .env.example .env.local   # nếu có sẵn
```

Hoặc tự tạo với nội dung tối thiểu:

```bash
GEMINI_API_KEY=your_gemini_api_key_here

# PostgreSQL – chọn 1 trong 2 cách
DATABASE_URL=postgres://user:password@host:5432/dbname
# Hoặc các biến DB_* nếu middleware hỗ trợ:
# DB_HOST=localhost
# DB_PORT=5432
# DB_USER=postgres
# DB_PASSWORD=password
# DB_NAME=camguardpro
```

### 3. Chuẩn bị database

- Tạo database trống cho CamGuard Pro trong Postgres.
- Chạy các script trong thư mục `database/` (schema + seed camera) theo thứ tự bạn mong muốn.
- Đảm bảo `DATABASE_URL` (hoặc `DB_*`) trong `.env.local` trỏ đúng database này.

### 4. Chạy dev server (frontend + API)

```bash
npm run dev
```

- Vite dev server sẽ chạy trên port mặc định (VD: `http://localhost:5173`).
- API dev sẽ được proxy qua middleware tới `http://localhost:3000/api` (chi tiết trong `docs/API.md`).

## Scripts hữu ích

```bash
npm run dev        # Dev mode: Vite + middleware API
npm run dev:full   # Dev qua vercel dev (mô phỏng serverless đầy đủ)
npm run build      # Build frontend + build API bundle
npm run build:api  # Chỉ build phần API
npm run preview    # Preview production build
```

## API & tích hợp

- Tài liệu chi tiết xem trong `docs/API.md` (tiếng Việt, đầy đủ request/response).
- Một số endpoint chính:
  - `GET /api/health` – health check + trạng thái DB.
  - `GET/POST/PUT/PATCH/DELETE /api/cameras` – quản lý camera.
  - `GET/POST/PUT/DELETE /api/properties` – quản lý site/toà nhà.
  - `GET/POST/DELETE /api/brands` – quản lý hãng camera.

## Luồng sử dụng gợi ý (team IT Furama)

- Bước 1: Cấu hình **3 property** cho Furama (Resort, Villas, Ariyana) và các zone tương ứng.
- Bước 2: Import danh sách camera từ file CSV/Excel theo checklist hiện tại.
- Bước 3: Sử dụng màn hình camera list để:
  - Lọc theo site/zone, theo dõi status, xem nhanh IP/Brand/Model.
  - Cập nhật ghi chú, thêm maintenance log khi có sự cố/sửa chữa.
- Bước 4: Dùng các tính năng AI (nếu có) để tổng hợp báo cáo / đề xuất.

Chi tiết so sánh với file Excel hiện tại của team IT xem thêm trong `docs/SO_SANH_EXCEL_VS_CAMGUARDPRO.md`.

## Deploy (gợi ý: Vercel)

- Project đã sẵn sàng deploy lên Vercel:
  - Kết nối repo với Vercel.
  - Đặt biến môi trường (`GEMINI_API_KEY`, `DATABASE_URL`, …) trên dashboard Vercel.
  - Build command: `npm run build`
  - Output: sử dụng cấu hình mặc định của Vite + Vercel (không cần cấu hình phức tạp).

Sau khi deploy, frontend và API `/api/*` sẽ được phục vụ qua cùng domain (mô hình serverless).

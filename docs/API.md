# CamGuard Pro – Tài liệu API

Tài liệu danh sách API dùng cho ứng dụng CamGuard Pro. API chạy qua middleware khi dev (`npm run dev`) hoặc qua serverless khi deploy (Vercel).

---

## Thông tin chung

| Mục | Giá trị |
|-----|--------|
| **Base URL** | `http://localhost:3000` (dev) hoặc domain deploy |
| **Prefix** | `/api` |
| **Content-Type** | `application/json` |
| **Charset** | UTF-8 |

### Headers gửi đi

- `Content-Type: application/json` (bắt buộc với POST, PUT, PATCH)

### Định dạng lỗi

Khi `status >= 400`, body thường có dạng:

```json
{
  "error": "Mô tả lỗi bằng tiếng Việt"
}
```

---

## 1. Health Check

### `GET /api/health`

Kiểm tra API và kết nối database. **Không cần** database đã cấu hình.

**Response 200**

```json
{
  "ok": true,
  "service": "CamGuard Pro API",
  "timestamp": "2026-02-02T00:00:00.000Z",
  "database": "connected"
}
```

Khi database chưa cấu hình hoặc lỗi:

```json
{
  "ok": false,
  "service": "CamGuard Pro API",
  "timestamp": "2026-02-02T00:00:00.000Z",
  "database": "disconnected",
  "databaseError": "DATABASE_URL chưa cấu hình"
}
```

---

## 2. Cameras (Camera)

### `GET /api/cameras`

Lấy danh sách tất cả camera.

**Response 200**

- Body: mảng `Camera[]` (có thể là `[]` nếu chưa có dữ liệu).

**Response 500**

- Lỗi đọc database/view (ví dụ thiếu view `v_cameras_full`).

---

### `POST /api/cameras` – Tạo 1 camera

Tạo một camera mới.

**Body**

```json
{
  "camera": {
    "id": "CAM_001",
    "propertyId": "PROP_RESORT",
    "zone": "FO LOBBY 1",
    "name": "Cam Sảnh 1",
    "location": "Cổng chính",
    "ip": "192.168.1.10",
    "brand": "Hikvision",
    "model": "DS-2CD2043",
    "specs": "4MP, IR 30m",
    "supplier": "Nhà cung cấp",
    "status": "ONLINE",
    "consecutiveDrops": 0,
    "lastPingTime": 1706789000000,
    "notes": "",
    "logs": []
  }
}
```

| Trường | Bắt buộc | Mô tả |
|--------|----------|--------|
| `propertyId` | Có | ID toà nhà (phải tồn tại trong `properties`) |
| `zone` | Có | Tên khu vực (sẽ map tới `property_zones`) |
| `name` | Có | Tên camera |
| `ip` | Có | Địa chỉ IP |
| `brand` | Có | Hãng camera |
| `status` | Không | `ONLINE` \| `OFFLINE` \| `MAINTENANCE` \| `WARNING`, mặc định `ONLINE` |
| `id` | Không | Nếu không gửi, server tự sinh |
| Các trường còn lại | Không | Có thể để rỗng/0 |

**Response 201**

- Body: object `Camera` vừa tạo (đã có `id`, `logs`, v.v.).

**Response 400**

- `{ "error": "Thiếu camera hoặc cameras" }`

---

### `POST /api/cameras` – Import nhiều camera

Import một lúc nhiều camera.

**Body**

```json
{
  "cameras": [
    {
      "propertyId": "PROP_RESORT",
      "zone": "BEACH 1",
      "name": "Cam Beach 1",
      "ip": "192.168.1.20",
      "brand": "Dahua",
      "model": "IPC-HFW2431S",
      "status": "ONLINE",
      "consecutiveDrops": 0,
      "lastPingTime": 1706789000000,
      "notes": "",
      "logs": []
    }
  ]
}
```

**Response 201**

- Body: mảng `Camera[]` các camera đã tạo.

**Response 400**

- `{ "error": "Thiếu camera hoặc cameras" }`

---

### `PUT /api/cameras/:id`

Cập nhật toàn bộ thông tin một camera.

**URL**

- `:id` = ID camera (encode URI nếu có ký tự đặc biệt).

**Body**

- Object `Camera` đầy đủ (phải có `id` trùng với `:id`).

**Response 200**

- Body: object `Camera` sau khi cập nhật.

**Response 400**

- `{ "error": "ID không khớp" }` khi `body.id !== :id`.

---

### `PATCH /api/cameras/:id`

Chỉ cập nhật ghi chú (notes) của camera.

**Body**

```json
{
  "notes": "Nội dung ghi chú mới"
}
```

**Response 200**

```json
{
  "ok": true
}
```

**Response 400**

- `{ "error": "Thiếu notes" }` khi không gửi hoặc `notes` không phải string.

---

### `DELETE /api/cameras/:id`

Xoá một camera theo ID.

**Response 200**

```json
{
  "ok": true
}
```

---

## 3. Properties (Toà nhà / Cơ sở)

### `GET /api/properties`

Lấy danh sách tất cả toà nhà (property) kèm zones.

**Response 200**

- Body: mảng `Property[]`.

Ví dụ:

```json
[
  {
    "id": "PROP_RESORT",
    "name": "Furama Resort",
    "address": "Furama Resort Danang",
    "manager": "IT",
    "zones": ["ART ROOM 1", "BEACH 1", "FO LOBBY 1"]
  }
]
```

---

### `POST /api/properties`

Tạo toà nhà mới.

**Body**

```json
{
  "id": "PROP_NEW",
  "name": "Toà nhà mới",
  "address": "Địa chỉ",
  "manager": "Người quản lý",
  "zones": ["Zone A", "Zone B"]
}
```

| Trường | Bắt buộc | Mô tả |
|--------|----------|--------|
| `name` | Có | Tên toà nhà |
| `id` | Không | Nếu không gửi, server tự sinh |
| `address`, `manager` | Không | Có thể rỗng |
| `zones` | Không | Mảng tên khu vực |

**Response 201**

- Body: object `Property` vừa tạo.

---

### `PUT /api/properties/:id`

Cập nhật toà nhà. Body là object `Property` đầy đủ, `id` phải trùng `:id`.

**Response 200**

- Body: object `Property` sau khi cập nhật.

**Response 400**

- `{ "error": "ID không khớp" }`

---

### `DELETE /api/properties/:id`

Xoá toà nhà. Chỉ xoá được khi **không còn camera** nào thuộc toà nhà đó.

**Response 200**

```json
{
  "ok": true
}
```

**Response 400**

- `{ "error": "Không thể xoá toà nhà đang chứa Camera." }`

---

## 4. Brands (Hãng camera)

### `GET /api/brands`

Lấy danh sách tên hãng camera.

**Response 200**

- Body: mảng string, ví dụ `["Hikvision", "Dahua", "Axis"]`.

---

### `POST /api/brands`

Thêm một hãng mới.

**Body**

```json
{
  "name": "Tên hãng"
}
```

**Response 201**

- Body: mảng string **toàn bộ** brands sau khi thêm (đã sort).

**Response 400**

- `{ "error": "Thiếu tên hãng" }` khi `name` rỗng/thiếu.

---

### `DELETE /api/brands/:name`

Xoá một hãng theo tên. `:name` cần encode URI (ví dụ khoảng trắng → `%20`).

**Response 200**

```json
{
  "ok": true
}
```

---

## 5. Kiểu dữ liệu (Types)

### Camera

```ts
{
  id: string;
  propertyId: string;
  zone: string;
  name: string;
  location: string;
  ip: string;
  brand: string;
  model: string;
  specs: string;
  supplier: string;
  status: "ONLINE" | "OFFLINE" | "MAINTENANCE" | "WARNING";
  consecutiveDrops: number;
  lastPingTime: number;   // epoch milliseconds
  notes: string;
  logs: MaintenanceLog[];
}
```

### MaintenanceLog

```ts
{
  id: string;
  date: string;           // YYYY-MM-DD
  description: string;
  technician?: string;
  type: "REPAIR" | "CHECKUP" | "INSTALLATION";
}
```

### Property

```ts
{
  id: string;
  name: string;
  address: string;
  manager: string;
  zones: string[];        // Danh sách tên khu vực
}
```

---

## 6. Mã lỗi HTTP

| Mã | Ý nghĩa |
|----|--------|
| 200 | Thành công |
| 201 | Tạo mới thành công |
| 400 | Dữ liệu không hợp lệ (thiếu field, ID không khớp, v.v.) |
| 404 | Không tìm thấy route |
| 405 | Method không được phép (vd: GET lên route chỉ hỗ trợ POST) |
| 500 | Lỗi server (database, view, exception) |
| 503 | Database chưa cấu hình (`.env` thiếu `DATABASE_URL` hoặc `DB_*`) |

---

## 7. Danh sách nhanh (Quick reference)

| Method | Path | Mô tả |
|--------|------|--------|
| GET | `/api/health` | Health check + DB status |
| GET | `/api/cameras` | Danh sách camera |
| POST | `/api/cameras` | Tạo 1 camera (`body.camera`) hoặc import (`body.cameras`) |
| PUT | `/api/cameras/:id` | Cập nhật camera |
| PATCH | `/api/cameras/:id` | Cập nhật ghi chú |
| DELETE | `/api/cameras/:id` | Xoá camera |
| GET | `/api/properties` | Danh sách toà nhà |
| POST | `/api/properties` | Tạo toà nhà |
| PUT | `/api/properties/:id` | Cập nhật toà nhà |
| DELETE | `/api/properties/:id` | Xoá toà nhà (khi không còn camera) |
| GET | `/api/brands` | Danh sách hãng |
| POST | `/api/brands` | Thêm hãng |
| DELETE | `/api/brands/:name` | Xoá hãng |

---

*Tài liệu cập nhật theo code CamGuard Pro (dev-server + types).*

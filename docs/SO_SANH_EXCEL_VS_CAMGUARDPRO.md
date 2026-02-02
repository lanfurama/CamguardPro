# So sánh: Check list Camera All Site.xlsx vs CamguardPro

## 1. Cấu trúc file Excel (team IT đang dùng)

### Các sheet camera chính (cập nhật 01/1/2026)
| Sheet    | Mô tả                 | Số camera (ghi trên file) |
|----------|------------------------|----------------------------|
| RESORT   | Furama Resort          | 130 camera                 |
| VILLAS   | Furama Villas          | 84 camera                  |
| ARIYANA  | Ariyana Centre         | 81 camera                  |

### Cột dữ liệu trong Excel

**RESORT:** No, **Position**, **Status**, NEW, **Error Time**, **FixedTime**, **Reason**, **Done By**, **Solution**  
**VILLAS / ARIYANA:** No, **Position**, NEW, **Error Time**, **FixedTime**, **Reason**, **Done By**, **Solution**

- **Position:** vị trí camera (VD: ICP LOBBY, DANANG 1L, P05, R29, Hành Lang…)
- **Status (chỉ RESORT):** Ok, Nghi mất hồng ngoại, Mất hồng ngoại…
- **Error Time / FixedTime:** thời gian lỗi / thời gian sửa
- **Reason / Done By / Solution:** lý do, người sửa, cách xử lý

**Excel không có:** IP, Brand, Model, Zone (chỉ có Position), đơn vị quản lý (site) là tên sheet.

---

## 2. Database & codebase CamguardPro

### Bảng chính
- **properties:** id, name, address, manager (tương đương “site” trong Excel)
- **property_zones:** property_id, name (khu vực trong từng site)
- **cameras:** id, property_id, zone_id, name, location, **ip**, **brand**, **model**, specs, supplier, **status** (ONLINE/OFFLINE/MAINTENANCE/WARNING), notes, **is_new** (Excel "NEW"), …
- **maintenance_logs:** camera_id, log_date, **error_time**, **fixed_time**, description, **reason**, **solution**, technician (Done By), type (REPAIR/CHECKUP/INSTALLATION)

### Tính năng hiện có
- Quản lý Site (property) + Zone (khu vực)
- CRUD camera: Tên, IP, Zone, Hãng, Model, Vị trí, Nhà cung cấp, Status, Ghi chú
- Lịch sử bảo trì: ngày, mô tả, kỹ thuật viên, loại (Sửa chữa/Bảo trì/Lắp đặt)
- Import camera từ CSV (Tên, IP, Mã Toà Nhà, Khu Vực, Hãng, Model)
- Danh sách camera, lọc theo site, tìm kiếm, mô phỏng ping, báo cáo AI

---

## 3. Đối chiếu: Excel vs CamguardPro

| Nhu cầu từ Excel              | CamguardPro có đáp ứng? | Ghi chú |
|------------------------------|--------------------------|--------|
| Quản lý theo **Site**        | Có                       | Property = 1 site (RESORT/VILLAS/ARIYANA). Cần tạo 3 property tương ứng nếu chưa có. |
| **Position** (vị trí camera) | Có                       | Map vào **Zone** hoặc **Location** (hoặc cả hai: zone = khu vực, location = mô tả chi tiết). |
| **Status** (Ok / lỗi…)       | Một phần                 | App dùng ONLINE/OFFLINE/MAINTENANCE/WARNING. Mô tả chi tiết (VD: “Mất hồng ngoại”) nên ghi vào **Notes** hoặc maintenance log. |
| **Error Time / Fixed Time**  | Có                 | Bảng **maintenance_logs** có **error_time**, **fixed_time** (TIMESTAMPTZ).“Error: … / Fixed: …”  |
| **Reason / Done By / Solution** | Có                    | **reason**, **solution** (maintenance_logs), **technician** (Done By). Cột **description** vẫn dùng cho mô tả chung. |
| Quản lý **IP, Brand, Model** | Có                       | Excel không có; CamguardPro đáp ứng tốt hơn khi IT muốn quản lý tài sản đầy đủ. |
| Import từ **file Excel**     | Chưa                     | Hiện chỉ import **CSV** (paste). Muốn import trực tiếp file .xlsx (3 sheet) cần thêm tính năng import Excel. |

---

## 4. Kết luận

- **Về nghiệp vụ:** CamguardPro **đáp ứng** cách làm hiện tại của team IT:
  - Site → Property
  - Position → Zone / Location
  - Error/Fix/Reason/Done By/Solution → Maintenance logs + Notes

- **Cần bổ sung / cấu hình:**
  1. Tạo 3 property: Furama Resort, Furama Villas, Ariyana Centre (và zone tương ứng từ danh sách Position trong Excel).
  2. Quy ước map Status Excel → Status app (VD: Ok → ONLINE, có lỗi chưa sửa → WARNING, đang sửa → MAINTENANCE) và ghi chi tiết vào Notes.
  3. (Tùy chọn) Thêm tính năng **Import từ file Excel** để đưa nhanh checklist hiện tại vào CamguardPro (map sheet → property, Position → zone/name, Status → cameras.status, NEW → cameras.is_new, Error Time/FixedTime/Reason/Done By/Solution → maintenance_logs).

**Tóm tắt:** Project **có đáp ứng** nhu cầu quản lý từ file “Check list Camera All Site.xlsx”, và còn mạnh hơn nhờ quản lý IP/Brand/Model + zone + maintenance. ---

## 5. Đã triển khai (theo đề xuất)

1. **3 Property + Cameras từ Excel** — File seed: `database/seed-furama-sites.sql`: 3 properties (PROP_RESORT, PROP_VILLAS, PROP_ARIYANA); mỗi **Position** trong Excel = 1 zone + 1 camera (insert vào `cameras`). Chạy sau `schema.sql`: `psql -f database/seed-furama-sites.sql`.
2. **Map Status Excel → App + Ghi chú** — Trong `constants.ts`: `STATUS_EXCEL_MAP`. Khi import Excel, Reason/Solution/Error Time/FixedTime/Done By gộp vào Notes và tạo maintenance log nếu có.
3. **Import từ file Excel (.xlsx)** — Trong **Import Camera** có tab **Excel (.xlsx)**; chọn file có 3 sheet RESORT, VILLAS, ARIYANA. Cần chạy `seed-furama-sites.sql` trước.

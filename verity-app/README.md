# Verity App

React + Vite project sử dụng [Verity Design System](../Verity%20Design%20System/).

## Dev

```bash
npm run dev
# http://localhost:5173
```

## Design Sync — kiểm tra design có đổi + UI có còn khớp không

### So sánh local vs cloud (claude.ai/design) — nguồn chính xác nhất:

```bash
npm run design:diff:cloud
```
So sánh local `_ds_manifest.json` vs bản mới nhất fetch từ cloud project **Verity Design System** trên claude.ai/design.
Cache cloud được lưu tại `scripts/.cloud-manifest-cache.json`.

Để **refresh cache cloud** (lấy bản mới nhất từ claude.ai/design), hỏi Claude Code:
> "cập nhật cloud cache và kiểm tra design đổi gì không"

Claude sẽ fetch `_ds_manifest.json` qua DesignSync và chạy diff tự động.

```bash
npm run design:diff:cloud --summary   # chỉ in 1 dòng tóm tắt
npm run design:check:cloud            # diff cloud + test UI luôn
```

### So sánh local vs git HEAD (cho workflow commit-based):

```bash
npm run design:diff
```
So sánh `_ds_manifest.json` hiện tại vs commit HEAD, in ra chính xác token nào đổi giá trị, thêm, xoá.

```bash
npm run design:diff --summary   # chỉ in 1 dòng tóm tắt
```

### Chạy cả 2: diff design rồi test UI luôn:

```bash
npm run design:check
```
Nếu design không đổi → chạy Playwright test. Nếu design đổi → dừng lại báo cáo, không test.

### Kiểm tra UI có khớp design không (không quan tâm design đổi hay chưa):

```bash
npm run test:design
```

Chạy xong và mở HTML report (pass/fail + screenshot khi fail):

```bash
npm run test:design:report
```

Mở report lần chạy cuối mà không chạy lại test:

```bash
npx playwright show-report
```

Khi design thay đổi intentional — commit design mới rồi update baseline:

```bash
# 1. commit file design đã đổi
git add "Verity Design System/" && git commit -m "design: ..."

# 2. update Playwright baseline
npm run test:design:update
```

### Cách test hoạt động

- Playwright start server riêng trên port **5174** (dev server vẫn chạy bình thường trên 5173)
- 13 test kiểm tra từng property CSS theo đúng spec trong `Tạo trang login/design_handoff_login/README.md`
- Khi fail: terminal báo chính xác property nào sai, giá trị expected vs received
- Report HTML ở `playwright-report/index.html` — có screenshot page tại thời điểm fail

### Thêm test cho page mới

Tạo file `tests/<ten-page>.spec.js` theo pattern của [tests/login.spec.js](tests/login.spec.js).

# Verity App

React + Vite project sử dụng [Verity Design System](../Verity%20Design%20System/).

## Dev

```bash
npm run dev
# http://localhost:5173
```

## Design Sync — kiểm tra UI có khớp design không

Mỗi khi thay đổi UI, chạy lệnh này để kiểm tra có lệch design không:

```bash
npm run test:design
```

Chạy xong và mở HTML report luôn (pass/fail + screenshot khi fail):

```bash
npm run test:design:report
```

Hoặc mở report của lần chạy cuối mà không cần chạy lại test:

```bash
npx playwright show-report
```

Khi design thay đổi (intentional), cập nhật baseline:

```bash
npm run test:design:update
```

### Cách test hoạt động

- Playwright start server riêng trên port **5174** (dev server vẫn chạy bình thường trên 5173)
- 13 test kiểm tra từng property CSS theo đúng spec trong `Tạo trang login/design_handoff_login/README.md`
- Khi fail: terminal báo chính xác property nào sai, giá trị expected vs received
- Report HTML ở `playwright-report/index.html` — có screenshot page tại thời điểm fail

### Thêm test cho page mới

Tạo file `tests/<ten-page>.spec.js` theo pattern của [tests/login.spec.js](tests/login.spec.js).

# Verity App

React + Vite project sử dụng [Verity Design System](../Verity%20Design%20System/).

## Dev

```bash
npm run dev
# http://localhost:5173
```

---

## Design Sync — kiểm tra design có đổi + UI có còn khớp không

### Tổng quan luồng

```
claude.ai/design  ──(DesignSync)──▶  .cloud-manifest-cache.json
                                               │
                                    design:diff:cloud
                                               │
                              local _ds_manifest.json
                                               │
                                        test:design
                                               │
                                    Playwright CSS tests
```

Có 2 nguồn so sánh:
| Nguồn | Lệnh | Khi nào dùng |
|-------|------|-------------|
| **Cloud** (claude.ai/design) | `design:diff:cloud` | Khi designer vừa cập nhật design trên cloud |
| **Git HEAD** | `design:diff` | Khi muốn xem local có uncommitted changes so với lần commit cuối |

---

### Workflow thông thường

#### 1. Designer cập nhật design trên claude.ai/design

> **Lưu ý:** DesignSync chỉ chạy được bên trong Claude Code — không có lệnh terminal nào thay thế.
> `npm run design:diff:cloud` chỉ so sánh với **cache cũ**, không tự fetch mới từ cloud.

**Để lấy bản mới nhất từ cloud**, dùng slash command trong Claude Code:
```
/sync-design
```
Claude sẽ tự động:
1. Fetch `_ds_manifest.json` mới nhất từ cloud qua DesignSync
2. Ghi đè `scripts/.cloud-manifest-cache.json`
3. Chạy `design:diff:cloud` và in ra token/component nào thay đổi

Sau khi `/sync-design` xong, có thể chạy thêm:
```bash
npm run design:diff:cloud   # xem lại diff với cache vừa fetch
npm run test:design         # test UI nếu có thay đổi
```

#### 2. Kiểm tra luôn UI code có còn khớp với cloud design không:

```bash
npm run design:check:cloud
```
→ Diff cloud trước, nếu không có gì đổi thì chạy Playwright test UI.

#### 3. Khi design đổi intentional — cập nhật local rồi đồng bộ:

```bash
# Chỉnh sửa file trong "Verity Design System/" cho khớp với cloud
# Sau đó commit
git add "Verity Design System/" && git commit -m "design: update <tên token/component>"

# Test lại UI
npm run test:design
```

---

### Tất cả lệnh

#### Sync từ cloud (dùng trong Claude Code chat)

```
/sync-design    # fetch cloud manifest → update cache → chạy diff
```

> DesignSync chỉ chạy được trong Claude Code. Đây là lệnh duy nhất để lấy bản mới nhất từ cloud.

#### Design diff (dùng trong terminal)

```bash
npm run design:diff:cloud          # local vs cloud cache (phải /sync-design trước)
npm run design:diff:cloud:summary  # chỉ 1 dòng tóm tắt
npm run design:diff                # local vs git HEAD
npm run design:diff:summary        # chỉ 1 dòng tóm tắt
```

#### Design check (diff + test UI)

```bash
npm run design:check:cloud   # diff cloud cache → test Playwright
npm run design:check         # diff HEAD → test Playwright
```

#### Test UI

```bash
npm run test:design          # chạy 13 Playwright CSS tests
npm run test:design:report   # chạy xong mở HTML report
npx playwright show-report   # mở report lần cuối (không chạy lại)
npm run test:design:update   # update baseline sau khi đổi design intentional
```

---

### Cloud cache

File `scripts/.cloud-manifest-cache.json` là bản manifest fetch từ cloud, lưu kèm timestamp:
```json
{ "_cloudSyncedAt": "2026-07-03T...", "_cloudProjectId": "e79fdf30-..." }
```

- **Không commit** file này (đã có trong `.gitignore`)
- Để refresh: dùng `/sync-design` trong Claude Code — tự fetch + diff luôn

---

### Cách test hoạt động

- Playwright start server riêng trên port **5174** (dev server vẫn chạy bình thường trên 5173)
- 13 test kiểm tra từng property CSS theo đúng spec trong `Tạo trang login/design_handoff_login/README.md`
- Khi fail: terminal báo chính xác property nào sai, giá trị expected vs received
- Report HTML ở `playwright-report/index.html` — có screenshot page tại thời điểm fail

### Thêm test cho page mới

Tạo file `tests/<ten-page>.spec.js` theo pattern của [tests/login.spec.js](tests/login.spec.js).

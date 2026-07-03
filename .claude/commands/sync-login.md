Sync the Login page design spec from cloud and show what changed.

1. Ask the user to:
   - Open their claude.ai project containing the login design
   - Find `Login.dc.html` (or the latest login page design file)
   - Copy its full content and paste it here

2. Wait for the user to paste the content.

3. Read the current `Tạo trang login/design_handoff_login/spec.json` and `Tạo trang login/design_handoff_login/README.md` to understand the existing spec baseline.

4. Carefully read the pasted HTML and extract any spec values that differ from `spec.json`. Focus on measurable values:
   - Layout: card width, padding, border-radius, shadow
   - Typography: font sizes, font weights, colors (as token names)
   - Spacing: gaps, margins between sections
   - Components: button heights, variants, states
   - Any new sections or removed sections

5. If spec values changed:
   - Update `Tạo trang login/design_handoff_login/spec.json` with the new values
   - Also overwrite `Tạo trang login/design_handoff_login/Login.dc.html` with the pasted content
   - Run `npm run design:diff:login` from `verity-app/` to show the diff

6. If nothing changed, say "Login page spec unchanged" and stop.

7. After showing the diff, remind the user to update `verity-app/src/pages/LoginPage.jsx` and `verity-app/tests/login.spec.js` to match the new spec, then run `npm run test:design`.

Sync the Login page design spec from cloud and show what changed.

1. Read `scripts/.login-project-id` to get the login projectId. If the file is missing, tell the user to create it at the project root (`scripts/.login-project-id`) containing the claude.ai/design project ID for the login project, then stop.

2. Try `DesignSync(get_file)` with that projectId and `path: "Login.dc.html"`.

   **If DesignSync succeeds:** use the returned content as the HTML source. Go to step 3.

   **If DesignSync fails (auth error):** tell the user in one line ("DesignSync unavailable — please paste Login.dc.html"), then:
   - Ask them to open https://claude.ai/design, go to the login project, find `Login.dc.html`, copy full content, and paste here.
   - Wait for paste, use that content. Go to step 3.

3. Read current `Tạo trang login/design_handoff_login/spec.json` and `Tạo trang login/design_handoff_login/README.md` as baseline.

4. From the HTML content, extract spec values that differ from `spec.json`. Focus on measurable values:
   - Layout: card width, padding, border-radius, shadow
   - Typography: font sizes, font weights, colors (as token names)
   - Spacing: gaps, margins between sections
   - Components: button heights, variants, states
   - Any new sections or removed sections

5. If spec values changed:
   - Update `Tạo trang login/design_handoff_login/spec.json` with the new values
   - Also overwrite `Tạo trang login/design_handoff_login/Login.dc.html` with the fetched content
   - Run `npm run design:diff:login` from `verity-app/` to show the diff
   - Run `npm run design:gen-tests:login` from `verity-app/` to auto-add stub tests for any new spec sections
   - Append an entry to `scripts/sync-login.log` in this format:
     ```
     [2026-07-03T10:00:00.000Z] Login page spec synced — 3 changes
       CHANGED  components.signInButton.height  44 → 48
       ADDED    components.footer.text  "Need help?"
       REMOVED  components.divider.gap  --space-3
     ```
     Use the actual ISO timestamp and actual changed fields. Append, never overwrite.

6. If nothing changed:
   - Run `npm run design:gen-tests:login` from `verity-app/` anyway (catches any previously-missed spec sections)
   - Append a one-line entry to `scripts/sync-login.log`: `[<timestamp>] No changes`
   - Say "Login page spec unchanged" and stop.

7. After showing the diff, tell the user: stub tests have been added to `login.spec.js` for any new spec sections — implement them in `LoginPage.jsx` then replace the stubs with real assertions and run `npm run test:design`.

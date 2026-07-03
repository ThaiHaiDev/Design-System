Sync the Verity Design System manifest from cloud and run diff to show what changed.

1. Read `scripts/.cloud-project-id` to get the projectId. If missing, tell user to create it and stop.

2. Try `DesignSync(get_file)` with that projectId and `path: "_ds_manifest.json"`.

   **If DesignSync succeeds:** skip to step 4.

   **If DesignSync is unavailable or fails:** tell the user in one line ("DesignSync unavailable — please paste the manifest"), then ask them to:
   - Open https://claude.ai/design → Verity Design System project → find `_ds_manifest.json` → copy full JSON → paste here.
   - Wait for the paste, use that content for step 3.

3. Parse the manifest JSON. Add `"_cloudSyncedAt": "<current ISO timestamp>"` and `"_cloudProjectId": "<projectId>"`. Write to `scripts/.cloud-manifest-cache.json`.

4. Run `npm run design:diff:cloud` from `verity-app/` and show output.

5. One-line summary: what changed, or "no changes".

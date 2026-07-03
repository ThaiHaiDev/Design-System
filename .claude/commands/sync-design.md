Fetch the latest `_ds_manifest.json` from the Verity Design System cloud project on claude.ai/design, update the local cache, then run the diff to show what changed.

Steps:
1. Read `scripts/.cloud-project-id` to get the projectId. If the file doesn't exist, tell the user to create it with their claude.ai/design project ID (one line, no whitespace) and stop.

2. Try to call `DesignSync(get_file)` with that `projectId` and `path: "_ds_manifest.json"`.

   **If DesignSync succeeds:** go to step 3.

   **If DesignSync fails with an auth error** (status 400, "needs a claude.ai login"):
   - Tell the user DesignSync requires a claude.ai subscription login which isn't available in this environment.
   - Ask them to do the following manually:
     1. Open https://claude.ai/design and go to the Verity Design System project
     2. Find the file `_ds_manifest.json` in the project files
     3. Copy its full JSON content
     4. Paste it here in the chat
   - Wait for the user to paste the JSON content, then use that as the manifest (go to step 3).

3. Parse the manifest JSON, add these two fields:
   - `"_cloudSyncedAt": "<current ISO timestamp>"`
   - `"_cloudProjectId": "<projectId>"`

   Write the result to `scripts/.cloud-manifest-cache.json` using the Write tool.

4. Run `npm run design:diff:cloud` from inside the `verity-app/` directory using PowerShell and show the output.

5. Report what changed (or confirm no changes).

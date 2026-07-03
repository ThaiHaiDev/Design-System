Fetch the latest `_ds_manifest.json` from the Verity Design System cloud project on claude.ai/design, update the local cache, then run the diff to show what changed.

Steps:
1. Read `scripts/.cloud-project-id` to get the projectId. If the file doesn't exist, tell the user to create it with their claude.ai/design project ID (one line, no whitespace) and stop.
2. Call `DesignSync(get_file)` with that `projectId` and `path: "_ds_manifest.json"` to get the latest manifest from the cloud.
3. Parse the returned content as JSON, add `"_cloudSyncedAt": "<current ISO timestamp>"` and `"_cloudProjectId": "<projectId>"` fields to it, then write the result to `scripts/.cloud-manifest-cache.json` using the Write tool.
4. Run `cd verity-app && npm run design:diff:cloud` using the PowerShell tool and show the output.
5. Report what changed (or confirm no changes).

Fetch the latest `_ds_manifest.json` from the Verity Design System cloud project on claude.ai/design, update the local cache, then run the diff to show what changed.

Steps:
1. Call `DesignSync(get_file)` with `projectId: "e79fdf30-4d78-4ff2-ae01-05e29c65acdd"` and `path: "_ds_manifest.json"` to get the latest manifest from the cloud.
2. Parse the returned content as JSON, add `"_cloudSyncedAt": "<current ISO timestamp>"` and `"_cloudProjectId": "e79fdf30-4d78-4ff2-ae01-05e29c65acdd"` fields to it, then write the result to `scripts/.cloud-manifest-cache.json` using the Write tool.
3. Run `cd verity-app && npm run design:diff:cloud` using the PowerShell tool and show the output.
4. Report what changed (or confirm no changes).

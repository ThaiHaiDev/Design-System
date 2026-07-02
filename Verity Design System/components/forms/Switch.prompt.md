Switch toggles a setting on/off immediately (no submit step) — use in settings panels, not forms with a Save button.

```jsx
<Switch label="Email notifications" checked={enabled} onChange={e => setEnabled(e.target.checked)} />
```

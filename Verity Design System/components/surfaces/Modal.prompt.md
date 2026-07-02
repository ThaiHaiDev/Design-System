Modal for focused tasks that interrupt the page flow — confirmations, forms, detail edits.

```jsx
<Modal open={isOpen} onClose={close} title="Delete project?" footer={<>
  <Button variant="secondary" onClick={close}>Cancel</Button>
  <Button variant="destructive" onClick={confirm}>Delete</Button>
</>}>
  This can't be undone.
</Modal>
```

Sizes: sm 400px, md 560px, lg 720px. Overlay is 50% black (70% in dark mode).

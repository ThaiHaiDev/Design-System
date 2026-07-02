Button triggers an action or navigation; use `primary` for the one main CTA per view, `secondary`/`ghost` for supporting actions, `destructive` for irreversible ones.

```jsx
<Button variant="primary" size="md" onClick={handleSave}>Save changes</Button>
<Button variant="secondary" size="md">Cancel</Button>
```

Variants: primary (filled accent), secondary (outlined), ghost (text-only), destructive (red fill). Sizes: sm 32px, md 36px, lg 44px. Set `disabled` to gray it out — never rely on opacity alone for critical disabled text.

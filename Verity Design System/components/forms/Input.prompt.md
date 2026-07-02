Input is the standard text field for forms — labels, helper text, and error states included.

```jsx
<Input label="Email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} />
<Input label="Password" type="password" error="Password is required" />
```

Sizes: md (36px, default), lg (44px, for prominent forms like login). Focus ring uses accent-primary-subtle. Error replaces helperText and turns the border red.

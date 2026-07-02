Sidebar is the primary app navigation rail. Collapses to an icon-only 64px rail on smaller viewports.

```jsx
<Sidebar
  items={[{id:"home", label:"Home", icon:"⌂"}, {id:"settings", label:"Settings", icon:"⚙"}]}
  activeId="home"
  onSelect={setActiveId}
/>
```

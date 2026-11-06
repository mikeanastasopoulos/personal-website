# Spyros Frontend Engineering Conventions

Author: Σπύρος
Version: 3.4

---

# 1. Engineering Philosophy

- Code is a long-term asset.
- Every line must justify its existence.
- Clarity > cleverness.
- Simplicity > flexibility.
- Explicitness > magic.
- Consistency is mandatory.

---

# 2. Core Principles

- Strong separation of concerns
- Predictable systems
- Minimal but sufficient abstractions
- No unnecessary complexity

---

# 3. SOLID Principles (Frontend)

## Single Responsibility

- One responsibility per component
- UI renders only UI
- Logic lives outside
- Presentational components receive display-ready props only
- Presentational components must not know API/domain objects unless the full object is the actual UI contract

## Open / Closed

- Extend via composition
- Avoid conditional explosion

## Liskov Substitution

- Components behave consistently
- No hidden side effects

## Interface Segregation

- No unnecessary props
- No “god props”
- Do not pass a whole object when the component needs only specific fields

## Dependency Inversion

- Depend on hooks/services, not implementations

---

# 4. TypeScript Conventions

- Arrow functions only
- Use `type`, not `interface`
- No implicit `any`
- No unnecessary generics
- Types must be readable quickly

## Exports

- Use `export default` only when the file exports exactly one item
- If a file exports more than one item, use named exports only
- Do not mix default export and named exports in the same file
- Services should not export query keys, React state, or UI concerns

## Naming

- Descriptive, explicit names
- No unclear abbreviations

---

# 5. Project Structure

ComponentName/
├── ComponentName.tsx
├── ComponentName.module.css

PageName/
├── PageName.tsx
├── PageName.module.css

Structure rules:

- Every component must live in its own folder
- Every page must live in its own folder
- This applies even if the folder contains only one `.tsx` file
- If a component or page has styles, the `.module.css` file must live in the same folder
- Standalone `.tsx` files are only allowed for high-level orchestration files such as `index.tsx`, `main.tsx`, or equivalent root wiring files

Layers:

- components → UI only
- features → logic
- hooks → reusable logic
- services → API
- utils → helpers
- types → shared types

File size:

- `.tsx` files over 350 lines are a code smell
- Split large files by responsibility into child components, hooks, utils, adapters, or types
- Large files are allowed only with a clear reason and an explicit local exception

---

# 6. Component Rules

- Presentational components:

  - No logic
  - No data transformation
  - No API response parsing
  - No business/domain decisions
  - No extraction from large domain objects
  - Props must match exactly what the design needs to render

- Props:

  - Explicit
  - Minimal
  - Predictable
  - Display-ready
  - Prefer `title`, `description`, `statusLabel`, `maturityLabel` over passing a full `field`

- Reusability is earned, not assumed

Strict presentational component rule:

- A card, badge, table row, chart legend, list item, or similar visual component must not accept the whole backend/domain model unless it renders every relevant part of that model.
- Mapping from backend/domain model to presentational props belongs in an adapter, selector, page-level mapper, or feature hook.
- Missing values should be resolved before they reach the presentational component, for example by passing `"-"` as the display value.

---

# 7. React Discipline

## Effects

- `useEffect` is a last resort
- Use ONLY for:

  - APIs
  - browser APIs
  - localStorage
  - timers
  - subscriptions
  - third-party sync

- Do NOT use for:

  - derived state
  - syncing state with state
  - rendering logic
  - event reactions

- If it can be computed in render, do it there
- If it can happen in handler, do it there

## State

- Keep minimal
- One source of truth
- No duplicated state
- No derived state storage

## Component Hook Order

- `useRef`, `useState`, and `useReducer` must be grouped at the top of the component
- Derived values come after state
- Handlers come after derived values
- `useEffect` blocks live at the bottom of the component, exactly above the JSX return
- Separate state, derived values, handlers, effects, and JSX with empty lines
- Do not compress unrelated declarations together

## Event Flow

- Prefer direct event-driven logic
- Avoid reactive patching via effects

---

# 8. JSX & DOM Rules

- Avoid unnecessary wrappers
- Every wrapper must justify existence
- Prefer shallow trees
- No deeply nested conditionals
- Separate logical JSX blocks with an empty line
- Separate state declarations, derived variables, handlers, and return JSX with empty lines
- Do not compress unrelated declarations together
- Readability is mandatory; dense JSX is treated as a code smell

---

# 9. Layout Ownership

- Parent controls layout
- Child controls internal styling
- Do not fix structure problems with CSS

---

# 10. Styling Standards

- Flexbox by default
- Grid only when needed
- px only
- No inline styles

## Theme Rules

- No hardcoded:
  - colors
  - spacing
  - radius
  - shadows

Allowed:

- gradients
- special visual effects

---

# 11. CSS Rules

- No blank lines between properties
- No inline comments
- Clean, predictable structure

---

# 12. Performance

- Avoid unnecessary re-renders
- Memo only when needed
- No premature optimization

---

# 13. Error Handling

- Never fail silently
- Always handle API errors
- UI must reflect error states

---

# 14. Accessibility

- Semantic HTML required
- Keyboard navigation works
- ARIA only when needed

---

# 15. Internationalization

- No hardcoded strings
- Translation keys only
- Maintain language parity

Languages:

- English
- Greek

---

# 16. State Modeling

- Invalid states must be hard to represent
- Prefer explicit status models when needed

---

# 17. Hooks

- Hooks must not hide bad architecture
- Hooks encapsulate reusable logic only
- Split responsibilities when needed

## Server State Hooks

- Pages must not call `useQuery` directly for backend data
- Backend queries belong under `serverState`
- Server-state hooks should expose only what the caller needs
- Do not expose raw query objects to pages unless the page genuinely needs the full query API
- Prefer names such as:
  - `fields`
  - `isFieldsLoading`
  - `isFieldsError`
  - `refetchFields`
- Avoid names such as:
  - `fieldsQuery`
  - `cropVarietiesQuery`
  - `query`
- Query keys belong with server-state query modules, not services
- Services perform requests only
- Reusable derived query state belongs in the server-state hook
- Examples of reusable derived query state:
  - `hasFields`
  - `canShowFields`
  - `shouldShowFieldsEmptyState`
- Page-specific composition does not belong in a server-state hook
- If a page combines multiple queries to build a specific view model, that mapping belongs in the page or in a page-specific adapter called by the page
- Do not inject UI-only state into server-state hooks, for example `viewMode`, selected tabs, selected cards, or modal state

---

# 18. Conditionals

- Avoid nested ternaries
- Move logic above return
- Use clear boolean variables

---

# 19. Comments

- Explain intent, not code
- Document decisions, not syntax

---

# 20. UI States

- Loading state required
- Error state required
- Empty state required

---

# 21. File Consistency

- Folder name = Component name
- File name = Component name
- No vague naming

---

# 22. PR Checklist

- Responsive tested
- Theme tokens used
- No hardcoded values
- No unused imports
- No console logs
- Clean structure
- Clear naming
- No business logic in UI

---

# 23. Final Rule

Every abstraction, state variable, wrapper, hook, and effect must justify its existence.

If it does not reduce complexity, it is noise.

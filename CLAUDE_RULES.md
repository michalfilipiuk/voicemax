# CLAUDE_RULES.md

## Boilerplate Development Rules

This document defines the rules Claude must follow when working on projects built from this boilerplate.

---

### Rule 1: Always Use Existing Components First

Before creating any new component or custom solution, you must:

1. Check the `/src/components` directory for an existing component that fulfills the requirement
2. Check if an existing component can be extended via props to meet the need
3. Check if a combination of existing components achieves the desired result

Only after confirming that no existing component or combination of components can satisfy the requirement should you consider creating something new.

---

### Rule 2: Exhaust All Options Before Creating Custom Solutions

When a requirement arises, follow this order strictly:

1. **Use an existing component as-is**
2. **Use an existing component with different prop values**
3. **Compose multiple existing components together**
4. **Extend an existing component by adding a new prop/variant** (if the extension is reusable)
5. **Create a new component** (last resort only)

You must explicitly state which steps you evaluated before proposing a custom solution.

---

### Rule 3: Never Duplicate Functionality

Do not create a new component that duplicates functionality already present in the boilerplate. Examples of violations:

- Creating a `CustomButton.tsx` when `Button.tsx` exists
- Creating a `StyledText.tsx` when `Text.tsx` exists
- Creating inline styles that replicate what tokens already provide

If you believe an existing component is insufficient, propose modifications to that component rather than creating a parallel version.

---

### Rule 4: Always Use Design Tokens

Never use hardcoded values for:

- Colors
- Typography (font size, weight, line height, font family)
- Spacing
- Border radius
- Shadows/elevation

All styling must reference the token system in `/src/styles/tokens`. If a required token does not exist, add it to the appropriate token file before using it.

---

### Rule 5: Maintain Boilerplate Integrity

When adding new functionality:

- Follow the existing folder structure
- Follow the existing naming conventions
- Export new components through the appropriate barrel files (index.ts)
- Ensure new components accept theming via tokens, not hardcoded styles
- Type all props with TypeScript

---

### Rule 6: Document Deviations

If you must create a custom component or deviate from these rules, you must:

1. Explain why existing components could not fulfill the requirement
2. Document the new component's purpose and usage
3. Consider whether the new component should be added back to the boilerplate for future projects

---

### Rule 7: Ask Before Creating

When uncertain whether to create something new, ask first. Provide:

- What you need to build
- Which existing components you reviewed
- Why they appear insufficient

Wait for confirmation before proceeding with custom solutions.

---

## Quick Reference

| Need                           | First Action                                              |
| ------------------------------ | --------------------------------------------------------- |
| A button                       | Use `Button.tsx` with appropriate variant/size props      |
| Styled text                    | Use `Text.tsx` with appropriate variant prop              |
| Form input                     | Use `TextInput.tsx`, `Checkbox.tsx`, or `RadioButton.tsx` |
| Container/wrapper              | Use `Card.tsx` or `Spacer.tsx`                            |
| Visual separator               | Use `Divider.tsx`                                         |
| Screen layout                  | Check `/src/screens` for existing templates               |
| Navigation pattern             | Check `/src/navigation` for existing navigators           |
| A new color/size/spacing value | Add to tokens first, then reference                       |

---

## Summary

**Default behavior: Use what exists.**

**Custom solutions: Only when absolutely necessary, and only after demonstrating that existing options were evaluated and found insufficient.**

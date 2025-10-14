---
applyTo: "**"
---

# Implementation Guide Documentation Standards

This document defines mandatory requirements for creating implementation guides before starting major feature development in this Modus Next.js project.

## 🚨 CRITICAL: Pre-Development Documentation

### MANDATORY: Implementation Guide Creation

**BEFORE starting ANY major feature development, you MUST:**

1. **Create a comprehensive implementation guide** in `/implementation_guides/`
2. **Document the complete approach** before writing any code
3. **Get stakeholder review** of the implementation plan
4. **Update guides with lessons learned** during and after implementation

### 🎯 What Requires an Implementation Guide

**Always create implementation guides for:**

- ✅ New page/view components with complex functionality
- ✅ New reusable component libraries or design system additions
- ✅ Integration with external APIs or services
- ✅ Authentication, authorization, or security features
- ✅ Data management patterns (Context API, state management)
- ✅ Routing or navigation changes
- ✅ Performance optimization initiatives
- ✅ Accessibility improvements or compliance work
- ✅ Build process, tooling, or infrastructure changes
- ✅ Any feature requiring more than 2 hours of development time

**Skip implementation guides for:**

- ❌ Simple bug fixes (< 30 minutes)
- ❌ Minor text or styling tweaks
- ❌ Documentation updates
- ❌ Dependency version updates (unless breaking changes)

## 📁 File Location & Naming Convention

### Directory Structure

```text
implementation_guides/
├── feature-name-YYYY-MM-DD.md          # New feature guides
├── integration-api-name-YYYY-MM-DD.md  # API integration guides
├── component-library-YYYY-MM-DD.md     # Component development guides
└── performance-optimization-YYYY-MM-DD.md # Performance guides
```

### Naming Convention

**Format:** `[feature-type]-[brief-description]-YYYY-MM-DD.md`

**Examples:**

- `modus-table-component-2025-10-13.md`
- `user-dashboard-page-2025-10-13.md`
- `stripe-payment-integration-2025-10-13.md`
- `theme-system-enhancement-2025-10-13.md`

**Rules:**

- Use kebab-case for all names
- Include date (YYYY-MM-DD) for chronological tracking
- Be descriptive but concise (3-5 words max)
- Use feature type prefix (component, integration, page, etc.)

## 📋 Required Implementation Guide Template

Every implementation guide MUST include all of these sections:

```markdown
# [Feature Name] Implementation Guide

**Date:** YYYY-MM-DD  
**Author:** [Your Name]  
**Status:** [Planning | In Progress | Complete | Archived]  
**Related Issues:** #[issue-number]

## 🎯 Overview & Objectives

### Problem Statement

**What problem are we solving?**

- Clear description of the problem
- Why this feature is needed now
- Who is affected by this problem

**Success Criteria:**

- [ ] Measurable outcome 1
- [ ] Measurable outcome 2
- [ ] Measurable outcome 3

### Goals & Requirements

#### Functional Requirements

- [ ] Requirement 1: [Detailed description]
- [ ] Requirement 2: [Detailed description]
- [ ] Requirement 3: [Detailed description]

#### Non-Functional Requirements

- [ ] Performance: [Target metrics]
- [ ] Accessibility: [WCAG level target]
- [ ] Browser compatibility: [Supported browsers]
- [ ] Theme compatibility: [All 4 Modus themes]

### User Stories & Personas

**Primary Persona:** [User type]

- **Goal:** [What they want to achieve]
- **Pain Point:** [Current problem]
- **Expected Behavior:** [How feature solves this]

**User Story:**

> As a [type of user], I want to [perform action] so that [achieve goal].

## 🏗️ Technical Architecture

### Component Architecture

**High-Level Structure:**
```

ComponentName/
├── ModusComponentWrapper.tsx # Main component
├── types.ts # TypeScript interfaces
└── utils.ts # Helper functions

```

**Data Flow:**
```

User Input → Event Handler (ref-based) → State Update → Component Re-render

````

### Modus Web Components Integration

**Components Used:**
- `ModusWc[ComponentName]` - [Purpose and configuration]
- `ModusWc[ComponentName]` - [Purpose and configuration]

**Event Handling Pattern:**
```tsx
"use client";
import { useRef, useEffect } from "react";

const componentRef = useRef<any>(null);

useEffect(() => {
  const component = componentRef.current;
  if (component) {
    const handleEvent = (event: CustomEvent) => {
      // Use componentRef.current, NEVER event.target
      component.someProperty = newValue;
    };

    component.addEventListener("eventName", handleEvent);
    return () => component.removeEventListener("eventName", handleEvent);
  }
}, []);
````

### State Management

**Approach:** [Context API | Local State | Props]

**State Structure:**

```typescript
interface FeatureState {
  property1: Type1;
  property2: Type2;
}
```

### Dependencies & Integrations

**New Dependencies:**

- `package-name@version` - [Purpose]

**External APIs:**

- [API name] - [Endpoint and purpose]

**Modus Design System:**

- Color variables: `var(--modus-wc-color-*)`
- Icons: Modus Icons (Field Systems)
- Typography: Tailwind utility classes

### File Structure Changes

```text
app/
├── [feature-name]-demo/
│   └── page.tsx                 # Demo page
├── components/
│   ├── Modus[Component].tsx     # Main component
│   └── types/
│       └── [component].types.ts # TypeScript interfaces
└── contexts/
    └── [Feature]Context.tsx     # Context provider (if needed)
```

## 🎨 Design System Integration

### Modus Colors Used

**Base Colors (theme-adaptive):**

- `className="bg-background"` - Page backgrounds
- `className="text-foreground"` - Primary text
- `className="bg-card"` - Card backgrounds
- `className="bg-muted"` - Muted backgrounds

**Semantic Colors (theme-consistent):**

- `className="bg-primary"` - Primary actions
- `className="bg-success"` - Success states
- `className="bg-destructive"` - Error states
- `className="bg-warning"` - Warning states

### Border Styling (CRITICAL)

**Always use inline styles for borders:**

```tsx
style={{ border: "1px solid var(--border)" }}
style={{ borderBottom: "2px solid var(--border)" }}
```

### Modus Icons

**Icons Used:**

- `<i className="modus-icons">icon_name</i>`
- Reference: https://modus-icons.trimble.com/field-systems/

### Typography Standards

**Use div elements with Tailwind classes (not semantic HTML):**

```tsx
<div className="text-4xl font-bold text-foreground">Title</div>
<div className="text-lg text-foreground">Body text</div>
```

### Accessibility Considerations

- [ ] ARIA labels for interactive elements
- [ ] Keyboard navigation support
- [ ] Screen reader compatibility
- [ ] Focus management
- [ ] Color contrast compliance (WCAG AA minimum)

## 🔧 Implementation Plan

### Phase 1: Foundation (Est: X hours)

**Tasks:**

- [ ] Create component file structure
- [ ] Set up TypeScript interfaces
- [ ] Implement basic component wrapper
- [ ] Add to ModusProvider if needed

**Deliverables:**

- Basic component rendering
- TypeScript types defined
- File structure established

**Testing:**

- Component renders without errors
- TypeScript compilation passes
- All 4 themes display correctly

### Phase 2: Core Features (Est: X hours)

**Tasks:**

- [ ] Implement event handling (ref-based)
- [ ] Add interactive functionality
- [ ] Implement state management
- [ ] Add error handling

**Deliverables:**

- Fully functional interactive component
- All event handlers working
- Error states handled gracefully

**Testing:**

- All interactive elements work
- Event handlers tested with Chrome DevTools
- Edge cases handled

### Phase 3: Polish & Testing (Est: X hours)

**Tasks:**

- [ ] Add accessibility features
- [ ] Optimize performance
- [ ] Create demo page
- [ ] Write documentation

**Deliverables:**

- Accessible component
- Performance optimized
- Complete demo page
- Component documentation

**Testing:**

- Accessibility audit passed
- Performance benchmarks met
- All browsers tested
- Documentation reviewed

## 🧪 Testing Strategy

### Pre-Testing Requirements

**Run all linting commands:**

```bash
npm run lint:styles && npm run lint:colors && npm run lint:icons && npm run lint:semantic
```

**Expected Result:** 0 violations

### Chrome DevTools Testing (MANDATORY)

```bash
# Start development server
npm run dev
```

**Test Checklist:**

- [ ] Navigate to demo page: `http://localhost:3000/[feature]-demo`
- [ ] Check console for JavaScript errors (should be 0)
- [ ] Test all interactive elements (buttons, forms, dropdowns)
- [ ] Verify responsive design (mobile: 375px, tablet: 768px, desktop: 1440px)
- [ ] Test theme switching (all 4 Modus themes)
- [ ] Run accessibility audit in Chrome DevTools
- [ ] Test keyboard navigation (Tab, Enter, Escape, Arrow keys)
- [ ] Verify event handlers with console logs

### Unit Testing

**Components to Test:**

- [ ] Component rendering
- [ ] Props validation
- [ ] Event handlers
- [ ] Error states

**Test Scenarios:**

```typescript
describe("Modus[Component]", () => {
  it("should render without errors", () => {});
  it("should handle user interactions", () => {});
  it("should validate props correctly", () => {});
  it("should handle edge cases", () => {});
});
```

### Integration Testing

**Test Interactions:**

- [ ] Component with other Modus components
- [ ] Theme switching compatibility
- [ ] State management integration
- [ ] API integration (if applicable)

### Accessibility Testing

**WCAG Compliance Checklist:**

- [ ] **Perceivable**: Content is perceivable to all users
- [ ] **Operable**: UI components are operable via keyboard
- [ ] **Understandable**: Information is clear and consistent
- [ ] **Robust**: Works with assistive technologies

**Testing Tools:**

- Chrome DevTools Lighthouse
- axe DevTools extension
- Screen reader testing (VoiceOver on macOS)

### Quality Gates (ALL Must Pass)

- [ ] ✅ `npm run lint:styles` passes (0 violations)
- [ ] ✅ `npm run lint:colors` passes (0 violations)
- [ ] ✅ `npm run lint:icons` passes (0 violations)
- [ ] ✅ `npm run lint:semantic` passes (0 violations)
- [ ] ✅ `npm run type-check` passes
- [ ] ✅ Chrome DevTools shows no console errors
- [ ] ✅ All interactive elements function correctly
- [ ] ✅ Responsive design verified (3 breakpoints)
- [ ] ✅ Theme compatibility tested (4 themes)
- [ ] ✅ Accessibility audit passed (WCAG AA minimum)

## 🚀 Deployment Considerations

### Build Process

**Build Command:**

```bash
npm run build
```

**Expected Impact:**

- Bundle size increase: [Estimate in KB]
- Build time impact: [Estimate in seconds]

**Environment Variables:**

- None required (or list if needed)

### Performance Impact

**Metrics to Monitor:**

- Initial bundle size
- Component render time
- Interactive to paint time
- Memory usage

**Performance Targets:**

- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms

**Optimization Strategies:**

- Code splitting if component > 50KB
- Lazy loading for non-critical features
- Memoization for expensive computations

### Caching Strategies

- Static assets: Cache-Control header
- API responses: Appropriate cache headers
- Component state: Local storage (if needed)

## 📚 Documentation Updates

### User Documentation

- [ ] Update `README.md` with new feature
- [ ] Create component demo page
- [ ] Add usage examples
- [ ] Document props and configuration options

### Developer Documentation

- [ ] Update `AGENTS.md` if new patterns added
- [ ] Update `.github/copilot-instructions.md` if needed
- [ ] Add TypeScript interface documentation
- [ ] Document event handling patterns

### Code Examples

**Basic Usage:**

```tsx
import { Modus[Component] } from "@/app/components/Modus[Component]";

export default function Page() {
  return (
    <Modus[Component]
      prop1="value1"
      prop2="value2"
    >
      Content
    </Modus[Component]
  );
}
```

**Advanced Usage:**

```tsx
// Include more complex examples with event handling, state management, etc.
```

## 🔄 Post-Implementation Review

### Lessons Learned

_[IMPORTANT: Update this section DURING and AFTER implementation]_

#### What Went Well ✅

**Date:** [When observed]

- [Specific success or positive outcome]
- [Why it worked well]
- [How to replicate in future projects]

#### Challenges Encountered ⚠️

**Challenge 1: [Brief Description]**

- **Date:** YYYY-MM-DD
- **Problem:** [Detailed description of what went wrong]
- **Impact:** [How this affected timeline/scope/quality]
- **Root Cause:** [Why this happened]

**Challenge 2: [Brief Description]**

- **Date:** YYYY-MM-DD
- **Problem:** [Detailed description]
- **Impact:** [Effect on project]
- **Root Cause:** [Analysis]

#### Solutions & Workarounds 🔧

**Solution to Challenge 1:**

- **Approach:** [Step-by-step solution implemented]
- **Code Changes:** [Description or link to commits]
- **Time Impact:** [Additional time required]
- **Prevention:** [How to avoid this in future]

**Solution to Challenge 2:**

- **Approach:** [Solution details]
- **Code Changes:** [Changes made]
- **Time Impact:** [Time cost]
- **Prevention:** [Future prevention strategy]

#### Architecture Changes 🏗️

_[Document any deviations from original architectural plan]_

**Change 1:**

- **Original Plan:** [What was planned]
- **Actual Implementation:** [What was actually done]
- **Reason for Change:** [Why the change was necessary]
- **Impact:** [How this affects future development]

#### Future Improvements 🚀

**Technical Debt:**

- [ ] [Item 1: Description and priority]
- [ ] [Item 2: Description and priority]

**Enhancement Opportunities:**

- [ ] [Enhancement 1: Description and value]
- [ ] [Enhancement 2: Description and value]

**Refactoring Needs:**

- [ ] [Refactoring 1: Current issue and proposed solution]
- [ ] [Refactoring 2: Technical debt and cleanup plan]

### Performance Metrics

_[Update with ACTUAL metrics after implementation]_

**Bundle Size Impact:**

- Before: [XX KB]
- After: [XX KB]
- Increase: [XX KB] ([XX%])

**Load Time Impact:**

- First Contentful Paint: [X.X]s
- Largest Contentful Paint: [X.X]s
- Time to Interactive: [X.X]s

**Runtime Performance:**

- Component render time: [XX ms]
- Event handler response time: [XX ms]
- Memory usage: [XX MB]

**Comparison to Targets:**

- [ ] FCP target met (< 1.8s)
- [ ] LCP target met (< 2.5s)
- [ ] CLS target met (< 0.1)
- [ ] FID target met (< 100ms)

### Accessibility Audit Results

_[Update after accessibility testing with Chrome DevTools]_

**WCAG Compliance Level Achieved:**

- Target: [A | AA | AAA]
- Achieved: [A | AA | AAA]

**Lighthouse Accessibility Score:**

- Score: [0-100]
- Issues Found: [Number]
- Issues Fixed: [Number]

**Screen Reader Compatibility:**

- [ ] VoiceOver (macOS): [Pass/Fail - Notes]
- [ ] NVDA (Windows): [Pass/Fail - Notes]
- [ ] JAWS (Windows): [Pass/Fail - Notes]

**Keyboard Navigation:**

- [ ] All interactive elements accessible via Tab
- [ ] Logical focus order maintained
- [ ] Escape key closes modals/dropdowns
- [ ] Enter/Space activates buttons
- [ ] Arrow keys navigate menus/lists

**Color Contrast:**

- [ ] Text contrast ratio ≥ 4.5:1 (normal text)
- [ ] Text contrast ratio ≥ 3:1 (large text)
- [ ] All 4 Modus themes pass contrast checks

### Timeline Analysis

**Estimated vs. Actual:**

- Phase 1 Estimate: [X hours] | Actual: [X hours]
- Phase 2 Estimate: [X hours] | Actual: [X hours]
- Phase 3 Estimate: [X hours] | Actual: [X hours]
- **Total Estimate: [X hours] | Actual: [X hours]**

**Variance Analysis:**

- [Explain any significant differences]
- [What caused delays or faster-than-expected completion]

### Quality Metrics

**Linting Results:**

- `lint:styles` violations: [0]
- `lint:colors` violations: [0]
- `lint:icons` violations: [0]
- `lint:semantic` violations: [0]

**Test Coverage:**

- Unit tests: [XX%]
- Integration tests: [XX%]
- E2E tests: [XX%]

**Browser Compatibility:**

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

## 📖 References & Resources

### Modus Design System

- [Modus Web Components Storybook](https://trimble-oss.github.io/modus-wc-2.0/main/)
- [Modus Icons Catalog](https://modus-icons.trimble.com/field-systems/)
- [Color Palette Demo](http://localhost:3000/color-palette)

### Next.js & React

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

### Project Documentation

- [AGENTS.md](../../AGENTS.md) - AI coding assistant guidelines
- [CLAUDE.md](../../CLAUDE.md) - Detailed technical patterns
- [README.md](../../README.md) - Project setup and overview
- [Development Workflow](./development_workflow.instructions.md) - Quality assurance standards

### Related Implementation Guides

- [Link to related guide 1]
- [Link to related guide 2]

### External Resources

- [Specific API documentation if applicable]
- [Third-party library documentation]
- [Design references or mockups]

---

**Status:** [Planning | In Progress | Complete | Archived]  
**Last Updated:** YYYY-MM-DD  
**Next Review Date:** YYYY-MM-DD

---

## 📝 Implementation Guide Maintenance

### When to Update This Guide

**During Development:**

- Update status as phases complete
- Document challenges immediately when encountered
- Record solutions as they're implemented
- Update architecture if deviations occur

**After Implementation:**

- Complete all metrics sections with actual data
- Fill out lessons learned thoroughly
- Update status to "Complete"
- Set next review date (6 months)

**Periodic Reviews:**

- Review every 6 months for relevance
- Archive if feature deprecated
- Update if patterns change
- Link to related new guides

````

## 🔄 Implementation Guide Lifecycle

### Phase 1: Pre-Development (Planning)

1. **Create Implementation Guide**
   ```bash
   # Create new guide with proper naming
   cd implementation_guides
   touch feature-name-$(date +%Y-%m-%d).md
````

2. **Fill Out Complete Template**

   - All sections except "Post-Implementation Review"
   - Get team/stakeholder review
   - Finalize architectural decisions

3. **Approval Checkpoint**
   - [ ] All team members reviewed
   - [ ] Technical approach approved
   - [ ] Timeline agreed upon
   - [ ] Resources allocated

### Phase 2: During Implementation (In Progress)

**Update Guide in Real-Time:**

1. **Document Challenges Immediately**

   ```markdown
   #### Challenge: [Issue encountered]

   **Date:** 2025-10-13
   **Problem:** React event props not working with Modus Web Components
   **Impact:** Had to refactor all event handling to use refs
   ```

2. **Record Solutions as Implemented**

   ```markdown
   **Solution:** Implemented ref-based event handling pattern
   **Code Changes:** Updated ModusDropdown.tsx with useRef + useEffect
   **Time Impact:** +2 hours for refactoring
   **Prevention:** Add to AGENTS.md as standard pattern
   ```

3. **Update Status & Progress**
   - Mark completed tasks with ✅
   - Update phase progress
   - Adjust timeline estimates if needed

### Phase 3: Post-Implementation (Complete)

1. **Complete All Metrics Sections**

   - Performance data (actual measurements)
   - Accessibility audit results
   - Timeline analysis
   - Quality metrics

2. **Thorough Lessons Learned**

   - What went well (with specifics)
   - All challenges encountered
   - All solutions implemented
   - Future improvements identified

3. **Final Review & Archive**
   - Update status to "Complete"
   - Link related documentation
   - Set 6-month review date
   - Archive if feature deprecated

## 🚫 Common Anti-Patterns to Avoid

### ❌ Don't Skip Implementation Guides

**Wrong:**

```bash
# Starting development without a guide
git checkout -b feature/new-component
# Just start coding...
```

**Correct:**

```bash
# Create guide first
cd implementation_guides
touch new-component-2025-10-13.md
# Fill out complete template
# Get review
# THEN start development
git checkout -b feature/new-component
```

### ❌ Don't Create Shallow Guides

**Wrong:**

```markdown
## Technical Architecture

We'll use Modus Web Components.

## Implementation Plan

- Build the component
- Test it
- Deploy
```

**Correct:**

```markdown
## Technical Architecture

### Component Architecture

ComponentName uses ModusWcButton with ref-based event handling:

\`\`\`tsx
const buttonRef = useRef<any>(null);

useEffect(() => {
const button = buttonRef.current;
if (button) {
const handleClick = (e: CustomEvent) => {
button.disabled = true;
// Handle action
};
button.addEventListener('buttonClick', handleClick);
return () => button.removeEventListener('buttonClick', handleClick);
}
}, []);
\`\`\`

### State Management

Using React Context API for theme state...
[Detailed explanation]
```

### ❌ Don't Forget Real-Time Updates

**Wrong:**

```markdown
[Complete implementation]
[Never update guide]
[Create "lessons learned" section after the fact from memory]
```

**Correct:**

```markdown
[Start implementation]
[Encounter problem] → Document immediately in guide
[Find solution] → Document solution with code examples
[Continue development]
[Complete] → All challenges and solutions already documented
```

### ❌ Don't Ignore Post-Implementation Review

**Wrong:**

```markdown
Status: Complete
Last Updated: 2025-10-13

## Post-Implementation Review

_[Will update later]_
```

**Correct:**

```markdown
Status: Complete
Last Updated: 2025-10-15

## Post-Implementation Review

### Performance Metrics

Bundle size increased by 15KB (from 245KB to 260KB).
LCP improved from 2.1s to 1.8s due to code splitting.

### Lessons Learned

#### What Went Well

- Ref-based event handling worked perfectly
- All 4 themes supported without issues
  [Detailed analysis with specific examples]
```

## 📋 Pre-Development Checklist

**Before writing ANY code:**

- [ ] ✅ Implementation guide created with correct naming
- [ ] ✅ Problem statement clearly defined
- [ ] ✅ Success criteria measurable and specific
- [ ] ✅ User stories documented
- [ ] ✅ Technical architecture detailed
- [ ] ✅ Modus Web Components integration planned
- [ ] ✅ Event handling pattern specified
- [ ] ✅ Design system colors documented
- [ ] ✅ Border styling approach defined
- [ ] ✅ Implementation phases broken down
- [ ] ✅ Testing strategy comprehensive
- [ ] ✅ Accessibility requirements defined
- [ ] ✅ Performance targets set
- [ ] ✅ Team/stakeholder review completed

## 🎯 Success Metrics for Implementation Guides

**Implementation guides are successful when:**

- 🎯 **Reduce Development Time**: Future similar features take 30-50% less time
- 🎯 **Improve Code Quality**: Consistent patterns, fewer bugs, easier maintenance
- 🎯 **Knowledge Retention**: Team members can understand features without original developer
- 🎯 **Risk Mitigation**: Common pitfalls documented and avoided in future projects
- 🎯 **Stakeholder Alignment**: Clear expectations, no scope surprises
- 🎯 **Onboarding Speed**: New developers can understand decisions and patterns quickly

## 🚀 Quick Start Guide

### Creating Your First Implementation Guide

1. **Determine if guide is needed** (> 2 hours work? Complex feature? Yes = Need guide)

2. **Create file with proper naming**

   ```bash
   cd implementation_guides
   touch my-feature-$(date +%Y-%m-%d).md
   ```

3. **Copy template from this document** (complete template above)

4. **Fill out all sections thoroughly** (except post-implementation)

5. **Get review** from team/stakeholders

6. **Start development** only after guide approved

7. **Update guide in real-time** as you develop

8. **Complete post-implementation review** with actual metrics

---

**Remember: Implementation guides are living documents that serve as both planning tools and historical records. They are essential for maintaining code quality, team knowledge, and project success. Never skip this critical step in the development process.**

**Quality over speed: Taking time to plan and document properly will save significantly more time in maintenance, debugging, and future feature development.**

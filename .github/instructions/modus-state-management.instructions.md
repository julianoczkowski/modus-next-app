---
applyTo: "**"
---

# Modus Web Components State Management Guide

This document provides comprehensive guidance on state management patterns when working with Modus Web Components in React applications.

## 🚨 CRITICAL: Understanding Modus Web Component State

### Core Principle

**Modus Web Components manage their own internal state.** Do not attempt to control their state from React - this creates conflicts and breaks functionality.

## 🎯 The Golden Rule

> **Let Modus Web Components handle their own state. React should only observe and respond to their events, never control them.**

## Common State Management Issues

### 1. Accordion/Collapse Components

#### ❌ WRONG - Controlling State from React

```tsx
// This causes the accordion to not work
const [expandedItems, setExpandedItems] = useState([0]);

<ModusWcAccordion>
  {items.map((item, index) => (
    <ModusWcCollapse
      key={item.id}
      expanded={expandedItems.includes(index)} // ❌ React state conflicts with internal state
      options={item.options}
    >
      <div slot="content">{item.content}</div>
    </ModusWcCollapse>
  ))}
</ModusWcAccordion>;
```

**Symptoms:**

- Accordion headers appear but clicking doesn't expand/collapse items
- Event handlers fire but UI doesn't update
- Components render but are not interactive

#### ✅ CORRECT - Let Components Manage Their Own State

```tsx
// Let the component handle its own state
<ModusWcAccordion>
  {items.map((item) => (
    <ModusWcCollapse
      key={item.id}
      collapse-id={item.id}
      options={item.options} // ✅ Only pass configuration
    >
      <div slot="content">{item.content}</div>
    </ModusWcCollapse>
  ))}
</ModusWcAccordion>
```

### 2. Dropdown Menu Components

#### ❌ WRONG - Using event.target

```tsx
const handleItemSelect = (event: CustomEvent) => {
  // ❌ event.target may not be the component you expect
  event.target.menuVisible = false;
};

<ModusWcDropdownMenu onItemSelect={handleItemSelect}>
```

#### ✅ CORRECT - Using Component Refs

```tsx
"use client";
import { useRef, useEffect } from "react";

export function ModusDropdown() {
  const dropdownRef = useRef<any>(null);

  useEffect(() => {
    const dropdown = dropdownRef.current;
    if (dropdown) {
      const handleItemSelect = (event: CustomEvent) => {
        // ✅ Use the ref, not event.target
        dropdown.menuVisible = false;
      };

      dropdown.addEventListener("itemSelect", handleItemSelect);
      return () => dropdown.removeEventListener("itemSelect", handleItemSelect);
    }
  }, []);

  return <ModusWcDropdownMenu ref={dropdownRef} />;
}
```

### 3. Modal/Dialog Components

#### ❌ WRONG - Controlling Visibility from React

```tsx
const [isOpen, setIsOpen] = useState(false);

// ❌ Don't control modal state from React
<ModusWcModal visible={isOpen}>
  <div slot="content">Modal content</div>
</ModusWcModal>;
```

#### ✅ CORRECT - Let Modal Control Itself

```tsx
"use client";
import { useRef, useEffect } from "react";

export function ModusModal({ onClose }) {
  const modalRef = useRef<any>(null);

  useEffect(() => {
    const modal = modalRef.current;
    if (modal) {
      const handleClose = (event: CustomEvent) => {
        // ✅ Just respond to the event, don't control visibility
        if (onClose) onClose();
      };

      modal.addEventListener("modalClose", handleClose);
      return () => modal.removeEventListener("modalClose", handleClose);
    }
  }, [onClose]);

  // ✅ No visible prop - component manages its own state
  return (
    <ModusWcModal ref={modalRef}>
      <div slot="content">Modal content</div>
    </ModusWcModal>
  );
}
```

## 📋 State Management Patterns

### Pattern 1: Event Listening (Observation Only)

**Use Case:** Track component state for analytics, logging, or UI updates in parent components.

```tsx
"use client";
import { useRef, useEffect } from "react";

export function ComponentWithTracking({ onStateChange }) {
  const componentRef = useRef<any>(null);

  useEffect(() => {
    const component = componentRef.current;
    if (component) {
      const handleStateChange = (event: Event) => {
        const customEvent = event as CustomEvent<{
          expanded: boolean;
          index: number;
        }>;

        // ✅ Track for analytics/logging, don't try to control
        console.log("State changed:", customEvent.detail);

        // ✅ Notify parent for UI updates elsewhere
        if (onStateChange) {
          onStateChange(customEvent.detail);
        }
      };

      component.addEventListener("stateChange", handleStateChange);
      return () =>
        component.removeEventListener("stateChange", handleStateChange);
    }
  }, [onStateChange]);

  return <ModusWcComponent ref={componentRef} />;
}
```

### Pattern 2: Ref-Based DOM Manipulation

**Use Case:** Trigger actions on components (like opening a modal programmatically).

```tsx
"use client";
import { useRef } from "react";

export function ComponentWithControl() {
  const componentRef = useRef<any>(null);

  const handleOpenModal = () => {
    // ✅ Programmatic control via ref is acceptable
    if (componentRef.current) {
      componentRef.current.open();
    }
  };

  return (
    <>
      <ModusWcButton onButtonClick={handleOpenModal}>Open Modal</ModusWcButton>
      <ModusWcModal ref={componentRef}>
        <div slot="content">Modal content</div>
      </ModusWcModal>
    </>
  );
}
```

### Pattern 3: Configuration-Only Props

**Use Case:** Initial setup and configuration of Modus Web Components.

```tsx
// ✅ Pass configuration, not state control
<ModusWcAccordion>
  <ModusWcCollapse
    collapse-id="item-1"
    options={{
      header: "Header Text",
      icon: "home",
      disabled: false,
    }}
  >
    <div slot="content">Content</div>
  </ModusWcCollapse>
</ModusWcAccordion>
```

## 🚫 Anti-Patterns to Avoid

### 1. React Synthetic Events

```tsx
// ❌ DON'T - React synthetic events don't work reliably
<ModusWcComponent
  onItemSelect={(event) => {}}
  onExpandedChange={(event) => {}}
/>;

// ✅ DO - Use native DOM events
useEffect(() => {
  const component = componentRef.current;
  if (component) {
    component.addEventListener("itemSelect", handleItemSelect);
    return () => component.removeEventListener("itemSelect", handleItemSelect);
  }
}, []);
```

### 2. Controlled Component Pattern

```tsx
// ❌ DON'T - Treat Modus components like controlled React components
const [value, setValue] = useState("");
<ModusWcTextInput value={value} onChange={(e) => setValue(e.target.value)} />;

// ✅ DO - Let component manage its own value
const inputRef = useRef<any>(null);
useEffect(() => {
  const input = inputRef.current;
  if (input) {
    const handleValueChange = (e: CustomEvent) => {
      // React to changes, don't control them
      console.log("New value:", e.detail.value);
    };
    input.addEventListener("valueChange", handleValueChange);
    return () => input.removeEventListener("valueChange", handleValueChange);
  }
}, []);
```

### 3. Direct Property Manipulation Without Refs

```tsx
// ❌ DON'T - Manipulate properties via event.target
const handleClick = (event: CustomEvent) => {
  event.target.someProperty = newValue; // Unreliable
};

// ✅ DO - Use component refs
const componentRef = useRef<any>(null);
const handleClick = () => {
  componentRef.current.someProperty = newValue; // Reliable
};
```

## 🔧 Debugging State Management Issues

### Checklist When Components Don't Work

- [ ] **Remove state control props** - No `value`, `expanded`, `visible`, etc.
- [ ] **Use refs** - Access components via `useRef` and `ref` attribute
- [ ] **Native events** - Use `addEventListener` not React event props
- [ ] **Check event names** - Verify against Modus documentation
- [ ] **Add cleanup** - Always remove event listeners in useEffect return
- [ ] **Client component** - Ensure `"use client"` directive is present

### Common Debugging Steps

1. **Check Console for Events**

   ```tsx
   useEffect(() => {
     const component = componentRef.current;
     if (component) {
       const handleEvent = (e: Event) => {
         console.log("Event fired:", e.type, e);
       };
       component.addEventListener("eventName", handleEvent);
       return () => component.removeEventListener("eventName", handleEvent);
     }
   }, []);
   ```

2. **Verify Ref Attachment**

   ```tsx
   useEffect(() => {
     console.log("Component ref:", componentRef.current);
   }, []);
   ```

3. **Check Modus Documentation**
   - Verify correct event names
   - Check available properties and methods
   - Reference: https://trimble-oss.github.io/modus-wc-2.0/main/

## 📚 Complete Working Examples

### Accordion with Event Tracking

```tsx
"use client";
import { useRef, useEffect, useState } from "react";
import {
  ModusWcAccordion,
  ModusWcCollapse,
} from "@trimble-oss/moduswebcomponents-react";

interface AccordionItem {
  id: string;
  options: {
    header: string;
    icon?: string;
  };
  content: React.ReactNode;
}

interface ModusAccordionProps {
  items: AccordionItem[];
  onExpandedChange?: (detail: { expanded: boolean; index: number }) => void;
}

export default function ModusAccordion({
  items,
  onExpandedChange,
}: ModusAccordionProps) {
  const accordionRef = useRef<any>(null);

  useEffect(() => {
    const accordion = accordionRef.current;
    if (accordion && onExpandedChange) {
      const handleExpandedChange = (event: Event) => {
        const customEvent = event as CustomEvent<{
          expanded: boolean;
          index: number;
        }>;
        onExpandedChange(customEvent.detail);
      };

      accordion.addEventListener("expandedChange", handleExpandedChange);
      return () =>
        accordion.removeEventListener("expandedChange", handleExpandedChange);
    }
  }, [onExpandedChange]);

  return (
    <ModusWcAccordion ref={accordionRef}>
      {items.map((item) => (
        <ModusWcCollapse
          key={item.id}
          collapse-id={item.id}
          options={item.options}
        >
          <div slot="content">{item.content}</div>
        </ModusWcCollapse>
      ))}
    </ModusWcAccordion>
  );
}
```

### Dropdown with Auto-Close

```tsx
"use client";
import { useRef, useEffect } from "react";
import { ModusWcDropdownMenu } from "@trimble-oss/moduswebcomponents-react";

interface DropdownItem {
  id: string;
  label: string;
}

interface ModusDropdownProps {
  items: DropdownItem[];
  onItemSelect?: (item: DropdownItem) => void;
}

export default function ModusDropdown({
  items,
  onItemSelect,
}: ModusDropdownProps) {
  const dropdownRef = useRef<any>(null);

  useEffect(() => {
    const dropdown = dropdownRef.current;
    if (dropdown) {
      const handleItemSelect = (event: CustomEvent) => {
        // Close menu using ref
        dropdown.menuVisible = false;

        // Notify parent
        if (onItemSelect) {
          const selectedItem = items.find(
            (item) => item.id === event.detail.id
          );
          if (selectedItem) onItemSelect(selectedItem);
        }
      };

      dropdown.addEventListener("itemSelect", handleItemSelect);
      return () => dropdown.removeEventListener("itemSelect", handleItemSelect);
    }
  }, [items, onItemSelect]);

  return (
    <ModusWcDropdownMenu ref={dropdownRef}>
      {items.map((item) => (
        <div key={item.id} data-id={item.id}>
          {item.label}
        </div>
      ))}
    </ModusWcDropdownMenu>
  );
}
```

### Modal with Programmatic Control

```tsx
"use client";
import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { ModusWcModal } from "@trimble-oss/moduswebcomponents-react";

interface ModusModalProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export interface ModusModalRef {
  open: () => void;
  close: () => void;
}

const ModusModal = forwardRef<ModusModalRef, ModusModalProps>(
  ({ children, onClose }, ref) => {
    const modalRef = useRef<any>(null);

    // Expose methods to parent
    useImperativeHandle(ref, () => ({
      open: () => {
        if (modalRef.current) {
          modalRef.current.visible = true;
        }
      },
      close: () => {
        if (modalRef.current) {
          modalRef.current.visible = false;
        }
      },
    }));

    useEffect(() => {
      const modal = modalRef.current;
      if (modal) {
        const handleClose = () => {
          if (onClose) onClose();
        };

        modal.addEventListener("modalClose", handleClose);
        return () => modal.removeEventListener("modalClose", handleClose);
      }
    }, [onClose]);

    return (
      <ModusWcModal ref={modalRef}>
        <div slot="content">{children}</div>
      </ModusWcModal>
    );
  }
);

ModusModal.displayName = "ModusModal";

export default ModusModal;

// Usage example:
// const modalRef = useRef<ModusModalRef>(null);
// <ModusModal ref={modalRef} onClose={() => console.log("Closed")}>
//   <p>Modal content</p>
// </ModusModal>
// <button onClick={() => modalRef.current?.open()}>Open Modal</button>
```

## 🎯 Best Practices Summary

### DO ✅

1. **Use refs** for accessing Modus Web Components
2. **Use addEventListener** for event handling
3. **Pass configuration** via props (not state control)
4. **Track state changes** for analytics/logging
5. **Clean up listeners** in useEffect return
6. **Mark components** with `"use client"` directive
7. **Let components** manage their own internal state

### DON'T ❌

1. **Don't use React synthetic events** as primary approach
2. **Don't control state** from React (expanded, visible, value)
3. **Don't use event.target** for DOM manipulation
4. **Don't treat as controlled components** (like controlled inputs)
5. **Don't manually register** with `defineCustomElements()`
6. **Don't fight** the component's internal state management

## 📖 Related Documentation

- **Modus Web Components Storybook:** https://trimble-oss.github.io/modus-wc-2.0/main/
- **Development Workflow Guidelines:** `development_workflow.instructions.md`
- **Implementation Guide Standards:** `implementation_guides.instructions.md`
- **AGENTS.md:** AI coding assistant guidelines
- **CLAUDE.md:** Detailed technical patterns

---

**Remember:** Modus Web Components are self-contained and manage their own state. React's role is to observe and respond, not to control.

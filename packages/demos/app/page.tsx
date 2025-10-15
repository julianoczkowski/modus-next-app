import Link from "next/link";
import ModusButton from "../../app/components/ModusButton";

export default function DemosHome() {
  const demoCategories = [
    {
      title: "Form Components",
      description: "Input fields, buttons, and form controls",
      demos: [
        { name: "Buttons", path: "/button-demo", icon: "add" },
        {
          name: "Text Input",
          path: "/text-input-demo",
          icon: "edit_combination",
        },
        { name: "Select", path: "/select-demo", icon: "expand_more" },
        { name: "Checkbox", path: "/checkbox-demo", icon: "check" },
        { name: "Radio", path: "/radio-demo", icon: "radio_button_checked" },
        { name: "Switch", path: "/switch-demo", icon: "toggle_on" },
        { name: "Slider", path: "/slider-demo", icon: "tune" },
        { name: "Date", path: "/date-demo", icon: "calendar_today" },
        { name: "Time", path: "/time-input-demo", icon: "schedule" },
        { name: "Number", path: "/number-input-demo", icon: "numbers" },
        { name: "Textarea", path: "/textarea-demo", icon: "text_fields" },
        { name: "Autocomplete", path: "/autocomplete-demo", icon: "search" },
        { name: "Rating", path: "/rating-demo", icon: "star" },
      ],
    },
    {
      title: "Layout Components",
      description: "Cards, dividers, and layout containers",
      demos: [
        { name: "Cards", path: "/card-demo", icon: "dashboard" },
        { name: "Accordion", path: "/accordion-demo", icon: "expand_more" },
        { name: "Divider", path: "/divider-demo", icon: "horizontal_rule" },
        {
          name: "Utility Panel",
          path: "/utility-panel-demo",
          icon: "view_sidebar",
        },
        { name: "Toolbar", path: "/toolbar-demo", icon: "construction" },
        { name: "Skeleton", path: "/skeleton-demo", icon: "view_quilt" },
      ],
    },
    {
      title: "Navigation Components",
      description: "Menus, breadcrumbs, and navigation elements",
      demos: [
        { name: "Navbar", path: "/navbar-demo", icon: "menu" },
        {
          name: "Side Navigation",
          path: "/side-navigation-demo",
          icon: "view_sidebar",
        },
        {
          name: "Breadcrumbs",
          path: "/breadcrumbs-demo",
          icon: "chevron_right",
        },
        { name: "Tabs", path: "/tabs-demo", icon: "tab" },
        { name: "Menu", path: "/menu-demo", icon: "more_vert" },
        { name: "Dropdown", path: "/dropdown-demo", icon: "arrow_drop_down" },
        { name: "Pagination", path: "/pagination-demo", icon: "first_page" },
        { name: "Stepper", path: "/stepper-demo", icon: "trending_up" },
      ],
    },
    {
      title: "Display Components",
      description: "Icons, avatars, and data display",
      demos: [
        { name: "Icons", path: "/icon-demo", icon: "palette" },
        { name: "Avatars", path: "/avatar-demo", icon: "person" },
        { name: "Badges", path: "/badge-demo", icon: "label" },
        { name: "Chips", path: "/chip-demo", icon: "tag" },
        { name: "Table", path: "/table-demo", icon: "table_chart" },
        { name: "Progress", path: "/progress-demo", icon: "trending_up" },
      ],
    },
    {
      title: "Feedback Components",
      description: "Alerts, toasts, and user feedback",
      demos: [
        { name: "Alerts", path: "/alert-demo", icon: "info" },
        { name: "Toast", path: "/toast-demo", icon: "notifications" },
        { name: "Tooltip", path: "/tooltip-demo", icon: "help" },
        { name: "Loader", path: "/loader-demo", icon: "refresh" },
        {
          name: "Input Feedback",
          path: "/input-feedback-demo",
          icon: "feedback",
        },
        { name: "Input Label", path: "/input-label-demo", icon: "label" },
      ],
    },
    {
      title: "Overlay Components",
      description: "Modals and overlay interfaces",
      demos: [
        { name: "Modal", path: "/modal-demo", icon: "open_in_full" },
        {
          name: "Theme Switcher",
          path: "/theme-switcher-demo",
          icon: "brightness",
        },
      ],
    },
    {
      title: "Utilities & Testing",
      description: "Development tools and utilities",
      demos: [
        { name: "All Components", path: "/components-demo", icon: "apps" },
        { name: "Color Palette", path: "/color-palette", icon: "palette" },
        { name: "Typography", path: "/typography-test", icon: "text_fields" },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 w-full bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-4xl font-semibold mb-4 text-foreground">
            Modus Components Demo
          </div>
          <div className="text-lg leading-relaxed text-foreground text-center max-w-3xl mx-auto">
            Interactive examples and implementation patterns for all Modus Web
            Components. Explore components, test interactions, and see how to
            implement them in your projects.
          </div>
        </div>

        {/* Demo Categories */}
        <div className="space-y-12">
          {demoCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="mb-6">
                <div className="text-2xl font-semibold mb-2 text-foreground">
                  {category.title}
                </div>
                <div className="text-muted-foreground">
                  {category.description}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {category.demos.map((demo, demoIndex) => (
                  <Link
                    key={demoIndex}
                    href={demo.path}
                    className="block bg-card rounded-lg p-4 hover:bg-secondary transition-colors"
                    style={{ border: "1px solid var(--border)" }}
                  >
                    <div className="flex items-center gap-3">
                      <i className="modus-icons text-xl text-primary">
                        {demo.icon}
                      </i>
                      <div className="text-sm font-medium text-foreground">
                        {demo.name}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-16 text-center">
          <div className="text-lg font-semibold mb-4 text-foreground">
            Quick Actions
          </div>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/components-demo">
              <ModusButton color="primary" size="lg">
                <i className="modus-icons mr-2">apps</i>
                View All Components
              </ModusButton>
            </Link>
            <Link href="/color-palette">
              <ModusButton color="secondary" size="lg">
                <i className="modus-icons mr-2">palette</i>
                Color Palette
              </ModusButton>
            </Link>
            <Link href="/typography-test">
              <ModusButton color="tertiary" size="lg">
                <i className="modus-icons mr-2">text_fields</i>
                Typography
              </ModusButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import ModusPagination, {
  AriaLabelValues,
} from "../components/ModusPagination";

export default function PaginationDemo() {
  const [basicPage, setBasicPage] = useState(3);
  const [textButtonPage, setTextButtonPage] = useState(5);
  const [localizedPage, setLocalizedPage] = useState(2);

  const localizedAriaLabels: AriaLabelValues = useMemo(
    () => ({
      firstPage: "Primera página",
      previousPage: "Página anterior",
      page: "Página {0}",
      nextPage: "Siguiente página",
      lastPage: "Última página",
    }),
    []
  );

  const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <div className="text-4xl font-semibold text-foreground mb-4">
          Modus Pagination Component Demo
        </div>
        <p className="text-lg text-foreground opacity-80">
          Navigate between pages of content with consistent Modus styling,
          accessibility, and flexible configuration options.
        </p>
      </div>

      {/* Basic controlled pagination */}
      <div
        className="mb-12 p-8 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Basic Usage
        </div>
        <p className="text-foreground opacity-80 mb-6">
          The pagination component manages page navigation while your React
          state keeps track of the current page. Click a button to update the
          selected page.
        </p>
        <div className="flex flex-col gap-4 items-center">
          <ModusPagination
            ariaLabel="Content navigation"
            count={12}
            page={basicPage}
            onPageChange={(event) => setBasicPage(event.detail.newPage)}
          />
          <div className="text-sm text-foreground opacity-80">
            Current page: <strong>{basicPage}</strong>
          </div>
        </div>
      </div>

      {/* Size variations */}
      <div
        className="mb-12 p-8 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Size Variations
        </div>
        <p className="text-foreground opacity-80 mb-6">
          Choose between small, medium, and large button sizes to match the
          density of your layout or surrounding controls.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sizes.map((size) => (
            <div
              key={size}
              className="p-6 rounded-lg border border-border bg-background flex flex-col items-center gap-4"
              style={{ borderWidth: "1px" }}
            >
              <div className="text-lg font-medium text-foreground capitalize">
                {size} size
              </div>
              <ModusPagination
                ariaLabel={`${size} pagination example`}
                count={8}
                page={4}
                size={size}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Custom button labels */}
      <div
        className="mb-12 p-8 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Custom Button Text
        </div>
        <p className="text-foreground opacity-80 mb-6">
          Replace the default chevron icons with descriptive labels to better
          align with your application language or design requirements.
        </p>
        <div className="flex flex-col gap-4 items-center">
          <ModusPagination
            count={15}
            page={textButtonPage}
            prevButtonText="Previous"
            nextButtonText="Next"
            onPageChange={(event) => setTextButtonPage(event.detail.newPage)}
          />
          <div className="text-sm text-foreground opacity-80">
            Current page: <strong>{textButtonPage}</strong>
          </div>
        </div>
      </div>

      {/* Localised aria labels */}
      <div
        className="p-8 bg-card rounded-lg border border-border"
        style={{ borderWidth: "1px" }}
      >
        <div className="text-2xl font-semibold text-foreground mb-6">
          Localised Accessibility Labels
        </div>
        <p className="text-foreground opacity-80 mb-6">
          Provide translated <code>aria-label</code> strings for assistive
          technologies. Use the <code>{"{0}"}</code> token to inject the page
          number into the announcement.
        </p>
        <div className="flex flex-col gap-4 items-center">
          <ModusPagination
            ariaLabel="Paginación de contenido"
            ariaLabelValues={localizedAriaLabels}
            count={10}
            page={localizedPage}
            onPageChange={(event) => setLocalizedPage(event.detail.newPage)}
          />
          <div className="text-sm text-foreground opacity-80">
            Página actual: <strong>{localizedPage}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

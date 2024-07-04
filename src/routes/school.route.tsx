import React, { Suspense } from "react";
const SchoolPage = React.lazy(() => import("../pages/school-page"));

export default function SchoolRoute() {
  return (
    <Suspense fallback="School ...">
      <SchoolPage />
    </Suspense>
  );
}

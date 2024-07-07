import React, { Suspense } from "react";
const IdPage = React.lazy(() => import("../pages/id-page"));

export default function StudentIDRoute() {
  return (
    <Suspense fallback="Student ID ...">
      <IdPage />
    </Suspense>
  );
}

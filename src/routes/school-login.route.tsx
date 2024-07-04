import React, { Suspense } from "react";
const SchoolLoginPage = React.lazy(() => import("../pages/school-login-page"));

export default function SchoolLoginRoute() {
  return (
    <Suspense fallback="School Login ...">
      <SchoolLoginPage />
    </Suspense>
  );
}

import React, { Suspense } from "react";
const SchoolRegisterPage = React.lazy(() => import("../pages/school-register-page"));

export default function SchoolRegisterRoute() {
  return (
    <Suspense fallback="School Register ...">
      <SchoolRegisterPage />
    </Suspense>
  );
}

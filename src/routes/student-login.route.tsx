import React, { Suspense } from "react";
const StudentLoginPage = React.lazy(() => import("../pages/student-login-page"));

export default function StudentLoginRoute() {
  return (
    <Suspense fallback="Student Login ...">
      <StudentLoginPage />
    </Suspense>
  );
}

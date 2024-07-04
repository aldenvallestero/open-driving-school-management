import React, { Suspense } from "react";
const StudentRegisterPage = React.lazy(() => import("../pages/student-register-page"));

export default function StudentRegisterRoute() {
  return (
    <Suspense fallback="Student Register ...">
      <StudentRegisterPage />
    </Suspense>
  );
}

import React, { Suspense } from "react";
const StudentPage = React.lazy(() => import("../pages/student-page"));

export default function StudentRoute() {
  return (
    <Suspense fallback="Student ...">
      <StudentPage />
    </Suspense>
  );
}

// app/solutions/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import SolutionsClient from "./SolutionsClient";

export default function Page() {
  return <SolutionsClient />;
}

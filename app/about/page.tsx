// app/about/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import AboutClient from "./AboutClient";

export default function Page() {
  return <AboutClient />;
}

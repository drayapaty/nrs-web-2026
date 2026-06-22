"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function LoadingBar() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => setShow(false), 400);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!show) return null;

  return <div className="loading-bar" style={{ width: "100%" }} />;
}

import React, { useEffect } from "react";

export default function CalcPage() {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return <div></div>;
}

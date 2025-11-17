import React from "react";
import type { PageProps } from "./types";

const Page: React.FC<PageProps> = ({ title, children }) => {
  return (
    <div data-testid="page-container" style={{ backgroundColor: "#f5f5f5" }}>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default Page;

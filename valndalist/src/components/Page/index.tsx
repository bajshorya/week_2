import React from "react";
import type { PageProps } from "./types";

const Page: React.FC<PageProps> = ({ title, children }) => {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default Page;

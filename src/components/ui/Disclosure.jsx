import React from "react";
import { Plus } from "./Icons";

export default function Disclosure({ title, children, defaultOpen = false, id }) {
  return (
    <details className="disclosure" id={id} open={defaultOpen || undefined}>
      <summary className="disclosure__btn">
        {title}
        <Plus className="disclosure__icon" />
      </summary>
      <div className="disclosure__body">{children}</div>
    </details>
  );
}

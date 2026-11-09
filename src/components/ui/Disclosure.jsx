import React, { useState, useId } from "react";
import { Plus } from "./Icons";

export default function Disclosure({ title, children, defaultOpen = false, id }) {
  const [open, setOpen] = useState(defaultOpen);
  const uid = useId();
  return (
    <div className="disclosure" id={id}>
      <h3>
        <button type="button" className="disclosure__btn" aria-expanded={open} aria-controls={`${uid}-body`} onClick={() => setOpen(!open)}>
          {title}
          <Plus className="disclosure__icon" />
        </button>
      </h3>
      <div id={`${uid}-body`} hidden={!open} className="disclosure__body">
        {children}
      </div>
    </div>
  );
}

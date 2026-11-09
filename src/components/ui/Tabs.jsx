import React, { useRef } from "react";

/**
 * Accessible tabs (WAI-ARIA tabs pattern): roving tabindex, arrow/Home/End keys.
 * Selection never changes on its own. `renderPanel` receives the active tab id.
 */
export default function Tabs({ idPrefix, label, tabs, value, onChange, renderPanel, variant }) {
  const refs = useRef({});

  const onKeyDown = (e) => {
    const i = tabs.findIndex((t) => t.id === value);
    let next = null;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    if (next === null) return;
    e.preventDefault();
    const id = tabs[next].id;
    onChange(id);
    refs.current[id]?.focus();
  };

  return (
    <div className={`tabs${variant ? ` tabs--${variant}` : ""}`}>
      <div className="tabs__list" role="tablist" aria-label={label} onKeyDown={onKeyDown}>
        {tabs.map((t) => (
          <button
            key={t.id}
            ref={(el) => (refs.current[t.id] = el)}
            role="tab"
            type="button"
            id={`${idPrefix}-tab-${t.id}`}
            aria-selected={value === t.id}
            aria-controls={`${idPrefix}-panel-${t.id}`}
            tabIndex={value === t.id ? 0 : -1}
            className="tabs__tab"
            onClick={() => onChange(t.id)}
          >
            <span className="tabs__dot" aria-hidden="true" />
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${idPrefix}-panel-${t.id}`}
          aria-labelledby={`${idPrefix}-tab-${t.id}`}
          hidden={value !== t.id}
          tabIndex={0}
          className="tabs__panel"
        >
          {value === t.id ? renderPanel(t.id) : null}
        </div>
      ))}
    </div>
  );
}

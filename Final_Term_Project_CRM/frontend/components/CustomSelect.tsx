"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

export interface SelectOption {
  value: string;
  label: string;
  icon?: string;
  color?: string;
  bg?: string;
  border?: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  variant?: "default" | "pill";
}

function Dropdown({
  options,
  value,
  onSelect,
  anchorRect,
  variant,
}: {
  options: SelectOption[];
  value: string;
  onSelect: (v: string) => void;
  anchorRect: DOMRect;
  variant: "default" | "pill";
}) {
  const dropdownHeight = options.length * 42 + 8;
  const spaceBelow = window.innerHeight - anchorRect.bottom;
  const openUpward = spaceBelow < dropdownHeight + 16;

  const style: React.CSSProperties = {
    position: "fixed",
    zIndex: 99999,
    background: "var(--color-mantle, #181825)",
    border: "1px solid var(--color-surface1, #45475a)",
    borderRadius: "0.75rem",
    boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)",
    minWidth: variant === "pill" ? "160px" : `${anchorRect.width}px`,
    overflow: "hidden",
    animation: "fadeIn 0.12s ease",
    left: variant === "pill"
      ? `${anchorRect.left + anchorRect.width / 2}px`
      : `${anchorRect.left}px`,
    transform: variant === "pill" ? "translateX(-50%)" : "none",
    ...(openUpward
      ? { bottom: `${window.innerHeight - anchorRect.top + 4}px`, top: "auto" }
      : { top: `${anchorRect.bottom + 4}px` }),
  };

  return createPortal(
    <div style={style}>
      {options.map((opt) => (
        <button
          key={opt.value}
          onMouseDown={(e) => { e.preventDefault(); onSelect(opt.value); }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            width: "100%",
            padding: "0.575rem 0.875rem",
            background: value === opt.value ? (opt.bg || "rgba(203,166,247,0.1)") : "transparent",
            color: opt.color || "var(--color-text, #cdd6f4)",
            border: "none",
            borderLeft: value === opt.value
              ? `3px solid ${opt.color || "var(--color-mauve, #cba6f7)"}`
              : "3px solid transparent",
            cursor: "pointer",
            fontSize: "0.8125rem",
            fontWeight: value === opt.value ? 600 : 400,
            textAlign: "left",
            transition: "background 0.12s ease",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            if (value !== opt.value)
              (e.currentTarget as HTMLButtonElement).style.background = "var(--color-surface0, #313244)";
          }}
          onMouseLeave={(e) => {
            if (value !== opt.value)
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
          }}
        >
          {opt.icon && <span style={{ fontSize: "0.875rem" }}>{opt.icon}</span>}
          <span style={{ flex: 1 }}>{opt.label}</span>
          {value === opt.value && (
            <span style={{ fontSize: "0.7rem", color: opt.color || "var(--color-mauve, #cba6f7)", marginLeft: "auto" }}>✓</span>
          )}
        </button>
      ))}
    </div>,
    document.body
  );
}

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select...",
  disabled = false,
  id,
  variant = "default",
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const selected = options.find((o) => o.value === value);

  const handleToggle = useCallback(() => {
    if (disabled) return;
    if (btnRef.current) setRect(btnRef.current.getBoundingClientRect());
    setOpen((o) => !o);
  }, [disabled]);

  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
  };

  // Close on outside click or scroll
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (btnRef.current && !btnRef.current.contains(e.target as Node)) setOpen(false);
    };
    const closeScroll = () => setOpen(false);
    document.addEventListener("mousedown", close);
    window.addEventListener("scroll", closeScroll, true);
    return () => {
      document.removeEventListener("mousedown", close);
      window.removeEventListener("scroll", closeScroll, true);
    };
  }, [open]);

  if (variant === "pill") {
    return (
      <div style={{ position: "relative", display: "inline-block" }} id={id}>
        <button
          ref={btnRef}
          type="button"
          disabled={disabled}
          onClick={handleToggle}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem",
            padding: "0.22rem 0.625rem",
            paddingRight: "1.4rem",
            borderRadius: "9999px",
            fontSize: "0.75rem",
            fontWeight: 600,
            cursor: disabled ? "wait" : "pointer",
            border: `1px solid ${selected?.border || "rgba(166,173,200,0.2)"}`,
            backgroundColor: selected?.bg || "rgba(166,173,200,0.1)",
            color: selected?.color || "var(--color-overlay2)",
            outline: "none",
            transition: "all 0.2s ease",
            position: "relative",
            whiteSpace: "nowrap",
          }}
        >
          {selected?.icon && <span>{selected.icon}</span>}
          <span>{selected?.label || placeholder}</span>
          <span style={{
            position: "absolute",
            right: "0.4rem",
            top: "50%",
            transform: `translateY(-50%) rotate(${open ? "180deg" : "0deg"})`,
            transition: "transform 0.2s ease",
            fontSize: "0.5rem",
            opacity: 0.75,
            lineHeight: 1,
          }}>▼</span>
        </button>
        {open && rect && (
          <Dropdown options={options} value={value} onSelect={handleSelect} anchorRect={rect} variant="pill" />
        )}
      </div>
    );
  }

  // Default full-width form style
  return (
    <div style={{ position: "relative" }} id={id}>
      <button
        ref={btnRef}
        type="button"
        disabled={disabled}
        onClick={handleToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.625rem 0.875rem",
          background: "var(--color-surface0)",
          border: open ? "1px solid var(--color-mauve)" : "1px solid var(--color-surface1)",
          borderRadius: "0.5rem",
          color: selected ? "var(--color-text)" : "var(--color-overlay0)",
          fontSize: "0.875rem",
          cursor: disabled ? "not-allowed" : "pointer",
          outline: "none",
          textAlign: "left",
          transition: "all 0.2s ease",
          boxShadow: open ? "0 0 0 3px rgba(203, 166, 247, 0.15)" : "none",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {selected?.icon && <span>{selected.icon}</span>}
          <span style={{ color: selected?.color || "var(--color-text)" }}>
            {selected?.label || placeholder}
          </span>
        </span>
        <span style={{
          fontSize: "0.6rem",
          color: "var(--color-subtext0)",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease",
          marginLeft: "0.5rem",
          flexShrink: 0,
        }}>▼</span>
      </button>
      {open && rect && (
        <Dropdown options={options} value={value} onSelect={handleSelect} anchorRect={rect} variant="default" />
      )}
    </div>
  );
}


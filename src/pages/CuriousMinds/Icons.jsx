const PATHS = {
  chip: (
    <>
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </>
  ),
  code: <path d="m8 8-5 4 5 4M16 8l5 4-5 4" />,
  bars: <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" />,
  nodes: (
    <>
      <circle cx="6" cy="12" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="18" cy="18" r="2" />
      <path d="m8 11 8-4M8 13l8 4" />
    </>
  ),
  layers: <path d="m12 3 9 5-9 5-9-5 9-5ZM3 13l9 5 9-5" />,
  medal: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="m8.5 14-1.5 8 5-3 5 3-1.5-8" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="m5 12 5 5 9-10" />,
  plus: <path d="M12 5v14M5 12h14" />,
  chat: <path d="M4 5h16v11H9l-5 4V5ZM8 10h8M8 13h5" />,
  menu: <path d="M3 7h18M3 12h18M3 17h18" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  whatsapp: null,
};

export function Icon({ name, className = "" }) {
  return (
    <svg className={`cm-icon ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      {PATHS[name]}
    </svg>
  );
}

export function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="cm-wa-icon">
      <path d="M12 2.5a9.5 9.5 0 0 0-8.1 14.4L2.5 21.5l4.7-1.2A9.5 9.5 0 1 0 12 2.5Zm4.8 13.3c-.2.6-1.2 1.1-1.7 1.2-.4.1-1 .1-1.6-.1-1.6-.5-3.3-1.6-4.6-3.3-.9-1.1-1.4-2.2-1.4-3.3 0-.9.5-1.5.7-1.7.2-.2.4-.3.6-.3h.4c.2 0 .4 0 .5.4l.8 1.9c.1.2 0 .4-.1.5l-.4.5c-.1.1-.2.3-.1.5.4.7 1.4 1.9 2.7 2.4.2.1.4.1.5-.1l.7-.9c.2-.2.3-.2.5-.1l1.8.9c.2.1.4.2.4.3.1.2.1.7-.2 1.3Z" />
    </svg>
  );
}

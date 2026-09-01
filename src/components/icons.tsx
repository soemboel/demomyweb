type IconProps = {
  className?: string;
};

export function GithubIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M9.5 19.5c-4.2 1.2-4.2-2.3-6-2.7m12 4.7v-3.1c0-.9.1-1.3-.4-1.8 2.6-.3 5.3-1.3 5.3-5.7 0-1.3-.4-2.3-1.2-3.1.1-.3.6-1.5-.1-3.1 0 0-1-.3-3.2 1.2a11 11 0 0 0-5.8 0C7.9 5.1 6.9 5.4 6.9 5.4c-.7 1.6-.2 2.8-.1 3.1-.8.8-1.2 1.8-1.2 3.1 0 4.4 2.7 5.4 5.3 5.7-.4.4-.5.9-.5 1.5v3.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LinkedinIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7.4 10.4v6.2M7.4 7.3v.1M11.2 16.6v-3.6c0-1.4 1-2.6 2.5-2.6s2.5 1.2 2.5 2.6v3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function InstagramIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="4.6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16.9" cy="7.1" r="1.15" fill="currentColor" />
    </svg>
  );
}

export function MailIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3.2" y="5.2" width="17.6" height="13.6" rx="2.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4.4 7 6.6 5.6c.6.5 1.4.5 2 0L19.6 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUpRight({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7 17 17 7M9.5 7H17v7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FolderIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M3.6 7.2c0-1 .8-1.8 1.8-1.8h4l2 2.4h7.2c1 0 1.8.8 1.8 1.8v8.8c0 1-.8 1.8-1.8 1.8H5.4c-1 0-1.8-.8-1.8-1.8V7.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M3.6 10h16.8" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function BranchIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="6.5" cy="5.5" r="2.1" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="6.5" cy="18.5" r="2.1" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="7.5" r="2.1" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6.5 7.6v8.8M17.5 9.6c0 3.4-3.2 4.6-8.6 4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function StarIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="m12 3.6 2.5 5.1 5.6.8-4 4 .9 5.6-5-2.6-5 2.6.9-5.6-4-4 5.6-.8L12 3.6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m4.5 12.8 4.6 4.6L19.5 6.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PinIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 21s6.8-5.4 6.8-11A6.8 6.8 0 0 0 5.2 10c0 5.6 6.8 11 6.8 11Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.8" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function GraduationIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m2.8 8.6 9.2-4 9.2 4-9.2 4-9.2-4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M6.5 10.8v4.4c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8v-4.4M21.2 9v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function CopyIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="8.6" y="8.6" width="11.8" height="11.8" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M15.4 5.4v-.8a2 2 0 0 0-2-2H5.6a2 2 0 0 0-2 2v7.8a2 2 0 0 0 2 2h.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function TerminalGlyph({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2.8" y="4.4" width="18.4" height="15.2" rx="2.4" stroke="currentColor" strokeWidth="1.6" />
      <path d="m6.8 9 3.4 3-3.4 3M12.6 15.4h4.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChipIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="6.2" y="6.2" width="11.6" height="11.6" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="9.8" y="9.8" width="4.4" height="4.4" rx="0.8" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M9.4 6.2V3.4M14.6 6.2V3.4M9.4 20.6v-2.8M14.6 20.6v-2.8M6.2 9.4H3.4M6.2 14.6H3.4M20.6 9.4h-2.8M20.6 14.6h-2.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AsteriskIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3.4v17.2M4.6 7.7l14.8 8.6M19.4 7.7 4.6 16.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

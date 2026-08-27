// Japan Trip Guide — icon set
// Extracted from the standalone HTML build. Each icon is a React component
// that renders an inline SVG using currentColor, so it inherits color from CSS
// (e.g. set `color: var(--japan-shu-bright)` on a wrapping badge).
//
// Usage:
//   import { IconBadge, FishIcon } from './japan-icons';
//   <IconBadge><FishIcon /></IconBadge>
//
// Or look one up dynamically by the same keys used in the MDX content
// (the emoji prefixes in japan-2024.mdx map 1:1 to these keys — see ICON_KEY_MAP):
//   import { ICONS } from './japan-icons';
//   const Icon = ICONS['teamlab'];

import React from 'react';

export function FishIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12c3-4 8-6 13-6 3 0 5.5 2.5 7 6-1.5 3.5-4 6-7 6-5 0-10-2-13-6z" />
      <path d="M15 6l4-3-1 5" />
      <path d="M15 18l4 3-1-5" />
      <circle cx="7" cy="11" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MonkeyIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="13" r="6" />
      <circle cx="6.5" cy="9" r="2.3" />
      <circle cx="17.5" cy="9" r="2.3" />
      <ellipse cx="12" cy="15" rx="3" ry="2.2" />
      <circle cx="9.5" cy="12" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="12" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ToriiIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6.5c3-1.2 15-1.2 18 0" />
      <path d="M2 9h20" />
      <path d="M6 9v11" />
      <path d="M18 9v11" />
      <path d="M9.5 12.5h5" />
    </svg>
  );
}

export function DeerIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 5c-1-1.5-2.5-2-3.5-1.5M9 5c.5-1.8 0-3-1-3.7M15 5c1-1.5 2.5-2 3.5-1.5M15 5c-.5-1.8 0-3 1-3.7" />
      <circle cx="12" cy="9" r="3.2" />
      <path d="M9 12c-2.5 1-4 3.5-4 6.5" />
      <path d="M15 12c2.5 1 4 3.5 4 6.5" />
      <circle cx="10.8" cy="8.5" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="13.2" cy="8.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TeamLabIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3c-4 2-4 6 0 8-4 2-4 6 0 8" />
      <path d="M12 3c4 2 4 6 0 8 4 2 4 6 0 8" />
      <circle cx="12" cy="11" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SumoIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="7" r="2.2" />
      <path d="M9 9.2c-2.5 0-4 2-4 5v5h8v-5c0-3-1.5-5-4-5z" />
      <circle cx="17" cy="8" r="1.6" opacity="0.55" />
      <path d="M17 9.6c-1.8 0-3 1.6-3 4v4.4h6V13.6c0-2.4-1.2-4-3-4z" opacity="0.55" />
    </svg>
  );
}

export function TowerIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l4 18H8l4-18z" />
      <path d="M9.5 9h5M8.7 13h6.6M7.8 17h8.4" />
      <path d="M10.5 22h3" />
    </svg>
  );
}

export function ShipIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14h16l-2 5H6l-2-5z" />
      <path d="M12 14V4" />
      <path d="M12 5l6 4-6 2" />
      <path d="M2 18c1.5 1.5 3 1.5 4.5 0s3-1.5 4.5 0 3 1.5 4.5 0 3-1.5 4.5 0" />
    </svg>
  );
}

export function ShurikenIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z" />
    </svg>
  );
}

export function BearIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="13" r="6" />
      <circle cx="6.5" cy="7.5" r="2.2" />
      <circle cx="17.5" cy="7.5" r="2.2" />
      <circle cx="12" cy="14" r="2" opacity="0.6" />
      <circle cx="9.3" cy="11.5" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="14.7" cy="11.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TempleIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l9 5H3l9-5z" />
      <path d="M4 9h16v2H4z" />
      <path d="M6 12v8M18 12v8M10 12v8M14 12v8" />
      <path d="M3 20h18" />
    </svg>
  );
}

export function SwirlIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21c-1.5-3 0-4 1.5-6s1-4-.5-5.5S9.5 8 11 6.5 12 3 12 3" />
      <path d="M12 21c3-.5 6-3 6-7s-2.5-7-6-7" />
    </svg>
  );
}

export function BoatIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 15h18l-2.5 5h-13L3 15z" />
      <path d="M12 15V5l5 3-5 2" />
      <path d="M5 15V11h4v4" />
    </svg>
  );
}

export function FishingRodIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 21l9-15" />
      <path d="M12 6l8-2-2 4" />
      <path d="M13 13c1.5 2 1.5 4.5-1 6-1.5-1-2-3-1-4.5" />
    </svg>
  );
}

export function BallIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18" opacity="0.5" />
    </svg>
  );
}

export function NoodleIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 11c0-1 .5-1.6 1.5-1.6S7 10 8 10s1.5-.6 2.5-.6S12 10 13 10s1.5-.6 2.5-.6S17 10 18 10s1.5-.6 2-.6" />
      <path d="M3 11h18l-1.5 8a2 2 0 01-2 1.7H6.5a2 2 0 01-2-1.7L3 11z" />
    </svg>
  );
}

export function KimonoIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l-2.5 2v3L4 12v9h16v-9l-5.5-4V5z" />
      <path d="M9.5 8L7 21M14.5 8L17 21" />
      <path d="M9.5 5l2.5 3 2.5-3" />
    </svg>
  );
}

export function BambooIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 2v20M17 2v20" />
      <path d="M4 6h6M4 11h6M4 16h6M14 6h6M14 11h6M14 16h6" />
    </svg>
  );
}

export function TeacupIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10h13v5a5 5 0 01-5 5H9a5 5 0 01-5-5v-5z" />
      <path d="M17 11h2a2.5 2.5 0 010 5h-2" />
      <path d="M8 6c0-1 1-1 1-2M12 6c0-1 1-1 1-2" opacity="0.6" />
    </svg>
  );
}

export function BuddhaIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="6" r="2.5" />
      <path d="M7 21c0-4 2-7 5-7s5 3 5 7" />
      <path d="M5 21h14" />
      <path d="M8.5 14.5c.5 1 2 1.5 3.5 1.5s3-.5 3.5-1.5" />
    </svg>
  );
}

export function MochiIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="15" rx="7" ry="5" />
      <path d="M12 2v6M9 4.5l3 3.5 3-3.5" opacity="0.7" />
      <circle cx="9.5" cy="14" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="14" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function OrcaIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 14c4-6 10-9 16-7 2 .7 4 2.5 4 2.5s-2 .5-3.5 0c1 2 1 5-1 7-3 3-9 3-13-1l-2.5-1.5z" />
      <path d="M9 8v3M9 8l3-3" />
      <circle cx="6" cy="13" r="0.6" fill="var(--japan-indigo-deep, #131F38)" stroke="none" />
    </svg>
  );
}

export function CastleIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 21V9l2-2v2h2V7l2-2v2h4V5l2 2v2h2V7l2 2v10" />
      <path d="M4 21h16" />
      <path d="M9 21v-5h6v5" />
    </svg>
  );
}

export function LeafIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20c8 0 16-6 16-16-8 0-16 6-16 16z" />
      <path d="M4 20c3-6 8-10 13-13" />
    </svg>
  );
}

export function RopewayIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 6l20 3" />
      <rect x="9" y="10" width="6" height="5" rx="1" />
      <path d="M10.5 10V8M13.5 10V8" />
    </svg>
  );
}

export function OnsenIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14c0-1 1-2 2-2s1.5 1 2.5 1 1.5-1 2.5-1 1.5 1 2.5 1 1.5-1 2.5-1 2 1 2 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4z" />
      <path d="M9 6c0-1.2 1-1.2 1-2.4M13 6c0-1.2 1-1.2 1-2.4" opacity="0.6" />
    </svg>
  );
}

export function SculptureIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="7" r="3" />
      <path d="M8 21l1-8h6l1 8" />
      <path d="M9 13h6" />
    </svg>
  );
}

export function IconBadge({ children }: { children: React.ReactNode }) {
  return <span className="icon-badge">{children}</span>;
}

export const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  fish: FishIcon,
  monkey: MonkeyIcon,
  torii: ToriiIcon,
  deer: DeerIcon,
  teamlab: TeamLabIcon,
  sumo: SumoIcon,
  tower: TowerIcon,
  ship: ShipIcon,
  shuriken: ShurikenIcon,
  bear: BearIcon,
  temple: TempleIcon,
  swirl: SwirlIcon,
  boat: BoatIcon,
  rod: FishingRodIcon,
  ball: BallIcon,
  noodle: NoodleIcon,
  kimono: KimonoIcon,
  bamboo: BambooIcon,
  teacup: TeacupIcon,
  buddha: BuddhaIcon,
  mochi: MochiIcon,
  orca: OrcaIcon,
  castle: CastleIcon,
  leaf: LeafIcon,
  ropeway: RopewayIcon,
  onsen: OnsenIcon,
  sculpture: SculptureIcon,
};

// Emoji used as a plain-text fallback in japan-2024.mdx — same keys as ICONS above.
// If you wire these components in, you can strip the emoji prefixes from the MDX
// card titles and render <IconBadge><ICONS[key] /></IconBadge> instead.
export const ICON_EMOJI_FALLBACK: Record<string, string> = {
  fish: '🐟',
  monkey: '🐒',
  torii: '⛩️',
  deer: '🦌',
  teamlab: '✨',
  sumo: '🤼',
  tower: '🗼',
  ship: '⛴️',
  shuriken: '🥷',
  bear: '🐻',
  temple: '🛕',
  swirl: '💩',
  boat: '⛵',
  rod: '🎣',
  ball: '🔴',
  noodle: '🍜',
  kimono: '👘',
  bamboo: '🎍',
  teacup: '🍵',
  buddha: '🙏',
  mochi: '🍡',
  orca: '🐋',
  castle: '🏯',
  leaf: '🍁',
  ropeway: '🚡',
  onsen: '♨️',
  sculpture: '🎨',
};

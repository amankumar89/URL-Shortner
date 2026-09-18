export function LogoMark({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9.5 14.5L14.5 9.5"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M11 6.5L12.5 5C14.1569 3.34315 16.8431 3.34315 18.5 5C20.1569 6.65685 20.1569 9.34315 18.5 11L17 12.5"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M13 17.5L11.5 19C9.84315 20.6569 7.15685 20.6569 5.5 19C3.84315 17.3431 3.84315 14.6569 5.5 13L7 11.5"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

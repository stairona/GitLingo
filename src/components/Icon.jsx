// Our own small icons, drawn as SVG on a 24x24 grid.
// Emoji look different on every computer and clash with our colors.
// These use `currentColor`, so an icon takes the text color of whatever it sits in.
const SHAPES = {
  home: (
    <>
      <path d="M3 11 12 4l9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-6h4v6" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  check: <path d="M5 12.5 10 17.5 19 7" />,
  star: (
    <path
      fill="currentColor"
      d="M12 3l2.8 5.9 6.2.7-4.6 4.4 1.2 6.3L12 17.2l-5.6 3.1 1.2-6.3L3 9.6l6.2-.7z"
    />
  ),
}

// Usage: <Icon name="lock" size={20} />
// aria-hidden because the icon is decoration: the words next to it say what it means.
function Icon({ name, size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {SHAPES[name]}
    </svg>
  )
}

export default Icon

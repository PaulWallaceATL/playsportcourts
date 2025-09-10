import { IconBase, type IconProps } from "./IconBase";

export default function Tennis(props: IconProps) {
  return (
    <IconBase {...props}>
      <ellipse cx="26" cy="26" rx="12" ry="18" />
      <path d="M18 18c6 6 14 6 20 0" />
      <path d="M34 34l10 10M41 45l7 7" />
      <circle cx="48" cy="16" r="3" />
    </IconBase>
  );
}

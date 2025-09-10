import { IconBase, type IconProps } from "./IconBase";

export default function Palette(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M32 12a20 20 0 1020 20c0-6-5-4-8-5-3-1-2-5-5-7-3-2-5-8-7-8z" />
      <circle cx="24" cy="26" r="2.5" />
      <circle cx="32" cy="22" r="2.5" />
      <circle cx="40" cy="26" r="2.5" />
      <circle cx="36" cy="34" r="2.5" />
    </IconBase>
  );
}



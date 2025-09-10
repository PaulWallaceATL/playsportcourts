import { IconBase, type IconProps } from "./IconBase";

export default function TileCourt(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="8" y="8" width="48" height="48" rx="8" />
      <path d="M8 32h48M32 8v48" />
      <circle cx="32" cy="32" r="6" />
    </IconBase>
  );
}



import { IconBase, type IconProps } from "./IconBase";

export default function MultiSport(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="22" cy="22" r="10" />
      <circle cx="42" cy="30" r="8" />
      <rect x="30" y="38" width="16" height="10" rx="2" />
      <path d="M22 12v20M12 22h20M42 22c4 0 8 0 8 8" />
    </IconBase>
  );
}

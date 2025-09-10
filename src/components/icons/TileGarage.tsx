import { IconBase, type IconProps } from "./IconBase";

export default function TileGarage(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="8" y="12" width="48" height="40" rx="6" />
      <path d="M16 24h32M16 32h32M16 40h32" />
    </IconBase>
  );
}



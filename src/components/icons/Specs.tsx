import { IconBase, type IconProps } from "./IconBase";

export default function Specs(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="16" y="12" width="32" height="40" rx="6" />
      <path d="M22 22h20M22 30h20M22 38h14" />
    </IconBase>
  );
}



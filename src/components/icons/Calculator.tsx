import { IconBase, type IconProps } from "./IconBase";

export default function Calculator(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="16" y="12" width="32" height="40" rx="6" />
      <rect x="22" y="18" width="20" height="8" rx="2" />
      <path d="M24 32h4M32 32h4M40 32h4M24 38h4M32 38h4M24 44h4M32 44h4M40 38h4M40 44h4" />
    </IconBase>
  );
}



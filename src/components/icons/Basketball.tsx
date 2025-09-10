import { IconBase, type IconProps } from "./IconBase";

export default function Basketball(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="32" cy="32" r="20" />
      <path d="M12 32h40M32 12v40M18 18l28 28M46 18L18 46" />
    </IconBase>
  );
}



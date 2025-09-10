import { IconBase, type IconProps } from "./IconBase";

export default function Gallery(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="10" y="14" width="44" height="36" rx="6" />
      <path d="M16 40l10-10 8 8 6-6 8 8" />
      <circle cx="24" cy="26" r="3" />
    </IconBase>
  );
}



type AdPlacement = "left-rail" | "right-rail" | "inline";
type AdSize = "rectangle" | "vertical" | "responsive";

type Props = {
  placement: AdPlacement;
  size: AdSize;
};

const adsEnabled = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";
const showDevelopmentPlaceholder = process.env.NODE_ENV !== "production";

const sizeClasses: Record<AdSize, string> = {
  rectangle: "min-h-[250px]",
  vertical: "min-h-[600px]",
  responsive: "min-h-[250px]",
};

const placementClasses: Record<AdPlacement, string> = {
  "left-rail": "w-full max-w-[250px]",
  "right-rail": "w-full max-w-[300px]",
  inline: "w-full",
};

export function AdSlot({ placement, size }: Props) {
  if (!adsEnabled && !showDevelopmentPlaceholder) return null;
  const placeholderClasses = showDevelopmentPlaceholder
    ? "rounded-xl border border-dashed border-slate-300 bg-slate-100 text-sm text-slate-500"
    : "";

  return (
    <div
      className={`flex ${placementClasses[placement]} ${sizeClasses[size]} items-center justify-center ${placeholderClasses}`}
      aria-hidden="true"
      data-ad-placement={placement}
      data-ad-size={size}
    >
      {showDevelopmentPlaceholder ? "광고 영역" : null}
    </div>
  );
}

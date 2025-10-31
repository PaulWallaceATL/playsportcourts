"use client";

interface StatusIndicatorProps {
  status: "success" | "warning" | "error" | "info" | "pending";
  text: string;
  pulse?: boolean;
  size?: "sm" | "md";
}

export function StatusIndicator({
  status,
  text,
  pulse = false,
  size = "md",
}: StatusIndicatorProps) {
  const statusConfig = {
    success: {
      class: "state-success",
      dot: "bg-emerald-400",
    },
    warning: {
      class: "state-warning",
      dot: "bg-yellow-400",
    },
    error: {
      class: "state-error",
      dot: "bg-red-400",
    },
    info: {
      class: "state-info",
      dot: "bg-blue-400",
    },
    pending: {
      class: "state-warning",
      dot: "bg-yellow-400",
    },
  };

  const config = statusConfig[status];
  const sizeClass = size === "sm" ? "text-xs px-2 py-1" : "text-sm px-3 py-1.5";

  return (
    <div
      className={`${config.class} ${sizeClass} rounded-lg inline-flex items-center gap-2 font-medium`}
    >
      <span
        className={`w-2 h-2 rounded-full ${config.dot} ${pulse ? "status-pulse" : ""}`}
      />
      {text}
    </div>
  );
}


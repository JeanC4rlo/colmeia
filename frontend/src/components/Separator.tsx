type SeparatorProps = {
  direction: "horizontal" | "vertical";
  containerRef: React.RefObject<HTMLDivElement | null>;
  onResize: (newRatio: number) => void;
};

export const Separator = ({ direction, containerRef, onResize }: SeparatorProps) => {
  const isHorizontal = direction === "horizontal";

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      let newRatio: number;

      if (isHorizontal) {
        const currentX = moveEvent.clientX - rect.left;
        newRatio = currentX / rect.width;
      } else {
        const currentY = moveEvent.clientY - rect.top;
        newRatio = currentY / rect.height;
      }

      const clampedRatio = Math.min(Math.max(newRatio, 0.1), 0.9);
      onResize(clampedRatio);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{
        flexShrink: 0,
        cursor: isHorizontal ? "col-resize" : "row-resize",
        zIndex: 10,
        userSelect: "none",
        ...(isHorizontal
          ? { width: "5px", height: "100%" }
          : { height: "5px", width: "100%" }),
      }}
      className="bg-transparent hover:bg-amber-500 transition-colors"
    />
  );
};
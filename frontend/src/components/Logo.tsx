import logoImage from "/colmeia.png";

export const Logo = () => {
  return (
    <div className="flex items-center h-full gap-2 select-none">
      <img
        src={logoImage}
        alt="Logo do Colmeia"
        className="h-full w-auto object-contain"
        draggable={false}
      />
      <span className="text-2xl font-bold">colmeia</span>
    </div>
  );
};
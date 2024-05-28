import { Languages } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex flex-row gap-5">
      <Languages width={42} height={42} />
      <span className="text-2xl self-center">EasyLang</span>
    </div>
  );
};

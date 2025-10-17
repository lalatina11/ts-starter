import { useTheme } from "next-themes";
import { Toaster } from "sonner";

const ToasterProvider = () => {
  const { theme, systemTheme } = useTheme();
  const isNotDark = () => {
    if (theme === "system") return systemTheme !== "dark";
    return theme !== "dark";
  };

  const isInvert = isNotDark();

  return <Toaster invert={isInvert} />;
};

export default ToasterProvider;

import { getNotificationIcon, getNotificationTheme } from "@/shared";
import { CheckCheck, X } from "lucide-react";
import { FC } from "react";

export type NotificationProps = {
  title: string;
  description: string;
  handleCloseNotification: (id: number) => void;
  variant: "success" | "error" | "warning";
};

export const Notificaion: FC<NotificationProps> = ({
  title,
  description,
  variant,
  handleCloseNotification,
}) => {
  const [accentColor, backgroundColor] = getNotificationTheme(variant);
  console.log(accentColor, backgroundColor);
  const Icon = getNotificationIcon(variant);
  return (
    <div
      className={`flex flex-row gap-3 w-[450px] z-30 border-2 rounded-sm border-[${accentColor}] bg-[${backgroundColor}] pt-4 pb-5 px-6 `}
      style={{
        border: `2px solid ${accentColor}`,
        backgroundColor: backgroundColor,
      }}
    >
      <div className="">{Icon}</div>
      <div>
        <h2 className="font-semibold">{title}</h2>
        <p className="text-sm text-[#757575]">{description}</p>
      </div>
      <X
        height={20}
        width={20}
        className="cursor-pointer absolute right-5"
        onClick={handleCloseNotification as any}
      />
    </div>
  );
};

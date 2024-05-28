import { Bell, BellDot, CheckCheck, LogOut, UserRound, X } from "lucide-react";
import { Logo } from "../Logo";
import { useGetSessionData, useLogout } from "@/shared/hooks";
import { useSession } from "next-auth/react";
import { Notificaion } from "../Notification";
import { useState } from "react";

export const Navbar = () => {
  const logout = useLogout();
  const { name, surname } = useGetSessionData();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      variant: "success",
      title: "The task has been sucessfully completed",
      description:
        "Congratulations, the client has accepted your translation. Payment will arrive in a few days.",
    },
    {
      id: 2,
      variant: "warning",
      title: "Warning",
      description:
        "We're a couple days away from turning in the assignment. Payment may be lower.",
    },
    {
      id: 3,
      variant: "error",
      title: "The assignment #2 has expired",
      description: "You're overdue for an assignment. Payment may be lower.",
    },
  ]);

  const handleCloseNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const handleCloseNotificationList = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="flex w-[100vw] bg-white z-50 justify-center items-center h-[90px]">
      <div className="flex justify-between w-2/3">
        <Logo />
        <div className="flex gap-10 self-center">
          <div className="flex gap-3">
            <span className="text-lg">{[name, surname].join(" ")}</span>
            <div className="flex flex-row relative">
              {!notifications.length ? (
                <Bell
                  className="cursor-pointer self-center"
                  onClick={handleCloseNotificationList}
                />
              ) : (
                <BellDot
                  className="cursor-pointer self-center"
                  onClick={handleCloseNotificationList}
                />
              )}
              {open && (
                <div className="flex flex-col gap-3 absolute right-0 top-[60px] z-10">
                  {notifications.map((notif) => (
                    <Notificaion
                      key={notif.id}
                      variant={notif.variant as any}
                      title={notif.title}
                      description={notif.description}
                      handleCloseNotification={() =>
                        handleCloseNotification(notif.id)
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          <LogOut
            className="cursor-pointer self-center"
            onClick={() => logout()}
          />
        </div>
      </div>
    </div>
  );
};

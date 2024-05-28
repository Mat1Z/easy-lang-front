import { BookMarked, Download, PinOff } from "lucide-react";
import { BorderLinearProgress } from "../MUI";
import {
  getDaysPassed,
  getPercentage,
  getReadableDate,
  OrderStatus,
  STATUS,
} from "@/shared/util";
import { StatusBar } from "../StatusBar";
import { FC, useState } from "react";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { CardResponse } from "@/shared";

export type OrderCardProps = {
  status: STATUS;
  id: number;
  title: string;
  totalPages: number;
  translatedPages: number;
  startedAt: null | string;
  deadlineAt: string;
  finishedAt: null | string;
  refetch: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      {
        data: CardResponse;
      },
      Error
    >
  >;
};

export const OrderCard: FC<OrderCardProps> = ({
  title,
  status,
  id,
  startedAt,
  totalPages,
  translatedPages,
  deadlineAt,
  refetch,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpenDialog = () => {
    setOpen((prev) => !prev);
  };

  const canUpload =
    status === STATUS.IN_PROGRESS ||
    status === STATUS.NOT_STARTED ||
    status === STATUS.OVERDUE;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col w-[800px] h-[330px] bg-white rounded-xl">
        <div className="p-7">
          <div className="flex justify-between">
            <div className="flex flex-row gap-1.5">
              <BookMarked width={30} height={30} />
              <span className="text-2xl self-center">{title}</span>
            </div>
            <div className="flex flex-row gap-5">
              {/* <PinOff width={30} height={30} className="cursor-pointer" /> */}
              {canUpload && (
                <Download
                  width={30}
                  height={30}
                  className="cursor-pointer"
                  onClick={handleOpenDialog}
                />
              )}
            </div>
          </div>
          <div className="flex justify-between mt-7">
            <ul className="flex flex-col gap-2">
              <li className="flex flex-row gap-1">
                <span className="text-[#bbb]">Order ID:</span>
                <span>#{id}</span>
              </li>
              <li className="flex flex-row gap-1">
                <span className="text-[#bbb]">Days gone:</span>
                {startedAt ? (
                  <span>
                    {getDaysPassed(startedAt, new Date())} days out of{" "}
                    {getDaysPassed(startedAt, deadlineAt)}
                  </span>
                ) : (
                  <span>Not started yet</span>
                )}
              </li>
              <li className="flex flex-row gap-1">
                <span className="text-[#bbb]">Started at:</span>
                <span>{getReadableDate(startedAt)}</span>
              </li>
              <li className="flex flex-row gap-1">
                <span className="text-[#bbb]">Translated:</span>
                <span>{translatedPages}</span>
              </li>
              <li className="flex flex-row gap-1">
                <span className="text-[#bbb]">Total pages:</span>
                <span>{totalPages}</span>
              </li>
            </ul>
            <div className="flex flex-col gap-2">
              <span className="self-end text-lg">Completed on</span>
              <span className="font-bold text-4xl self-end">
                {getPercentage(translatedPages, totalPages)}%/100%
              </span>
              <BorderLinearProgress
                variant="determinate"
                value={+getPercentage(translatedPages, totalPages)}
                color="secondary"
                className="w-[220px] h-[11px] mt-2"
              />
            </div>
          </div>
        </div>
        <StatusBar
          status={status}
          orderId={id}
          refetch={refetch}
          handleOpenDialog={handleOpenDialog}
          open={open}
        />
      </div>
    </div>
  );
};

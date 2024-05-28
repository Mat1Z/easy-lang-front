import { TranslatorStatsResponse } from "@/shared";
import { useGetSessionData } from "@/shared/hooks";
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { Download, X } from "lucide-react";
import { useSnackbar } from "notistack";
import { FC, useRef, useState } from "react";

export type TranslatorStats = {
  name: string;
  surname: string;
  avatarUrl?: string;
  completed: number;
  overdue: number;
  total: number;
  inProgress: number;
  notStarted: number;
  refetch: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      {
        data: TranslatorStatsResponse;
      },
      Error
    >
  >;
};

export const TranslatorStats: FC<TranslatorStats> = ({
  name,
  surname,
  avatarUrl,
  completed,
  overdue,
  total,
  inProgress,
  notStarted,
  refetch,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { id } = useGetSessionData();

  const doesExceedMaxSize = selectedFiles.some(
    (file) => file.size > 3 * 1024 * 1024
  );

  
  const avatarPath = `${process.env.NEXT_PUBLIC_STATIC_URL}${avatarUrl}`;
  console.log(avatarPath)
  
  const handleOpenDialog = () => {
    setOpen((prev) => !prev);
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };

  const uploadFiles = async () => {
    if (selectedFiles.length === 0) return;

    if (selectedFiles.length > 1000) {
      enqueueSnackbar("You can upload up to 1000 files at once", {
        variant: "error",
      });
      return;
    }

    if (doesExceedMaxSize) {
      enqueueSnackbar("File size should not exceed 3MB", { variant: "error" });
      return;
    }

    const formData = new FormData();
    formData.append("translatorId", id.toString());
    formData.append("image", selectedFiles[0]);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/account`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload files");
      }

      const result = await response.json();
      console.log("Upload successful:", result);
      enqueueSnackbar("Avatar uploaded successfully", { variant: "success" });
      setSelectedFiles([]);
      refetch();
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div className="flex flex-col justify-between w-[300px] h-[300px] bg-white p-5 rounded-xl mt-5">
      <div className="flex flex-row gap-1.5">
        <Dialog
          open={open}
          onClose={handleOpenDialog}
          PaperProps={{ sx: { borderRadius: "16px" } }}
        >
          <DialogTitle id="alert-dialog-title" className="self-center mt-4">
            Upload pages
          </DialogTitle>
          <DialogContent className="px-32 py-10">
            <X
              color="#bbb"
              className="absolute right-5 top-5 cursor-pointer"
              onClick={handleOpenDialog}
            />
            <DialogContentText
              id="alert-dialog-description"
              className="flex flex-col items-center justify-center"
            >
              {!selectedFiles.length ? (
                <>
                  <Download
                    color="#bbb"
                    width={70}
                    height={70}
                    onClick={handleIconClick}
                    style={{ cursor: "pointer" }}
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept=".png,.jpg,.svg"
                    onChange={handleFileChange}
                  />
                  <div className="flex flex-col text-xl text-[#bbb] mt-7">
                    <span>Upload avatar in format</span>
                    <span className="self-center">png, jpg</span>
                  </div>
                </>
              ) : (
                <>
                  <span className="flex flex-col text-xl text-[#bbb]">
                    Selected files: {selectedFiles.length}
                  </span>
                  {!doesExceedMaxSize ? (
                    <span className="flex flex-col text-md text-green-400">
                      File does not exceeds 3MB, you can upload now!
                    </span>
                  ) : (
                    <span className="flex flex-col text-md text-red-400">
                      Selected file exceeds 3MB
                    </span>
                  )}
                </>
              )}
              <Button
                variant="contained"
                color="secondary"
                className="mt-4 bg-[#bbb]"
                disabled={!selectedFiles.length || doesExceedMaxSize}
                onClick={uploadFiles}
              >
                Upload
              </Button>
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <Avatar
          variant="square"
          onClick={handleOpenDialog}
          className="cursor-pointer"
          src={avatarPath}
        />
        <span className="self-center">{[name, surname].join(" ")}</span>
      </div>
      <div className="flex flex-col gap-1.5 text-lg">
        <div className="flex flex-row gap-1">
          <span className="text-[#bbb]">Total:</span>
          <span>{total}</span>
        </div>
        <div className="flex flex-row gap-1">
          <span className="text-[#bbb]">Completed:</span>
          <span className="text-[#02B887]">{completed}</span>
        </div>
        <div className="flex flex-row gap-1">
          <span className="text-[#bbb]">Overdue:</span>
          <span className="text-[#CA0F22]">{overdue}</span>
        </div>
        <div className="flex flex-row gap-1">
          <span className="text-[#bbb]">In progress:</span>
          <span className="text-[#EF9B0F]">{inProgress}</span>
        </div>
        <div className="flex flex-row gap-1">
          <span className="text-[#bbb]">Not started:</span>
          <span className="text-[#638BC8]">{notStarted}</span>
        </div>
      </div>
      <div className="flex flex-row w-[250px]">
        <div
          className="flex flex-col items-center"
          style={{ width: `${(completed / total) * 100}%` }}
        >
          <div className="h-[12px] bg-[#02B887] rounded-l-xl w-full"></div>
          <span className="ml-2 text-sm">
            {((completed / total) * 100).toFixed(0)}%
          </span>
        </div>
        <div
          className="flex flex-col items-center"
          style={{ width: `${(overdue / total) * 100}%` }}
        >
          <div className="h-[12px] bg-[#CA0F22] w-full"></div>
          <span className="ml-2 text-sm">
            {((overdue / total) * 100).toFixed(0)}%
          </span>
        </div>
        <div
          className="flex flex-col items-center"
          style={{ width: `${(inProgress / total) * 100}%` }}
        >
          <div className="h-[12px] bg-[#EF9B0F] w-full"></div>
          <span className="ml-2 text-sm">
            {((inProgress / total) * 100).toFixed(0)}%
          </span>
        </div>
        <div
          className="flex flex-col items-center"
          style={{ width: `${(notStarted / total) * 100}%` }}
        >
          <div className="h-[12px] bg-[#638BC8] rounded-r-xl w-full"></div>
          <span className="ml-2 text-sm">
            {((notStarted / total) * 100).toFixed(0)}%
          </span>
        </div>
      </div>
    </div>
  );
};

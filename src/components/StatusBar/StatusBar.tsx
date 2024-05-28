import React, { FC, useRef, useState } from "react";
import {
  getStatusBarColor,
  getStatusBarIcon,
  getStatusBarText,
  STATUS,
} from "@/shared/util";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Download, X } from "lucide-react";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { CardResponse } from "@/shared";
import { useSnackbar } from "notistack";

export type StatusBarProps = {
  status: STATUS;
  orderId: number;
  open: boolean;
  handleOpenDialog: () => void;
  refetch: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      {
        data: CardResponse;
      },
      Error
    >
  >;
};

export const StatusBar: FC<StatusBarProps> = ({
  status,
  orderId,
  open,
  handleOpenDialog,
  refetch,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [backgroundColor, Icon, text] = [
    getStatusBarColor(status),
    getStatusBarIcon(status),
    getStatusBarText(status),
  ];

  const canUpload =
    status === STATUS.IN_PROGRESS ||
    status === STATUS.NOT_STARTED ||
    status === STATUS.OVERDUE;

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

  const doesExceedMaxSize = selectedFiles.some(
    (file) => file.size > 3 * 1024 * 1024
  );

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
    formData.append("orderId", orderId.toString());
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload files");
      }

      const result = await response.json();
      console.log("Upload successful:", result);
      enqueueSnackbar("Files uploaded successfully", { variant: "success" });
      setSelectedFiles([]);
      refetch();
    } catch (error: any) {
      console.error("Error uploading files:", error);
      enqueueSnackbar(`Couldn't upload files ${error?.message}`, { variant: "error" });
      setSelectedFiles([]);
    }
  };
  console.log(selectedFiles);

  return (
    <div className="w-full h-[120px] flex">
      <div
        className={`flex items-center px-5 h-full ${
          !canUpload ? "rounded-b-lg" : "rounded-bl-lg"
        } flex-1`}
        style={{ backgroundColor }}
      >
        <div className="flex flex-row gap-2">
          <Icon width={25} height={25} color="#fff" />
          <span className="text-white self-center text-lg">{text}</span>
        </div>
      </div>
      {canUpload && (
        <div
          className="flex w-1/5 bg-[#014FB7] h-full rounded-br-lg text-white text-lg items-center justify-center cursor-pointer"
          onClick={handleOpenDialog}
        >
          UPLOAD
        </div>
      )}
      <Dialog
        open={open}
        onClose={handleOpenDialog}
        className="rounded-3xl"
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
                  multiple
                  onChange={handleFileChange}
                />
                <div className="flex flex-col text-xl text-[#bbb] mt-7">
                  <span>Upload pages in format</span>
                  <span className="self-center">png, jpg, svg</span>
                </div>
              </>
            ) : (
              <>
                <span className="flex flex-col text-xl text-[#bbb]">
                  Selected files: {selectedFiles.length}
                </span>
                {!doesExceedMaxSize ? (
                  <span className="flex flex-col text-md text-green-400">
                    No file exceeds 3MB, you can upload now!
                  </span>
                ) : (
                  <span className="flex flex-col text-md text-red-400">
                    One of selected files exceeds 3MB
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
    </div>
  );
};

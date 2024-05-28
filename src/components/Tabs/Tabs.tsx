import { TABS_LIST } from "@/shared";
import { Tab, Tabs as MUITabs } from "@mui/material";
import { FC, SyntheticEvent, useState } from "react";

export type TabsProps = {
  tab: number;
  handleChangeTab: (_: SyntheticEvent, newValue: number) => void;
};

export const Tabs: FC<TabsProps> = ({ tab, handleChangeTab }) => {
  return (
    <MUITabs
      value={tab}
      variant="fullWidth"
      onChange={handleChangeTab}
      className="flex font-semibold justify-between"
      TabIndicatorProps={{ style: { backgroundColor: "black" } }}
      sx={{ borderBottom: 1, borderColor: "divider" }}
      TabScrollButtonProps={{
        style: { display: "flex", justifyContent: "space-between" },
      }}
    >
      {TABS_LIST.map((tabName) => (
        <Tab
          key={tabName}
          className="font-semibold border-b"
          label={tabName.replace("_", " ")}
        />
      ))}
    </MUITabs>
  );
};

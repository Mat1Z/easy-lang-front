import { Tabs } from "@/components/Tabs";
import { TranslatorStats } from "@/components/TranslatorStats";
import { useGetSessionData } from "@/shared/hooks";
import { STATUS, TABS_LIST } from "@/shared/util";
import { withSession } from "@/shared/util/auth";
import { Pagination } from "@mui/material";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/shared/api/api";
import { CardResponse } from "@/shared/types/Card.interface";
import { OrderCard } from "@/components/OrderCard";
import { TranslatorStatsResponse } from "@/shared";

export default function Home() {
  const [tab, setTab] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const { name, surname, role, id: userId } = useGetSessionData();
  const take = 5;

  const handleChangeTab = (_: SyntheticEvent, newValue: number) => {
    setTab(newValue);
    setPage(1);
  };

  const handlePageChange = (_: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const { data: ordersData, refetch: refetchOrders } = useQuery<any>({
    queryFn: async () => {
      try {
        const headers = new Headers()
        headers.append("Content-Type", "application/json");
        headers.append("ngrok-skip-browser-warning", "1")
        
        const skip = (page - 1) * take;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/order/${userId}?take=${take}&skip=${skip}${STATUS[TABS_LIST[tab]] === STATUS.ALL ? "" : `&status=${STATUS[TABS_LIST[tab]]}`}&role=${role}`,
          {
            method: "GET",
            headers,
          }
        );

        return await response.json();

      } catch (e) {
        console.log(e)
      }
    },
    queryKey: ["orders", tab, page],
  });

  // const { data: translatorStatsData, refetch: refetchStats } = useQuery<{
  //   data: TranslatorStatsResponse;
  // }>({
  //   queryFn: api.getStats(userId),
  //   queryKey: ["translator-stats"],
  // });

  const { data: translatorStatsData, refetch: refetchStats } = useQuery<any>({
    queryFn: async () => {
      try {
        const headers = new Headers()
        headers.append("Content-Type", "application/json");
        headers.append("ngrok-skip-browser-warning", "1")
        
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/translator/${userId}`,
          {
            method: "GET",
            headers,
          }
        );

        return await response.json();

      } catch (e) {
        console.log(e)
      }
    },
    queryKey: ["translator-stats"],
  });

  console.log(ordersData?.data);

  return (
    <div className="flex flex-row gap-4 mt-10 pb-10">
      <TranslatorStats
        name={name}
        surname={surname}
        total={translatorStatsData?.totalOrders ?? 0}
        completed={translatorStatsData?.totalOrdersCompleted ?? 0}
        inProgress={translatorStatsData?.totalOrdersInProgress ?? 0}
        overdue={translatorStatsData?.totalOrdersOverdue ?? 0}
        notStarted={translatorStatsData?.totalOrdersNotStarted ?? 0}
        avatarUrl={translatorStatsData?.avatarPath ?? ""}
        refetch={refetchStats}
      />
      <div className="flex flex-col gap-4">
        <Tabs tab={tab} handleChangeTab={handleChangeTab} />
        {ordersData?.data?.map((order: any) => (
          <OrderCard key={order.id} {...order} refetch={refetchOrders} />
        ))}
        <div className="flex items-center justify-center w-full">
          <Pagination
            count={Math.ceil((ordersData?.data?.totalRows || 0) / take)}
            page={page}
            onChange={handlePageChange}
            size="large"
            className="flex justify-between"
          />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = withSession(async function ({ req, res }) {
  return { props: {} };
});

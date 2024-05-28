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

  const { data: ordersData, refetch: refetchOrders } = useQuery<{ data: CardResponse }>({
    queryFn: api.getOrders({
      userId,
      role,
      status: STATUS[TABS_LIST[tab]],
      take,
      skip: (page - 1) * take,
    }),
    queryKey: ["orders", tab, page],
  });

  const { data: translatorStatsData, refetch: refetchStats } = useQuery<{
    data: TranslatorStatsResponse;
  }>({
    queryFn: api.getStats(userId),
    queryKey: ["translator-stats"],
  });

  console.log(translatorStatsData?.data);

  return (
    <div className="flex flex-row gap-4 mt-10 pb-10">
      <TranslatorStats
        name={name}
        surname={surname}
        total={translatorStatsData?.data.totalOrders ?? 0}
        completed={translatorStatsData?.data.totalOrdersCompleted ?? 0}
        inProgress={translatorStatsData?.data.totalOrdersInProgress ?? 0}
        overdue={translatorStatsData?.data.totalOrdersOverdue ?? 0}
        notStarted={translatorStatsData?.data.totalOrdersNotStarted ?? 0}
        avatarUrl={translatorStatsData?.data.avatarPath ?? ""}
        refetch={refetchStats}
      />
      <div className="flex flex-col gap-4">
        <Tabs tab={tab} handleChangeTab={handleChangeTab} />
        {ordersData?.data?.data?.map((order) => (
          <OrderCard key={order.id} {...order} refetch={refetchOrders}/>
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

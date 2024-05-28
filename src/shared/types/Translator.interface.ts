export type TranslatorStatsResponse = {
  totalOrders: number;
  totalOrdersCompleted: number;
  totalOrdersInProgress: number;
  totalOrdersNotStarted: number;
  totalOrdersOverdue: number;
  avatarPath?: string;
}
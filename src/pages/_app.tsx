import { Navbar } from "@/components/Navbar";
import "@/styles/globals.css";
import { Roboto } from "next/font/google";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { themeObject } from "@/shared/util";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [theme] = useState(createTheme(themeObject(false)));
  const router = useRouter();

  const isAuthPage = router.pathname.startsWith("/auth");

  useEffect(() => {
    if (!session && !isAuthPage) {
      router.push("/auth/login");
    }
  }, []);

  console.log(session);

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <SnackbarProvider>
            {!isAuthPage && <Navbar />}
            <main
              className={`flex flex-col h-[100vh] w-full items-center ${roboto.className}`}
            >
              <Component {...pageProps} />
            </main>
          </SnackbarProvider>
        </SessionProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

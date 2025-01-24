"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Provider as ReduxProvder } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ConfigProvider, theme as antTheme } from "antd";
import { useTheme } from "next-themes";

import { store, persistor } from "@/redux/store";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <ReduxProvder store={store}>
        <NextUIProvider navigate={router.push}>
          <NextThemesProvider {...themeProps}>
            <RenderAntProvider>{children}</RenderAntProvider>
          </NextThemesProvider>
        </NextUIProvider>
      </ReduxProvder>
    );
  }

  return (
    <ReduxProvder store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NextUIProvider navigate={router.push}>
          <NextThemesProvider {...themeProps}>
            <RenderAntProvider>{children}</RenderAntProvider>
          </NextThemesProvider>
        </NextUIProvider>
      </PersistGate>
    </ReduxProvder>
  );
}

const RenderAntProvider = ({ children }: ProvidersProps) => {
  const { theme } = useTheme();

  return (
    <ConfigProvider
      prefixCls="ant"
      theme={{
        algorithm:
          theme == "dark" ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
};

import { AppProps, type AppType } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { badgeTheme, solidButtonTheme, textareaTheme } from "~/theme/chakra-theme";
import { Toaster } from "react-hot-toast";

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const theme = extendTheme({
  components: {
    Textarea: textareaTheme,
    Badge: badgeTheme,
    Button: solidButtonTheme
  },
})

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <ChakraProvider theme={theme}>
      <Toaster />
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider >
  )
};



export default api.withTRPC(MyApp);

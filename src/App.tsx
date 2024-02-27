import Loading from "@/components/loading";
import MobileOnlyWarning from "@/components/mobile-only-warning";
import { theme } from "@/configs/mantine-theme";
import routes from "@/router";
import loadingStore from "@/services/http/store/loading";
import { MantineProvider } from "@mantine/core";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useSyncExternalStore } from "react";
import { MobileView } from "react-device-detect";
import { useRoutes } from "react-router-dom";

const App = () => {
  const loading = useSyncExternalStore(loadingStore.subscribe, loadingStore.getSnapshot);

  return (
    <MantineProvider theme={theme}>
      {loading && <Loading />}
      <MobileOnlyWarning />
      <MobileView>{useRoutes(routes)}</MobileView>
      <SpeedInsights />
    </MantineProvider>
  );
};

export default App;

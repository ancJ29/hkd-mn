import MobileOnlyWarning from "@/components/mobile-only-warning";
import { theme } from "@/configs/mantine-theme";
import routes from "@/router";
import { MantineProvider } from "@mantine/core";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { MobileView } from "react-device-detect";
import { useRoutes } from "react-router-dom";

const App = () => {
  return (
    <MantineProvider theme={theme}>
      <MobileOnlyWarning />
      <MobileView>{useRoutes(routes)}</MobileView>
      <SpeedInsights />
    </MantineProvider>
  );
};

export default App;

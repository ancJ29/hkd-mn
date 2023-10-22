import MobileOnlyWarning from "@/components/mobile-only-warning";
import { theme } from "@/configs/mantine-theme";
import routes from "@/router";
import isValidIP from "@/services/ip-checker";
import { MantineProvider } from "@mantine/core";
import { useEffect } from "react";
import { MobileView } from "react-device-detect";
import { useRoutes } from "react-router-dom";

const App = () => {
  useEffect(() => {
    isValidIP();
  }, []);

  return (
    <MantineProvider theme={theme}>
      <MobileOnlyWarning />
      <MobileView>{useRoutes(routes)}</MobileView>
    </MantineProvider>
  );
};

export default App;

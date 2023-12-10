import MobileOnlyWarning from "@/components/mobile-only-warning";
import { theme } from "@/configs/mantine-theme";
import routes from "@/router";
import { MantineProvider } from "@mantine/core";
import { MobileView } from "react-device-detect";
import { useRoutes } from "react-router-dom";

const App = () => {
  return (
    <MantineProvider theme={theme}>
      <MobileOnlyWarning />
      <MobileView>{useRoutes(routes)}</MobileView>
    </MantineProvider>
  );
};

export default App;

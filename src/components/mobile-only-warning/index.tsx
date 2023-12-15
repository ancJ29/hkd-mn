import { Box, Center } from "@mantine/core";
import { BrowserView } from "react-device-detect";

const MobileOnlyWarning = () => {
  return (
    <BrowserView>
      <Center w={"100vw"} h={"100vh"} bg="var(--mantine-color-white)">
        <Box w={"30vw"} ta={"center"}>
          {"Please use mobile device to view this page."}
        </Box>
      </Center>
    </BrowserView>
  );
};

export default MobileOnlyWarning;

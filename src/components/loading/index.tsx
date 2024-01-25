import { LoadingOverlay } from "@mantine/core";

const Loading = () => {
  return (
    <LoadingOverlay
      visible={true}
      zIndex={1000}
      overlayProps={{ bg: "transparent" }}
      loaderProps={{ color: "white", type: "dots", size: "xl" }}
    />
  );
};

export default Loading;

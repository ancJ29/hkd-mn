import { Image } from "@mantine/core";

const Arrow = ({ onClick, direction }: { direction: "left" | "right"; onClick?: () => void }) => {
  return (
    <Image
      h={89}
      w={45}
      src={direction === "left" ? "/images/left.svg" : "/images/right.svg"}
      style={{
        ...(direction === "left" ? { left: 0 } : { right: 0 }),
        position: "absolute",
        top: "50%",
      }}
      onClick={onClick}
    />
  );
};

export default Arrow;

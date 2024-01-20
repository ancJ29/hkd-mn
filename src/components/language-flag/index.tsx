import { Image } from "@mantine/core";
import { useState } from "react";
import classes from "./index.module.scss";

const LanguageFlag = () => {
  const [selectedFlag, setSelectedFlag] = useState("vn");
  const flagData = [
    {
      id: "vn",
      active: "/images/flag_icons/vn_active.svg",
      inActive: "/images/flag_icons/vn_inactive.svg",
    },
    {
      id: "en",
      active: "/images/flag_icons/en_active.svg",
      inActive: "/images/flag_icons/en_inactive.svg",
    },
    {
      id: "ja",
      active: "/images/flag_icons/ja_active.svg",
      inActive: "/images/flag_icons/ja_inactive.svg",
    },
  ];

  const handleChangeSelectedFlag = (id: string) => {
    setSelectedFlag(id);
  };

  return (
    <div className={classes.container}>
      {flagData.map((e, i) => (
        <Image
          key={i}
          h={e.id === selectedFlag ? 25 : 20}
          src={e.id === selectedFlag ? e.active : e.inActive}
          onClick={() => handleChangeSelectedFlag(e.id)}
          className={classes.item}
        />
      ))}
    </div>
  );
};

export default LanguageFlag;

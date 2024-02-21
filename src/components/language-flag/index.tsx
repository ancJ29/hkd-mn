import { LanguageContext } from "@/contexts/LanguageContext";
import { flagData } from "@/services/i18n";
import { Image } from "@mantine/core";
import { useContext } from "react";
import classes from "./index.module.scss";

const LanguageFlag = () => {
  const { language, onChangeLanguage } = useContext(LanguageContext);

  const handleChangeSelectedFlag = (id: string) => {
    onChangeLanguage && onChangeLanguage(id || "vi");
  };

  return (
    <div className={classes.container}>
      {flagData.map((e, i) => (
        <Image
          key={i}
          h={e.id === language ? 25 : 20}
          src={e.id === language ? e.active : e.inActive}
          onClick={() => handleChangeSelectedFlag(e.id)}
          className={classes.item}
        />
      ))}
    </div>
  );
};

export default LanguageFlag;

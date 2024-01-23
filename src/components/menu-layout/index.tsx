import { Category } from "@/types";
import { AppShell } from "@mantine/core";
import { ReactNode } from "react";
import CategoryBand from "../category-band";
import LanguageFlag from "../language-flag";
import classes from "./index.module.scss";

type MenuLayoutProps = {
  children: ReactNode;
  categories: Category[];
  selectedCategoryId: string;
  setSelectedCategoryId: (value: string) => void;
};

const MenuLayout = ({
  children,
  categories,
  selectedCategoryId,
  setSelectedCategoryId,
}: MenuLayoutProps) => {
  return (
    <div className={classes.container}>
      <AppShell header={{ height: 80, offset: false }}>
        <AppShell.Header h="80px" bg="transparent" withBorder={false}>
          <CategoryBand
            categories={categories}
            selectedId={selectedCategoryId}
            onSelect={setSelectedCategoryId}
          />
          <LanguageFlag />
        </AppShell.Header>
        <AppShell.Main mt="80px">
          <div className={classes.main}>{children}</div>
        </AppShell.Main>
      </AppShell>
    </div>
  );
};

export default MenuLayout;

import Modal from "@/components/modal";
import AvailableText from "@/components/modal/order/available-text";
import ButtonContainer from "@/components/modal/order/button-container";
import SelectDish from "@/components/modal/order/select-dist";
import UnAvailableText from "@/components/modal/order/unavailable-text";
import ModalReplacementDish from "@/components/modal/replacement-dish";
import { useState } from "react";

type ModalOrderProps = {
  opened: boolean;
  onClose: () => void;
};

const ModalOrder = ({ opened, onClose }: ModalOrderProps) => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [openedModalSelectReplaceDish, setOpenedModalSelectReplaceDish] = useState(false);

  const handleChangeIsAvailable = () => {
    setIsAvailable(!isAvailable);
  };

  return (
    <>
      <ModalReplacementDish
        opened={openedModalSelectReplaceDish}
        onClose={() => setOpenedModalSelectReplaceDish(false)}
        onChangeAvailable={handleChangeIsAvailable}
      />

      <Modal opened={opened} onClose={onClose} title="THÔNG TIN MÓN">
        {isAvailable ? (
          <AvailableText />
        ) : (
          <UnAvailableText dish="Hotate Sashimi" category="Kai Deluxe" />
        )}

        <SelectDish
          isAvailable={isAvailable}
          onOpenModalSelectReplaceDish={() => setOpenedModalSelectReplaceDish(true)}
        />

        <ButtonContainer isAvailable={isAvailable} onClose={onClose} />
      </Modal>
    </>
  );
};

export default ModalOrder;

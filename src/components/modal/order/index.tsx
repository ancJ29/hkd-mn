import Modal from "@/components/modal";
import AvailableText from "@/components/modal/order/available-text";
import ButtonContainer from "@/components/modal/order/button-container";
import SelectDish from "@/components/modal/order/select-dist";
import UnAvailableText from "@/components/modal/order/unavailable-text";
import ModalReplacementDish from "@/components/modal/replacement-dish";
import useLoading from "@/hooks/useLoading";

type ModalOrderProps = {
  opened: boolean;
  onClose: () => void;
};

const ModalOrder = ({ opened, onClose }: ModalOrderProps) => {
  const { loading, toggleLoading } = useLoading({
    isAvailable: false,
    isOpenedSelectReplaceDish: false,
  });

  const handleChangeIsAvailable = () => {
    toggleLoading("isAvailable");
  };

  return (
    <>
      <ModalReplacementDish
        opened={loading.isOpenedSelectReplaceDish}
        onClose={() => toggleLoading("isOpenedSelectReplaceDish")}
        onChangeAvailable={handleChangeIsAvailable}
      />

      <Modal opened={opened} onClose={onClose} title="THÔNG TIN MÓN">
        {loading.isAvailable ? (
          <AvailableText />
        ) : (
          <UnAvailableText dish="Hotate Sashimi" category="Kai Deluxe" />
        )}

        <SelectDish
          isAvailable={loading.isAvailable}
          onOpenModalSelectReplaceDish={() => toggleLoading("isOpenedSelectReplaceDish")}
        />

        <ButtonContainer isAvailable={loading.isAvailable} onClose={onClose} />
      </Modal>
    </>
  );
};

export default ModalOrder;

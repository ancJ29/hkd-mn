import { Center, Image, Modal } from "@mantine/core";

const ConfirmModal = ({ opened, onClose }: { opened: boolean; onClose: () => void }) => {
  return (
    <Modal centered opened={opened} onClose={onClose} withCloseButton={false} p='none'>
      <Center style={{ position: "relative" }}>
        <Image src='/images/ordered.png' />
        <Image
          onClick={onClose}
          h={25}
          w={25}
          style={{
            position: "absolute",
            right: "5px",
            top: "5px",
          }}
          src='/images/close.png'
        />
      </Center>
    </Modal>
  );
};

export default ConfirmModal;

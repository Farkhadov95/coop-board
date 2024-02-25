import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import { BoardType } from "../pages/Gallery";

type ModalProp = {
  board: BoardType;
  isOpen: boolean;
};

const ModalDelete = ({ board, isOpen }: ModalProp) => {
  const { onClose } = useDisclosure();

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Text>Delete {board.title}?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" variant="outline" onClick={onClose}>
              Delete
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalDelete;

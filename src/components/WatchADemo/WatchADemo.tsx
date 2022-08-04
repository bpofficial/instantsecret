import {
    AspectRatio,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    useDisclosure,
} from "@chakra-ui/react";

export const WatchADemo = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button
                size="lg"
                bg="custom.400"
                color="white"
                fontWeight="bold"
                px="8"
                py="6"
                _hover={{ bg: "custom.50" }}
                onClick={onOpen}
            >
                WATCH A DEMO
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="5xl" isCentered>
                <ModalOverlay backdropFilter="blur(10px)" />
                <ModalContent>
                    <ModalCloseButton
                        position="absolute"
                        top="10px"
                        right="10px"
                    />
                    <ModalBody p="0">
                        <AspectRatio>
                            <iframe
                                title="demo"
                                src="https://www.youtube.com/embed/GpMpadbwvsg"
                                allowFullScreen
                            />
                        </AspectRatio>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

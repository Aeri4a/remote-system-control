import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { Colors } from "../config/config";

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    value: string;
    changeValue: (e: any) => void;
    runFunction: () => void;
};


// TODO: make it customizable
const Dialog: FunctionComponent<DialogProps> = ({
    isOpen, onClose, value, changeValue, runFunction
}) => {
    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg={Colors.C4}>
            <ModalHeader>Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Input value={value} onChange={changeValue}/>
            </ModalBody>
            <ModalFooter>
                <Button onClick={runFunction}>Run</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
};

export default Dialog;
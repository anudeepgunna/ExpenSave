import { IconPlus, IconX } from "@tabler/icons-react";
import { ActionIcon, Affix } from "@mantine/core";
import { Modal } from "@mantine/core";
import FloatingForm from "../../floatingForm/FloatingForm";
import { useDisclosure } from "@mantine/hooks";
import { useDispatch } from "react-redux";
import { setName } from "@redux/edit/editSlice";

export default function FloatingButton() {
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const handleExpense = () => {
    dispatch(setName("expense"));
    open();
  };

  return (
    <Affix position={{ bottom: 40, right: 40 }}>
      <ActionIcon color="green" radius="xl" size={60} onClick={handleExpense}>
        {opened ? <IconX size={30} /> : <IconPlus size={30} />}
      </ActionIcon>
      <Modal opened={opened} onClose={close} centered radius="xl">
        <FloatingForm  onClose={close}/>
      </Modal>
    </Affix>
  );
}

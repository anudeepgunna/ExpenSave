import classes from "./LimitTracker.module.css";
import MonthPicker from "../monthPicker/MonthPicker";
import {useApi} from "../../../context/ApiContext.jsx"
import {
  Progress,
  Box,
  Text,
  Group,
  Paper,
  SimpleGrid,
  Button,
  Modal,
} from "@mantine/core";
import FloatingForm from "../../floatingForm/FloatingForm";
import { useDisclosure } from "@mantine/hooks";
import { useDispatch } from "react-redux";
import { setName } from "@redux/edit/editSlice";
import { useEffect, useState } from "react";
import axiosInstance from "../../../config/axios";
import { useNavigate } from "react-router-dom";


export default function LimitTracker() {
  const { expenseStats,fetchExpenseStats ,monthIndex ,year }= useApi();
  const [opened, { open, close }] = useDisclosure(false);
   // const [limit, setLimit] = useState([]);

  const dispatch = useDispatch();

 
  useEffect(() => {
    fetchExpenseStats();
  }, [monthIndex, year]);


  //  handle the limit of the user function
  const handleLimit = () => {
    dispatch(setName("limit"));
    open();
  };
  // percent calculations
  let totalSpend = expenseStats.totalExpense;
  let limit = expenseStats.limit;
  let balance = expenseStats.limit - expenseStats.totalExpense;
  let totalSpendPercent = Math.round((totalSpend / limit) * 100);
  let balancePercent = Math.round((balance / limit) * 100);


  return (
    <>
      <Box p="md" radius="md">
        <div
          style={{ padding: "10px", display: "flex", justifyContent: "center" }}
        >
          <MonthPicker />
        </div>

        {/* progress bar  starts here */}
        <Progress.Root
          size={34}
          classNames={{ label: classes.progressLabel }}
          mt={40}
        >
          <Progress.Section
            value={totalSpendPercent}
            color={totalSpendPercent > 70 ? 'red' : totalSpendPercent > 30 ? '#ffd900' : 'green'}
          >

            <Progress.Label>{totalSpendPercent}%</Progress.Label>
          </Progress.Section>
          {/* //second section */}
          <Progress.Section
            value={balancePercent}
            color='#00ffb3dd'
          >
            <Progress.Label>{balancePercent}%</Progress.Label>
          </Progress.Section>



        </Progress.Root>
        {/* progress bar  ends here */}

        {/* descriptions  starts here */}
        <SimpleGrid cols={{ base: 1, xs: 3 }} mt="xl">

          <Box
            style={{ borderBottomColor: "red" }}
            className={classes.stat}
          >
            <Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
              Spend
            </Text>

            <Group justify="space-between" align="flex-end" gap={0}>
              <Text fw={700}>{expenseStats.totalExpense}</Text>
              <Text c={"red"} fw={700} size="sm" className={classes.statCount}>
                {totalSpendPercent}%
              </Text>
            </Group>
          </Box>

          <Box
            style={{ borderBottomColor: "green" }}
            className={classes.stat}
          >
            <Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
              Balance
            </Text>

            <Group justify="space-between" align="flex-end" gap={0}>
              <Text fw={700}> {expenseStats.limit - expenseStats.totalExpense}</Text>
              <Text c={"green"} fw={700} size="sm" className={classes.statCount}>
                {balancePercent}%
              </Text>
            </Group>
          </Box>
          <Box
            style={{ borderBottomColor: '#00ffb3dd' }}
            className={classes.stat}
          >
            <Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
              Limit
            </Text>

            <Group justify="space-between" align="flex-end" gap={0}>
              <Text fw={700}>{expenseStats.limit}</Text>
            </Group>
          </Box>
        </SimpleGrid>

        {/* descriptions  ends here */}

        {/* edit button */}
        <Button
          mt="xl"
          variant="outline"
          radius="md"
          size="md"
          w={{ base: "100%", md: "auto" }}
          onClick={handleLimit}
        >
          Edit Limit
        </Button>
      </Box>

      <Modal opened={opened} onClose={close} centered radius="xl">
        <FloatingForm onClose={close} />
      </Modal>
    </>
  );
}

import { useState } from "react";
import { Group, Button, Text, Center } from "@mantine/core";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";
import { useApi } from "../../../context/ApiContext.jsx"
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function MonthPicker() {
const { monthIndex, setMonthIndex, year, setYear } = useApi();

  const handlePrevMonth = () => {
    if (monthIndex === 0) {
      setMonthIndex(11);
      setYear(year - 1);
    } else {
      setMonthIndex(monthIndex - 1);
    }
  };

  const handleNextMonth = () => {
    if (monthIndex === 11) {
      // If it's December, wrap around to January of the next year
      setMonthIndex(0);
      setYear(year + 1);
    } else {
      // Otherwise, just increment the month
      setMonthIndex(monthIndex + 1);
    }
  };
  

  return (
    <Group position="center" align="center">
      <Button variant="subtle" onClick={handlePrevMonth}>
        <IconChevronLeft size={18} />
      </Button>
      <Text size="md"  ta='center' miw={120} weight={500}>
        {months[monthIndex]}, {year}
      </Text>
      <Button variant="subtle" onClick={handleNextMonth} disabled={monthIndex === new Date().getMonth() && year === new Date().getFullYear()}>
  <IconChevronRight size={18} />
</Button>
    </Group>
  );
}

export default MonthPicker;

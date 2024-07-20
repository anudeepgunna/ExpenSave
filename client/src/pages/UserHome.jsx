import { Box, Container } from "@mantine/core";
import LimitTracker from "../components/user/limitTracker/LimitTracker";
import Tab from "../components/user/tab/Tab";
import { useApi } from "../context/ApiContext";
import ExpenseList from "../components/user/expenseList/ExpenseList";

export default function UserHome() {
  const {activeTab, setActiveTab } = useApi();

  return (
    <Box>
      <Box maw={500} mx="auto" mt="md" p="sm">
        <Tab />
      </Box>
      <Container mx="auto" py="sm" size="md">
        {
          activeTab === "stats" ? <LimitTracker /> : <ExpenseList />
        }
      </Container>
    
    </Box>
  );
}

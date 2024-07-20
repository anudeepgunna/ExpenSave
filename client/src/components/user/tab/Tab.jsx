import { Tabs, rem } from "@mantine/core";
 
import { IconActivity, IconCurrencyRupee } from "@tabler/icons-react";
import classes from "./Tab.module.css";
 import { useApi } from "../../../context/ApiContext.jsx";

export default function Tab() {
  const {activeTab, setActiveTab } = useApi();
   return (
    <Tabs variant="outline"  value={activeTab} onChange = {setActiveTab} classNames={classes}>
      <Tabs.List grow>
        <Tabs.Tab
          value="stats"
          leftSection={
            <IconActivity style={{ width: rem(16), height: rem(16) }} />
          }
        >
          Stats
        </Tabs.Tab>
        <Tabs.Tab
          value="expense"
          leftSection={
            <IconCurrencyRupee style={{ width: rem(16), height: rem(16) }} />
          }
        >
          Expense
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}

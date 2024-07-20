import { createContext, useState, useContext } from "react";
import axiosInstance from "../config/axios";
export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [expenseStats, setExpenseStats] = useState([]);
  const [activeTab, setActiveTab] = useState("stats");
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);


  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const fetchExpenseStats = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `/api/expense/stats?month=${monthIndex + 1}&year=${year}`,
        { withCredentials: true }
      );
      setExpenseStats(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }finally{
      setLoading(false);
    }
  };
  const fetchExpenseItems = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/api/expense", {
        withCredentials: true,
      });
      setExpenses(res.data.expenses);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }finally{
      setLoading(false);
    }
  };

  const value = {
    expenseStats,
    fetchExpenseStats,
    monthIndex,
    setMonthIndex,
    year,
    setYear,
    setActiveTab,
    activeTab,
    fetchExpenseItems,
    expenses,
    loading,
    setLoading
    
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApi = () => useContext(ApiContext);

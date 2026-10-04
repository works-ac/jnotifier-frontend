import { useState, useCallback, useEffect } from "react";
import { getAppliedJobs } from "../services/AppliedJobsService";
import useAppAlert from "./useAppAlert";

function useAppliedJobsList() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { alert, handleAlertOnClose, showErrorMsg } = useAppAlert();

  const fetchJobs = useCallback(async (pageNum) => {
    setIsLoading(true);
    try {
      const response = await getAppliedJobs(pageNum, 10);
      const data = response.data?.data; 
      const list = data?.list || {};
      setJobs(list.content || []);
      setTotalPages(list.totalPages || 0);
      setPage(list.pageNumber || 0);
    } catch (error) {
      showErrorMsg(error);
    } finally {
      setIsLoading(false);
    }
  }, [showErrorMsg]);

  useEffect(() => {
    fetchJobs(page);
  }, [page, fetchJobs]);

  const handlePageChange = useCallback((event, value) => {
    setPage(value - 1);
  }, []);

  return {
    jobs,
    isLoading,
    page,
    totalPages,
    alert,
    handleAlertOnClose,
    handlePageChange
  };
}

export default useAppliedJobsList;

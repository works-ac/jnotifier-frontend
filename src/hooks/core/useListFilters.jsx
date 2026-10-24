import { useCallback, useEffect, useState } from "react";
import useAppAlert from "../useAppAlert";
import { getJobCategories } from "../../services/PublicService";

function useListFilters() {
  const [isLoading, setIsLoading] = useState(false);
  const [jobCategories, setJobCategories] = useState([]);
  const [category, setCategory] = useState("");
  const { alert, handleAlertOnClose, reset, showErrorMsg } = useAppAlert();

  const fetchJobCategories = useCallback(async () => {
    reset();
    setIsLoading(true);

    try {
      const response = await getJobCategories();
      const data =
        response.data?.data?.categories?.map((item) => ({
          label: item.jobCategoryName,
        })) ?? [];

      setJobCategories(data);
    } catch (error) {
      showErrorMsg(error);
      setJobCategories([]);
    } finally {
      setIsLoading(false);
    }
  }, [reset, showErrorMsg]);

  useEffect(() => {
    let isMounted = true;

    getJobCategories()
      .then((response) => {
        if (!isMounted) return;
        const data =
          response.data?.data?.categories?.map((item) => ({
            label: item.jobCategoryName,
          })) ?? [];
        setJobCategories(data);
      })
      .catch((error) => {
        if (!isMounted) return;
        showErrorMsg(error);
        setJobCategories([]);
      });

    return () => {
      isMounted = false;
    };
  }, [showErrorMsg]);

  const handleCategoryOnChange = useCallback(function (event, newVal) {
    setCategory(newVal?.label ?? "");
  }, []);

  return {
    isLoading,
    jobCategories,
    alert,
    category,
    setCategory,
    handleCategoryOnChange,
    fetchJobCategories,
    handleAlertOnClose,
  };
}

export default useListFilters;

import React, { useCallback, useEffect, useState } from "react";
import useAppAlert from "../useAppAlert";
import { getJobCategories } from "../../services/PublicService";

function useListFilters() {
  const [isLoading, setIsLoading] = useState(false);
  const [jobCategories, setJobCategories] = useState([]);
  const [category, setCategory] = useState("");
  const { alert, handleAlertOnClose, reset, showErrorMsg } = useAppAlert();

  const fetchJobCategories = useCallback(
    async function () {
      reset();

      if (isLoading) return;
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
    },
    [isLoading],
  );

  const handleCategoryOnChange = useCallback(function (event, newVal) {
    setCategory(newVal?.label);
  }, []);

  useEffect(() => {
    fetchJobCategories();
  }, []);

  return {
    isLoading,
    jobCategories,
    alert,
    category,
    handleCategoryOnChange,
    fetchJobCategories,
    handleAlertOnClose,
  };
}

export default useListFilters;

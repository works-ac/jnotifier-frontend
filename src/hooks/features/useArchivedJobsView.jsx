import React, { useCallback, useEffect, useState } from "react";
import useAppAlert from "../useAppAlert";
import { JobListings } from "../../data/HomePageData";
import { getArchivedJobs } from "../../services/HomeServices";
import { AppPaginationMetadata } from "../../data/PaginationMetadata";

function useArchivedJobsView() {
  const [isLoading, setIsLoading] = useState(false);
  const { alert, handleAlertOnClose, reset, showErrorMsg } = useAppAlert();
  const [archivedJobs, setArchivedJobs] = useState(JobListings);
  const [paginationMetadata, setPaginationMetadata] = useState(
    AppPaginationMetadata,
  );
  const [pagination, setPagination] = useState({ page: 0, size: 10 });

  const fetchArchivedJobs = useCallback(async function () {
    reset();
    setIsLoading(true);

    try {
      const response = await getArchivedJobs();
      const content = response.data?.data?.content || [];
      const pagination = {
        pageNo: response.data?.data?.pageable?.pageNumber ?? -1,
        totalPages: response.data?.data?.totalPages ?? -1,
        last: response.data?.data?.last ?? true,
        first: response.data?.data?.first ?? true,
        totalElements: response.data?.data?.totalElements ?? -1,
      };

      setArchivedJobs(content);
      setPaginationMetadata(pagination);
    } catch (error) {
      showErrorMsg(error);
      setArchivedJobs([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchNextArchivedJobs = useCallback(
    async function () {
      setIsLoading(true);
      reset();

      const payload = {
        page: pagination.page + 1,
        size: 10,
      };

      try {
        const response = await getArchivedJobs(payload);
        const content = response.data?.data?.content || [];
        const paginationData = {
          pageNo: response.data?.data?.pageable?.pageNumber ?? -1,
          totalPages: response.data?.data?.totalPages ?? -1,
          last: response.data?.data?.last ?? true,
          first: response.data?.data?.first ?? true,
          totalElements: response.data?.data?.totalElements ?? -1,
        };

        setArchivedJobs(content);
        setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
        setPaginationMetadata(paginationData);
      } catch (error) {
        showErrorMsg(error);
        setArchivedJobs([]);
      } finally {
        setIsLoading(false);
      }
    },
    [pagination],
  );

  const fetchPreviousArchivedJobs = useCallback(
    async function () {
      setIsLoading(true);
      reset();

      const payload = {
        page: pagination.page - 1,
        size: 10,
      };

      try {
        const response = await getArchivedJobs(payload);
        const content = response.data?.data?.content || [];
        const paginationData = {
          pageNo: response.data?.data?.pageable?.pageNumber ?? -1,
          totalPages: response.data?.data?.totalPages ?? -1,
          last: response.data?.data?.last ?? true,
          first: response.data?.data?.first ?? true,
          totalElements: response.data?.data?.totalElements ?? -1,
        };

        setArchivedJobs(content);
        setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
        setPaginationMetadata(paginationData);
      } catch (error) {
        showErrorMsg(error);
        setArchivedJobs([]);
      } finally {
        setIsLoading(false);
      }
    },
    [pagination],
  );

  useEffect(() => {
    fetchArchivedJobs();
  }, []);

  return {
    isLoading,
    archivedJobs,
    pagination,
    paginationMetadata,
    alert,
    archivedJobs,
    fetchArchivedJobs,
    fetchNextArchivedJobs,
    fetchPreviousArchivedJobs,
    handleAlertOnClose,
  };
}

export default useArchivedJobsView;

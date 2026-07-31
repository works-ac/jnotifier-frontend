import React, { useCallback, useEffect, useState } from "react";
import useAppAlert from "../useAppAlert";
import { NoticeListings } from "../../data/NoticeListings";
import { getAllArchivedNotices } from "../../services/NoticeService";
import { AppPaginationMetadata } from "../../data/PaginationMetadata";

function useArchivedNoticesView() {
  const [isLoading, setIsLoading] = useState(false);
  const { alert, handleAlertOnClose, reset, showErrorMsg } = useAppAlert();
  const [archivedNotices, setArchivedNotices] = useState(NoticeListings);
  const [paginationMetadata, setPaginationMetadata] = useState(
    AppPaginationMetadata,
  );
  const [pagination, setPagination] = useState({ page: 0, size: 10 });

  const fetchArchivedNotices = useCallback(async function () {
    reset();
    setIsLoading(true);

    try {
      const response = await getAllArchivedNotices();
      const content = response.data?.data?.list?.content || [];
      const pagination = {
        pageNo: response.data?.data?.list?.pageable?.pageNumber ?? -1,
        totalPages: response.data?.data?.list?.totalPages ?? -1,
        last: response.data?.data?.list?.last ?? true,
        first: response.data?.data?.list?.first ?? true,
        totalElements: response.data?.data?.list?.totalElements ?? -1,
      };

      setArchivedNotices(content);
      setPaginationMetadata(pagination);
    } catch (error) {
      showErrorMsg(error);
      setArchivedNotices([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchNextArchivedNotice = useCallback(
    async function () {
      setIsLoading(true);
      reset();

      const payload = {
        page: pagination.page + 1,
        size: 10,
      };

      try {
        const response = await getAllArchivedNotices(payload);
        const content = response.data?.data?.list?.content || [];
        const paginationData = {
          pageNo: response.data?.data?.list?.pageable?.pageNumber ?? -1,
          totalPages: response.data?.data?.list?.totalPages ?? -1,
          last: response.data?.data?.list?.last ?? true,
          first: response.data?.data?.list?.first ?? true,
          totalElements: response.data?.data?.list?.totalElements ?? -1,
        };

        setArchivedNotices(content);
        setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
        setPaginationMetadata(paginationData);
      } catch (error) {
        showErrorMsg(error);
        setArchivedNotices([]);
      } finally {
        setIsLoading(false);
      }
    },
    [pagination],
  );

  const fetchPreviousArchivedNotice = useCallback(
    async function () {
      setIsLoading(true);
      reset();

      const payload = {
        page: pagination.page - 1,
        size: 10,
      };

      try {
        const response = await getAllArchivedNotices(payload);
        const content = response.data?.data?.list?.content || [];
        const paginationData = {
          pageNo: response.data?.data?.list?.pageable?.pageNumber ?? -1,
          totalPages: response.data?.data?.list?.totalPages ?? -1,
          last: response.data?.data?.list?.last ?? true,
          first: response.data?.data?.list?.first ?? true,
          totalElements: response.data?.data?.list?.totalElements ?? -1,
        };

        setArchivedNotices(content);
        setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
        setPaginationMetadata(paginationData);
      } catch (error) {
        showErrorMsg(error);
        setArchivedNotices([]);
      } finally {
        setIsLoading(false);
      }
    },
    [pagination],
  );

  useEffect(() => {
    fetchArchivedNotices();
  }, []);

  return {
    isLoading,
    pagination,
    archivedNotices,
    paginationMetadata,
    alert,
    archivedNotices,
    fetchArchivedNotices,
    fetchNextArchivedNotice,
    fetchPreviousArchivedNotice,
    handleAlertOnClose,
  };
}

export default useArchivedNoticesView;

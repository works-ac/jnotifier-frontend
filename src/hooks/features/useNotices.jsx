import React, { useCallback, useEffect, useState } from "react";
import { NoticeListings } from "../../data/NoticeListings";
import { AppPaginationMetadata } from "../../data/PaginationMetadata";
import useAppAlert from "../useAppAlert";
import {
  getNoticeById,
  getNotices,
  getNoticesByCategory,
} from "../../services/NoticeService";

function useNotices() {
  const [isLoading, setIsLoading] = useState(false);
  const [isNoticeLoading, setIsNoticeLoading] = useState(false);
  const [notices, setNotices] = useState(NoticeListings);
  const [noticeDetails, setNoticeDetails] = useState(NoticeListings[0]);
  const [paginationMetadata, setPaginationMetadata] = useState(
    AppPaginationMetadata,
  );
  const [pagination, setPagination] = useState({ page: 0, size: 10 });
  const { alert, handleAlertOnClose, reset, showErrorMsg } = useAppAlert();
  const [isFilterMode, setIsFilterMode] = useState(false);
  const [category, setCategory] = useState();

  const fetchAllNotices = useCallback(async function () {
    setIsLoading(true);
    reset();

    try {
      const response = await getNotices();
      const content = response.data?.data?.list?.content || [];
      const pagination = {
        pageNo: response.data?.data?.list?.pageable?.pageNumber ?? -1,
        totalPages: response.data?.data?.list?.totalPages ?? -1,
        last: response.data?.data?.list?.last ?? true,
        first: response.data?.data?.list?.first ?? true,
        totalElements: response.data?.data?.list?.totalElements ?? -1,
      };

      setNotices(content);
      setPaginationMetadata(pagination);
      setIsFilterMode(false);
    } catch (error) {
      showErrorMsg(error);
      setNotices([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchAllNoticesByCategory = useCallback(async function (category) {
    if (!category) return;

    setIsLoading(true);
    reset();

    try {
      const payload = {
        search: category,
        page: 0,
        size: 10,
      };

      const response = await getNoticesByCategory(payload);
      const content = response.data?.data?.list?.content || [];
      const pagination = {
        pageNo: response.data?.data?.list?.pageable?.pageNumber ?? -1,
        totalPages: response.data?.data?.list?.totalPages ?? -1,
        last: response.data?.data?.list?.last ?? true,
        first: response.data?.data?.list?.first ?? true,
        totalElements: response.data?.data?.list?.totalElements ?? -1,
      };

      setNotices(content);
      setPaginationMetadata(pagination);
      setCategory(category);
      setIsFilterMode(true);
    } catch (error) {
      showErrorMsg(error);
      setNotices([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchNextNotice = useCallback(
    async function () {
      setIsLoading(true);
      reset();

      const payload = {
        page: pagination.page + 1,
        size: 10,
      };

      try {
        const response = await getNotices(payload);
        const content = response.data?.data?.list?.content || [];
        const paginationData = {
          pageNo: response.data?.data?.list?.pageable?.pageNumber ?? -1,
          totalPages: response.data?.data?.list?.totalPages ?? -1,
          last: response.data?.data?.list?.last ?? true,
          first: response.data?.data?.list?.first ?? true,
          totalElements: response.data?.data?.list?.totalElements ?? -1,
        };

        setNotices(content);
        setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
        setPaginationMetadata(paginationData);
      } catch (error) {
        showErrorMsg(error);
      } finally {
        setIsLoading(false);
      }
    },
    [pagination],
  );

  const fetchNextNoticeByCategory = useCallback(
    async function () {
      if (!category) return;

      setIsLoading(true);
      reset();

      const payload = {
        page: pagination.page + 1,
        size: 10,
        search: category,
      };

      try {
        const response = await getNoticesByCategory(payload);
        const content = response.data?.data?.list?.content || [];
        const paginationData = {
          pageNo: response.data?.data?.list?.pageable?.pageNumber ?? -1,
          totalPages: response.data?.data?.list?.totalPages ?? -1,
          last: response.data?.data?.list?.last ?? true,
          first: response.data?.data?.list?.first ?? true,
          totalElements: response.data?.data?.list?.totalElements ?? -1,
        };

        setNotices(content);
        setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
        setPaginationMetadata(paginationData);
        setIsFilterMode(true);
      } catch (error) {
        showErrorMsg(error);
      } finally {
        setIsLoading(false);
      }
    },
    [pagination, category],
  );

  const fetchPreviousNotice = useCallback(
    async function () {
      setIsLoading(true);
      reset();

      const payload = {
        page: pagination.page - 1,
        size: 10,
      };

      try {
        const response = await getNotices(payload);
        const content = response.data?.data?.list?.content || [];
        const paginationData = {
          pageNo: response.data?.data?.list?.pageable?.pageNumber ?? -1,
          totalPages: response.data?.data?.list?.totalPages ?? -1,
          last: response.data?.data?.list?.last ?? true,
          first: response.data?.data?.list?.first ?? true,
          totalElements: response.data?.data?.list?.totalElements ?? -1,
        };

        setNotices(content);
        setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
        setPaginationMetadata(paginationData);
      } catch (error) {
        showErrorMsg(error);
      } finally {
        setIsLoading(false);
      }
    },
    [pagination],
  );

  const fetchPreviousNoticeByCategory = useCallback(
    async function () {
      if (!category) return;

      setIsLoading(true);
      reset();

      const payload = {
        page: pagination.page - 1,
        size: 10,
        search: category,
      };

      try {
        const response = await getNotices(payload);
        const content = response.data?.data?.list?.content || [];
        const paginationData = {
          pageNo: response.data?.data?.list?.pageable?.pageNumber ?? -1,
          totalPages: response.data?.data?.list?.totalPages ?? -1,
          last: response.data?.data?.list?.last ?? true,
          first: response.data?.data?.list?.first ?? true,
          totalElements: response.data?.data?.list?.totalElements ?? -1,
        };

        setNotices(content);
        setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
        setPaginationMetadata(paginationData);
        setIsFilterMode(false);
      } catch (error) {
        showErrorMsg(error);
      } finally {
        setIsLoading(false);
      }
    },
    [pagination, category],
  );

  const fetchNoticeById = useCallback(async function (noticeId) {
    setIsNoticeLoading(true);
    reset();

    try {
      const response = await getNoticeById(noticeId);
      const content = response.data?.data?.notice || {};

      setNoticeDetails(content);
    } catch (error) {
      showErrorMsg(error);
    } finally {
      setIsNoticeLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllNotices();
  }, []);

  return {
    fetchNextNotice,
    fetchPreviousNotice,
    handleAlertOnClose,
    fetchNoticeById,
    fetchAllNotices,
    fetchAllNoticesByCategory,
    fetchNextNoticeByCategory,
    fetchPreviousNoticeByCategory,
    isFilterMode,
    isNoticeLoading,
    noticeDetails,
    notices,
    isLoading,
    alert,
    paginationMetadata,
  };
}

export default useNotices;

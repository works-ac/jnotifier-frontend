import { useState, useCallback } from "react";
import { markJobAsApplied } from "../services/AppliedJobsService";
import useAppAlert from "./useAppAlert";

function useAppliedJob() {
  const [showAppliedPrompt, setShowAppliedPrompt] = useState(false);
  const [isMarking, setIsMarking] = useState(false);
  const [isMarked, setIsMarked] = useState(false);
  const { alert, handleAlertOnClose, showErrorMsg } = useAppAlert();

  const handleApplyClick = useCallback(() => {
    setShowAppliedPrompt(true);
    setIsMarked(false); // Reset just in case they click again
  }, []);

  const handleYesClick = useCallback(async (applicationId) => {
    setIsMarking(true);
    try {
      await markJobAsApplied(applicationId);
      setIsMarked(true);
    } catch (error) {
      showErrorMsg(error);
    } finally {
      setIsMarking(false);
    }
  }, [showErrorMsg]);

  const handleNoClick = useCallback(() => {
    setShowAppliedPrompt(false);
  }, []);

  return {
    showAppliedPrompt,
    isMarking,
    isMarked,
    alert,
    handleAlertOnClose,
    handleApplyClick,
    handleYesClick,
    handleNoClick
  };
}

export default useAppliedJob;

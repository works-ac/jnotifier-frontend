import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { JobDetails } from "../data/JobDetailsPageData";
import JobDetailsCard from "../views/JobDetailsCard";

function JobDetailsPage() {
  const { applicationId } = useParams();
  const job = JobDetails.find(
    (job) => job.applicationId === Number(applicationId),
  );

  useEffect(() => {
    document.title = `Job Notifier || ${job.title}`;
  }, [job]);

  return (
    <>
      {
        <JobDetailsCard
          advNo={job.advNo}
          applicationEndDate={job.applicationEndDate}
          applicationStartDate={job.applicationStartDate}
          applicationId={job.applicationId}
          applyLink={job.applyLink}
          components={job.components}
          shortDescription={job.shortDescription}
          tags={job.tags}
          title={job.title}
        />
      }
    </>
  );
}

export default JobDetailsPage;

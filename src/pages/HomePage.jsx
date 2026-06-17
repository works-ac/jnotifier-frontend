import React from "react";
import { JobListings } from "../data/HomePageData";
import JobListingCard from "../views/JobListingCard";

function HomePage() {
  return (
    <>
      {JobListings.map((job) => (
        <JobListingCard
          applicationId={job.applicationId}
          applicationEndDate={job.applicationEndDate}
          applicationStartDate={job.applicationStartDate}
          shortDescription={job.shortDescription}
          tags={job.tags}
          title={job.title}
          viewMoreLink={job.viewMoreLink}
          advNo={job.advNo}
          key={job.applicationId}
        />
      ))}
    </>
  );
}

export default React.memo(HomePage);

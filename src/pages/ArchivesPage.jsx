import { Box, Container, Tab, Tabs } from "@mui/material";
import React from "react";
import useArchives from "../hooks/features/useArchives";
import { a11yProps } from "../helpers/index";
import AppTabPanel from "../components/core/AppTabPanel";
import ArchivedNoticesView from "../views/tabs/ArchivedNoticesView";
import ArchivedJobsView from "../views/tabs/ArchivedJobsView";
import useSEO from "../hooks/useSEO";
import WhatsAppPromotion from "../components/core/WhatsAppPromotion";

function ArchivesPage() {
  useSEO({
    title: "Archived Jobs & Notices | Job Notifier",
    description:
      "Explore archived government and private job postings, past recruitment notices, and historical vacancy details on Job Notifier.",
    canonicalPath: "/archives",
  });

  const { handleTabChange, value } = useArchives();

  return (
    <Container maxWidth="lg" sx={{ mx: "auto" }}>
      <WhatsAppPromotion />

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleTabChange}
            aria-label="archive-tabs"
            centered
            variant="fullWidth"
            indicatorColor="secondary"
            sx={{ fontWeight: 700 }}
          >
            <Tab label="Archived Jobs" {...a11yProps(0)} />
            <Tab label="Archived Notices" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <AppTabPanel value={value} index={0}>
          <ArchivedJobsView />
        </AppTabPanel>

        <AppTabPanel value={value} index={1}>
          <ArchivedNoticesView />
        </AppTabPanel>
      </Box>
    </Container>
  );
}

export default React.memo(ArchivesPage);

import React from "react";
import DisputeHeaderCards from "./_components/DisputeHeaderCards";
import DisputeReasonAlert from "./_components/DisputeReason";
import CommunicationThread from "./_components/CommunicationThread";
import EvidenceFiles from "./_components/EvidenceFiles";

export default function DisputesPage() {
  return (
    <div>
      <DisputeHeaderCards />
      <DisputeReasonAlert />
      <div className="grid lg:grid-cols-2 gap-4 mt-5">
        <CommunicationThread />
        <EvidenceFiles />
      </div>
    </div>
  );
}

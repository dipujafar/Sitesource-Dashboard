import { AlertCircle } from "lucide-react";
 
const DisputeReasonAlert = () => {
  return (
    <div className="bg-[#FFFBEB] border border-orange-200 rounded-2xl px-5 py-3">
      <div className="flex items-center gap-x-2 text-orange-700 font-semibold text-sm">
        <AlertCircle size={16} />
        <p className="text-[#973C00]">Dispute Reason</p>
      </div>
      <p className="text-[#BB4D00] mt-1 ml-6">
        Worker claims 8 extra hours not reflected in approved timesheet
      </p>
    </div>
  );
};
 
export default DisputeReasonAlert;

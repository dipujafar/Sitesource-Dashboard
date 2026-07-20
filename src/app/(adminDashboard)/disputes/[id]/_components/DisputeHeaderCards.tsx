"use client";
import { Briefcase, Flag, CheckCircle2, RotateCcw } from "lucide-react";

const DisputeHeaderCards = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Worker Card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <div className="flex items-center gap-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 font-semibold flex items-center justify-center text-sm">
            JM
          </div>
          <div>
            <p className="font-semibold text-gray-900">James Mitchell</p>
            <p className="text-sm text-gray-500">Worker · Electrician</p>
          </div>
        </div>
        <div className="flex items-center gap-x-1.5 text-gray-500 text-sm mt-4">
          <Briefcase size={15} />
          <p>ENG-2024-001</p>
        </div>
      </div>

      {/* Contractor Card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <div className="flex items-center gap-x-3">
          <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-sm">
            <Briefcase size={18} />
          </div>
          <div>
            <p className="font-semibold text-gray-900">Harrington Build Ltd</p>
            <p className="text-sm text-gray-500">Contractor</p>
          </div>
        </div>
        <div className="flex items-center gap-x-1.5 text-gray-500 text-sm mt-4">
          <Flag size={15} />
          <p>Opened 24 Jun 2024</p>
        </div>
      </div>

      {/* Payment In Dispute Card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium tracking-wide text-gray-400 uppercase">
            Payment In Dispute
          </p>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-600">
            On Hold
          </span>
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mt-2">£3,040</h3>
        <div className="flex items-center gap-x-2 mt-4">
          <button className="flex-1 flex items-center justify-center gap-x-1.5 bg-[#009966] hover:bg-green-700 text-white text-sm font-medium rounded-lg py-2 cursor-pointer">
            <CheckCircle2 size={16} />
            Release
          </button>
          <button className="flex-1 flex items-center justify-center gap-x-1.5 bg-[#155DFC] hover:bg-blue-700 text-white text-sm font-medium rounded-lg py-2 cursor-pointer">
            <RotateCcw size={16} />
            Refund
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisputeHeaderCards;
"use client";

import { Input, Select, TableProps, message, Popconfirm, Image } from "antd";
import { Search, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import moment from "moment";
import { useDebounce } from "use-debounce";

import DataTable from "@/utils/DataTable";
import {
  useDeleteReviewMutation,
  useGetReviewsQuery,
} from "@/redux/api/reviewsApi";
import { cn } from "@/lib/utils";

type TReview = {
  id: string;
  rating: number;
  feedback?: string;
  givenAt?: string;
  job?: {
    title?: string;
  };
  giverAuth?: {
    email?: string;
    profile?: {
      name?: string;
      image?: string | null;
    };
  };
  receiverAuth?: {
    email?: string;
    profile?: {
      name?: string;
      image?: string | null;
    };
  };
};

const ReviewsTable = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";
  const [searchText, setSearchText] = useState("");
  const [selectedRating, setSelectedRating] = useState<string>("ALL");
  const [searchValue] = useDebounce(searchText, 500);
  const [deleteReview] = useDeleteReviewMutation();

  const queryParams: Record<string, string> = {
    page,
    limit,
  };

  if (searchValue.trim()) {
    queryParams.searchTerm = searchValue.trim();
    queryParams.page = "1";
  }

  if (selectedRating && selectedRating !== "ALL") {
    queryParams.rating = selectedRating;
    queryParams.page = "1";
  } else {
    delete queryParams.rating;
  }

  const { data: reviewsData, isLoading } = useGetReviewsQuery(queryParams);
  const reviews = reviewsData?.data?.reviews ?? [];

  const handleDelete = async (id: string) => {
    try {
      await deleteReview(id).unwrap();
      message.success("Review deleted successfully");
    } catch (error: any) {
      message.error(error?.data?.message || "Something went wrong");
    }
  };

  const columns: TableProps<TReview>["columns"] = [
    {
      title: "No.",
      dataIndex: "serial",
      render: (_, __, index) => (
        <p>
          {`# ${
            Number(page) === 1
              ? index + 1
              : (Number(page) - 1) * Number(limit) + index + 1
          }`}
        </p>
      ),
    },
    {
      title: "Job",
      dataIndex: "job",
      render: (job) => <p className="font-medium">{job?.title || "N/A"}</p>,
    },
    {
      title: "Giver",
      dataIndex: "giverAuth",
      render: (giverAuth) => {
        const name = giverAuth?.profile?.name || "User";
        const email = giverAuth?.email || "N/A";
        const image = giverAuth?.profile?.image;
        const initial = name.charAt(0).toUpperCase();

        return (
          <div className="flex items-center gap-3">
            {image ? (
              <Image
                src={image}
                alt={name}
                width={32}
                height={32}
                className="!w-8 !h-8 rounded-full object-cover border border-gray-200"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center text-xs font-semibold">
                {initial}
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-medium">{name}</span>
              <span className="text-xs text-gray-500">{email}</span>
            </div>
          </div>
        );
      },
    },
    {
      title: "Receiver",
      dataIndex: "receiverAuth",
      render: (receiverAuth) => {
        const name = receiverAuth?.profile?.name || "User";
        const email = receiverAuth?.email || "N/A";
        const image = receiverAuth?.profile?.image;
        const initial = name.charAt(0).toUpperCase();

        return (
          <div className="flex items-center gap-3">
            {image ? (
              <Image
                src={image}
                alt={name}
                width={32}
                height={32}
                className="!w-8 !h-8 rounded-full object-cover border border-gray-200"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center text-xs font-semibold">
                {initial}
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-medium">{name}</span>
              <span className="text-xs text-gray-500">{email}</span>
            </div>
          </div>
        );
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      render: (text) => (
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold",
            Number(text) >= 4
              ? "bg-green-100 text-green-700"
              : Number(text) >= 3
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700",
          )}
        >
          <Star size={12} className="fill-current" />
          {text ?? 0}
        </span>
      ),
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      render: (text) => (
        <p className="max-w-[300px]  text-sm text-gray-600">{text || "N/A"}</p>
      ),
    },
    {
      title: "Date",
      dataIndex: "givenAt",
      render: (text) => (
        <p>{text ? moment(text).format("DD MMM YYYY") : "N/A"}</p>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Popconfirm
          title="Delete this review"
          description="Are you sure you want to delete this review?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <button
            type="button"
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="bg-section-bg rounded-xl">
      <div className="md:flex items-center justify-between gap-3 py-4 px-2">
        <div className="flex flex-col md:flex-row items-center gap-2 ml-auto  ">
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<Search size={16} />}
            placeholder="Search reviews"
            className="!max-w-72 h-9 !bg-[#F7F6F4] lg:w-[500px]"
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={reviews}
        pageSize={Number(limit)}
        total={reviewsData?.data?.meta?.total}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ReviewsTable;

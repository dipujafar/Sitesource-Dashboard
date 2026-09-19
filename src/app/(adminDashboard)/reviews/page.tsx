import ReviewsTable from "./_components/ReviewsTable";

export default function ReviewsPage() {
  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-semibold text-text-color mb-1">Reviews</h1>
        <p className="text-primary-gray text-base font-normal">
          Manage all reviews and feedback shared between employers and workers
        </p>
      </div>
      <ReviewsTable />
    </div>
  );
}

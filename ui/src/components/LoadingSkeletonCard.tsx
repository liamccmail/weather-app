export default function LoadingSkeletonCard() {
  return (
    <div data-testid="loading-skeleton" className="bg-ghost-white p-6 rounded-lg shadow-lg flex justify-center">
      <div className="flex-1 text-center">
        <div className="h-6 bg-gray-300 rounded w-1/4 mx-auto mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-2/4 mx-auto mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4 mx-auto"></div>
      </div>

      <div className="border-l border-gray-600 mx-4"></div>

      <div className="flex-1 text-center">
        <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4 mx-auto mb-1"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-1"></div>
        <div className="h-4 bg-gray-300 rounded w-2/4 mx-auto"></div>
      </div>

      <div className="border-l border-gray-600 mx-4"></div>

      <div className="flex-1 text-center">
        <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4 mx-auto mb-1"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4 mx-auto"></div>
      </div>
    </div>
  );
}
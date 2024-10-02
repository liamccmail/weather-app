import Skeleton from '@mui/material/Skeleton';

export default function LoadingSkeletonCard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center max-w-md mx-auto">
      <Skeleton variant="text" sx={{ fontSize: '1rem', width: 150 }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem', width: 200 }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem', width: 100 }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem', width: 100 }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem', width: 100 }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem', width: 100 }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem', width: 100 }} />
    </div>
  );
}
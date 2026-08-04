import './LoadingSkeleton.css';

export const LoadingSkeleton = () => {
  return (
    <div className="loading-skeleton">
      <div className="skeleton-text skeleton-title" />
      <div className="skeleton-text skeleton-line" />
      <div className="skeleton-text skeleton-line" />
      <div className="skeleton-text skeleton-line-short" />
    </div>
  );
};

import './LoadingScreen.css';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen = ({ 
  message = 'Loading map...' 
}: LoadingScreenProps) => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-spinner"></div>
        <p className="loading-message">{message}</p>
      </div>
    </div>
  );
};

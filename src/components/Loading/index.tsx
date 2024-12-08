interface LoadingProps {
  isLoading: boolean;
}

const Loading = ({ isLoading }: LoadingProps) => {
  return (
    isLoading && (
      <div className="loading-overlay">
        <div className="spinner-border loading-color" role="status"></div>
      </div>
    )
  );
};

export default Loading;

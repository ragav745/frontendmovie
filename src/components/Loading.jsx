// Loading spinner placeholder for async requests.
function Loading() {
  return (
    <div className="text-center py-5">
      <div className="spinner-border text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3 mb-0">Loading...</p>
    </div>
  );
}

export default Loading;

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      <span className="text-gray-300">Processing...</span>
    </div>
  );
}

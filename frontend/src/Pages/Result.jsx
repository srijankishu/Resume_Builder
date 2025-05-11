import { useLocation } from "react-router-dom";
import PortfolioPreview from "../components/PortfolioPreview";

const Result = () => {
  const location = useLocation();
  const { markdown } = location.state || {};

  if (!markdown) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No portfolio data found. Please generate your portfolio first.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <PortfolioPreview markdown={markdown} />
    </div>
  );
};

export default Result;

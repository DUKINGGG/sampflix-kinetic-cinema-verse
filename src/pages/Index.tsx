
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically redirect to the landing page
    navigate("/");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to SampFLIX</h1>
        <p className="text-xl text-gray-400">Redirecting to home page...</p>
      </div>
    </div>
  );
};

export default Index;

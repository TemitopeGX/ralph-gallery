"use client";

import { useEffect, useState } from "react";
import { FaExclamationCircle, FaTimes } from "react-icons/fa";

interface AuthErrorAlertProps {
  error: string;
  onClose: () => void;
}

export default function AuthErrorAlert({
  error,
  onClose,
}: AuthErrorAlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 5000); // Auto dismiss after 5 seconds

    return () => clearTimeout(timer);
  }, [error, onClose]);

  const getErrorMessage = (errorMessage: string) => {
    switch (errorMessage) {
      case "Firebase: Error (auth/invalid-credential).":
        return "Invalid email or password. Please try again.";
      case "Firebase: Error (auth/user-not-found).":
        return "No account found with this email.";
      case "Firebase: Error (auth/wrong-password).":
        return "Incorrect password. Please try again.";
      case "Firebase: Error (auth/too-many-requests).":
        return "Too many failed attempts. Please try again later.";
      case "Firebase: Error (auth/network-request-failed).":
        return "Network error. Please check your connection.";
      default:
        return "An error occurred. Please try again.";
    }
  };

  if (!isVisible) return null;

  return (
    <div className="animate-slide-in-top">
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 relative">
        <div className="flex items-start gap-3">
          <FaExclamationCircle className="text-red-500 text-lg flex-shrink-0 mt-0.5" />
          <div className="flex-grow">
            <p className="text-red-500 font-medium mb-1">
              Authentication Error
            </p>
            <p className="text-red-400/90 text-sm">{getErrorMessage(error)}</p>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              onClose();
            }}
            className="text-red-500/70 hover:text-red-500 transition-colors"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";

interface AlertDestructiveProps {
  error: string;
}

export const AlertDestructive: React.FC<AlertDestructiveProps> = ({
  error,
}) => {
  return (
    <Alert
      className="fixed z-20 w-4/5 left-4 md:w-3/12  bg-white dark:bg-background dark:border-red-600 bottom-3"
      variant="destructive"
    >
      <AlertCircle className="h-4 w-4 dark:text-red-600" />
      <AlertTitle className="dark:text-red-600">Error</AlertTitle>
      <AlertDescription className="dark:text-red-600">{error}</AlertDescription>
    </Alert>
  );
};

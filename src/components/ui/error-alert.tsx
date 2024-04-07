import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './alert';

interface AlertDestructiveProps {
  error: string;
}

export const AlertDestructive: React.FC<AlertDestructiveProps> = ({
  error,
}) => {
  return (
    <Alert
      className="fixed bottom-3 left-4 z-20 w-4/5  bg-white dark:border-red-600 dark:bg-background md:w-3/12"
      variant="destructive"
    >
      <AlertCircle className="size-4 dark:text-red-600" />
      <AlertTitle className="dark:text-red-600">Error</AlertTitle>
      <AlertDescription className="dark:text-red-600">{error}</AlertDescription>
    </Alert>
  );
};

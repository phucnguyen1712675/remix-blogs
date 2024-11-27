import { type InputHTMLAttributes, forwardRef } from "react";
import { ErrorMessage } from '~/components/ui/ErrorMessage';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
            error ? "border-red-500" : ""
          } ${className}`}
          {...props}
        />
        {error && <ErrorMessage message={error} />}
      </div>
    );
  }
);

Input.displayName = "Input"; 
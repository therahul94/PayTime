import React from "react";

export default function Balanceskelaton() {
  return (
    <div
      role="status"
      class="p-4 space-y-2  divide-gray-200 rounded  animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
    >
      <div className="flex items-center">
        <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mr-3"></div>
        <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
      </div>
      <span class="sr-only">Loading...</span>
    </div>
  );
}

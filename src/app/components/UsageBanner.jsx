"use client";

import { useEffect, useState } from "react";

export default function UsageBanner() {
  const [usage, setUsage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchUsage() {
      try {
        const response = await fetch("/api/usage", {
          cache: "no-store",
          credentials: "include",
        });
        if (!response.ok) {
          const data = await response.json().catch(() => null);
          throw new Error(data?.error || "Unable to load usage");
        }

        const data = await response.json();
        if (!isMounted) return;
        setUsage(data);
      } catch (err) {
        if (!isMounted) return;
        setError(err.message);
      }
    }

    fetchUsage();

    return () => {
      isMounted = false;
    };
  }, []);

  if (error) {
    if (error.includes("Authentication required")) {
      return null;
    }

    return (
      <div className="rounded-xl border border-yellow-600 bg-yellow-950/20 px-4 py-3 text-sm text-yellow-200">
        {error}
      </div>
    );
  }

  if (!usage) {
    return (
      <div className="rounded-xl border border-gray-700 bg-gray-900/70 px-4 py-3 text-sm text-gray-300">
        Loading usage...
      </div>
    );
  }

  if (usage.isAdmin) {
    return (
      <div className="rounded-xl border border-green-600 bg-green-950/20 px-4 py-3 text-sm text-green-200">
        Admin users do not have a daily question limit.
      </div>
    );
  }

  if (usage.remaining === 0) {
    return (
      <div className="rounded-xl border border-red-600 bg-red-950/20 px-4 py-3 text-sm text-red-200">
        You have reached your {usage.limit} question limit for today.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-blue-600 bg-blue-950/20 px-4 py-3 text-sm text-blue-200">
      You have {usage.remaining} of {usage.limit} questions remaining today.
    </div>
  );
}

import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/report-issue")({
  component: () => <Navigate to="/feedback" />,
});

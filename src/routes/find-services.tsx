import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/find-services")({
  beforeLoad: () => {
    throw redirect({
      to: "/service-center-near-me",
    });
  },
});

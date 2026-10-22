import { createFileRoute } from "@tanstack/react-router";
import Landing from "@/components/Landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MY EV SERVICE — India's Multi-Brand EV Service Network | Pune" },
      {
        name: "description",
        content: "Doorstep EV service, battery diagnostics, roadside assistance & certified repairs for electric 2W, 3W & 4W in Pune. Book in 60 seconds.",
      },
      {
        name: "keywords",
        content: "EV service Pune, electric vehicle repair Pune, EV battery diagnostics, doorstep EV service, roadside assistance EV Pune, multi-brand EV service",
      },
    ],
  }),
  component: Landing,
});

import { createFileRoute } from "@tanstack/react-router";
import { ServiceCentresPage } from "./service-centres.$centerId";

export const Route = createFileRoute("/service-centres")({
  component: ServiceCentresPage,
});

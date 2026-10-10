import { Kanban } from "@/features/kanban/Kanban"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/$id")({
  component: RouteComponent
})

function RouteComponent() {
  return <Kanban />
}
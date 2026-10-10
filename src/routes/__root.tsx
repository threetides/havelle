import { Sidebar } from "@/features/navigation/Sidebar"
import { Outlet, createRootRoute } from "@tanstack/react-router"

export const Route = createRootRoute({
  component: RootComponent
})

function RootComponent() {
  return (
    <div className="flex h-full">
      <Sidebar />
      <Outlet />
    </div>
  )
}
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"
import { boardsAtom } from "@/features/store/store"
import { createFileRoute, Link } from "@tanstack/react-router"
import { useAtomValue } from "jotai"

export const Route = createFileRoute("/")({
  component: RouteComponent
})

function RouteComponent() {
  const boards = useAtomValue(boardsAtom)

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1>Havelle</h1>
      <div className="grid grid-cols-3 gap-4">
        {boards.map((board) => {
          return (
            <Item
              variant="outline"
              key={board.id}
              render={
                <Link to={`/${board.id}`}>
                  <ItemContent>
                    <ItemTitle>{board.name}</ItemTitle>
                    <ItemDescription>Description</ItemDescription>
                  </ItemContent>
                </Link>
              }
            ></Item>
          )
        })}
      </div>
    </div>
  )
}
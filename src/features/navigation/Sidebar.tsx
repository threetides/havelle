import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useAtom } from "jotai"
import { useState, type FC, type SubmitEvent } from "react"
import { v7 as uuidv7 } from "uuid"
import { boardsAtom } from "../store/store"
import { Link, useNavigate } from "@tanstack/react-router"
import favicon from "/favicon.svg"

export const Sidebar: FC = () => {
  const [name, setName] = useState<string>("")
  const [boards, setBoards] = useAtom(boardsAtom)
  const [open, setOpen] = useState<boolean>(false)

  const navigate = useNavigate()

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const id = uuidv7()

    if (name.length > 0) {
      setBoards((prevBoards) => [...prevBoards, { id: id, name: name }])
      setOpen(false)
      setName("")
      navigate({ to: `/${id}` })
    }
  }

  return (
    <nav className="bg-sidebar p-4 w-52 flex flex-col gap-4 border-r border-border-sidebar">
      <Link to="/" className="flex items-center">
        <img src={favicon} alt="havelle favicon" className="h-8" />
        <p className="pl-2 text-2xl">Havelle</p>
      </Link>
      <div className="flex flex-col">
        {boards.map((board) => {
          return (
            <Button
              variant="ghost"
              className="justify-start w-full group-data-[status=active]/link:bg-muted"
              render={
                <Link key={board.id} to={`/${board.id}`} className="group/link">
                  <p className="truncate">{board.name}</p>
                </Link>
              }
            ></Button>
          )
        })}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={<Button variant="outline">New board</Button>} />
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create a new board</DialogTitle>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-2">
              <form action="POST" id="board-name-form" onSubmit={(e) => handleSubmit(e)}>
                <Field>
                  <FieldLabel htmlFor="board-name">Board name</FieldLabel>
                  <Input id="board-name" onChange={(e) => setName(e.target.value)} value={name} />
                </Field>
              </form>
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose
              render={
                <Button type="button" variant="outline">
                  Close
                </Button>
              }
            />
            <Button type="submit" form="board-name-form" disabled={name.length === 0}>
              Create board
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </nav>
  )
}
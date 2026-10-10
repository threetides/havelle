import { useAtom } from "jotai"
import { useEffect, useState, type FC, type SubmitEvent } from "react"
import { boardsAtom } from "../store/store"
import { useNavigate, useParams } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
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
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"

export const Kanban: FC = () => {
  const [boards, setBoards] = useAtom(boardsAtom)
  const [name, setName] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)

  const { id } = useParams({ from: "/$id" })
  const board = boards.filter((board) => board.id === id)[0]

  const navigate = useNavigate()

  useEffect(() => {
    if (board) setName(board.name)
  }, [board])

  if (!board) return

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setBoards((prevBoards) =>
      prevBoards.map((board) => (board.id === id ? { ...board, name: name } : board))
    )
    setOpen(false)
  }

  const deleteBoard = () => {
    setBoards((prevBoards) => prevBoards.filter((board) => board.id !== id))
    navigate({ to: "/" })
  }

  return (
    <div className="flex-1">
      <div className="flex justify-between items-center p-4">
        <h1 className="[text-box-trim:trim-both] [text-box-edge:cap_alphabetic]">{board.name}</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            render={
              <Button size="icon" variant="outline">
                <Settings />
              </Button>
            }
          />
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit board</DialogTitle>
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
                Update
              </Button>
              <AlertDialog>
                <AlertDialogTrigger
                  render={
                    <Button variant="destructive" className="ml-auto">
                      Delete board
                    </Button>
                  }
                />
                <AlertDialogContent className="sm:max-w-md">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  </AlertDialogHeader>
                  <div className="flex items-center gap-2">
                    <div className="grid flex-1 gap-2">
                      <form action="POST" id="board-name-form" onSubmit={(e) => handleSubmit(e)}>
                        <p>This action cannot be undone.</p>
                      </form>
                    </div>
                  </div>
                  <AlertDialogFooter className="sm:justify-start">
                    <AlertDialogCancel
                      render={
                        <Button type="button" variant="outline">
                          Close
                        </Button>
                      }
                    />
                    <Button variant="destructive" className="ml-auto" onClick={deleteBoard}>
                      Delete board
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
import { atomWithStorage } from "jotai/utils"

export const boardsAtom = atomWithStorage<{ id: string; name: string }[]>("boards", [])
import { Havelle } from "@/assets/havelle"
import type { FC } from "react"

const currentDate = new Date()
const currentYear = currentDate.getFullYear()

export const Footer: FC = () => {
  return (
    <footer>
      <div className="flex gap-4 justify-between p-6 max-w-5xl m-auto">
        <div className="flex items-center gap-2">
          <Havelle aria-hidden="true" className="h-6 w-6" />
          <span>Havelle</span>
        </div>
        <span className="text-sm text-muted-foreground">© {currentYear} Havelle</span>
      </div>
    </footer>
  )
}

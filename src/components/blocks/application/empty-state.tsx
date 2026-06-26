import { FileXIcon, InboxIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

function EmptyStateSimple() {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon />
        </EmptyMedia>
        <EmptyTitle>No messages yet</EmptyTitle>
        <EmptyDescription>
          When you receive messages, they will appear here.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

function EmptyStateWithAction() {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileXIcon />
        </EmptyMedia>
        <EmptyTitle>No projects found</EmptyTitle>
        <EmptyDescription>
          Get started by creating your first project. You can invite team members once
          it&apos;s set up.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">
          <PlusIcon />
          Create project
        </Button>
      </EmptyContent>
    </Empty>
  )
}

export { EmptyStateSimple, EmptyStateWithAction }

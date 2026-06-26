"use client"

import * as React from "react"

import { BotIcon, PaperclipIcon, PlusIcon, SendIcon, SparklesIcon } from "lucide-react"

import { DemoAvatar } from "@/components/demo/demo-avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { pulseAi, pulseAiMessages, pulseAiThreads } from "@/lib/demo"
import { firstOrThrow } from "@/lib/optional-props"
import { cn } from "@/lib/utils"

type ChatMessage = {
  id: string
  role: "user" | "assistant"
  content: string
}

export function AiChatDemoPage() {
  const [messages, setMessages] = React.useState<ChatMessage[]>(pulseAiMessages)
  const [input, setInput] = React.useState("")
  const [sending, setSending] = React.useState(false)

  const activeThread =
    pulseAiThreads.find((t) => t.active) ??
    firstOrThrow(pulseAiThreads, "threads required")

  function handleSend(e: React.FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || sending) return

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setSending(true)

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content:
            "I can draft that for you. For board-ready metrics, pull the June activation report from Analytics → Funnels and I will format the narrative.",
        },
      ])
      setSending(false)
    }, 900)
  }

  return (
    <div className="flex min-h-[640px] bg-background">
      <aside className="hidden w-64 shrink-0 flex-col border-e bg-muted/20 md:flex">
        <div className="flex items-center justify-between border-b p-4">
          <span className="flex items-center gap-2 font-semibold">
            <SparklesIcon className="size-4 text-primary" />
            {pulseAi.name}
          </span>
          <Button variant="ghost" size="icon-sm" aria-label="New chat">
            <PlusIcon className="size-4" />
          </Button>
        </div>
        <ScrollArea className="flex-1 p-2">
          <nav className="space-y-1" aria-label="Chat threads">
            {pulseAiThreads.map((thread) => (
              <button
                key={thread.id}
                type="button"
                className={cn(
                  "w-full rounded-lg px-3 py-2 text-start text-sm transition-colors",
                  thread.active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {thread.title}
              </button>
            ))}
          </nav>
        </ScrollArea>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b px-4 py-3">
          <div>
            <h1 className="font-heading text-sm font-semibold">{activeThread.title}</h1>
            <p className="text-xs text-muted-foreground">
              {pulseAi.model} · {pulseAi.tagline}
            </p>
          </div>
          <Badge variant="secondary">Workspace</Badge>
        </header>

        <ScrollArea className="flex-1 px-4 py-6">
          <div className="mx-auto max-w-2xl space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-3",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {msg.role === "assistant" ? (
                  <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <BotIcon className="size-4" />
                  </div>
                ) : (
                  <DemoAvatar name="Jordan Lee" size="sm" className="mt-0.5" />
                )}
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  )}
                >
                  {msg.content.split("\n").map((line, i) => (
                    <p key={i} className={i > 0 ? "mt-2" : undefined}>
                      {line.replace(/\*\*(.*?)\*\*/g, "$1")}
                    </p>
                  ))}
                </div>
              </div>
            ))}
            {sending ? (
              <div className="flex gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <BotIcon className="size-4" />
                </div>
                <div className="rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">
                  Thinking…
                </div>
              </div>
            ) : null}
          </div>
        </ScrollArea>

        <div className="border-t p-4">
          <form
            className="mx-auto flex max-w-2xl items-center gap-2"
            onSubmit={handleSend}
          >
            <Button type="button" variant="ghost" size="icon" aria-label="Attach file">
              <PaperclipIcon className="size-4" />
            </Button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Pulse AI about your workspace…"
              className="flex-1"
              aria-label="Message"
              disabled={sending}
            />
            <Button
              type="submit"
              size="icon"
              aria-label="Send message"
              disabled={!input.trim() || sending}
            >
              <SendIcon className="size-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

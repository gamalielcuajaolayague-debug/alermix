"use client"

import { useLocalStorage } from "@/hooks/useLocalStorage"
import type { LogEntry } from "@/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Flame, Waves, Trash2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export function HistoryClient() {
  const [history, setHistory] = useLocalStorage<LogEntry[]>("alert-history", [])

  const handleClearHistory = () => {
    setHistory([])
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="font-headline text-2xl">Alert History</CardTitle>
          <CardDescription>A log of all detected events.</CardDescription>
        </div>
        {history.length > 0 && (
           <Button variant="destructive" size="icon" onClick={handleClearHistory} aria-label="Clear History">
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <div className="text-center text-muted-foreground py-10">
            <p>No alerts recorded yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((log) => (
              <div key={log.id} className="flex items-center space-x-4 p-3 rounded-lg border">
                {log.type === "fire" ? (
                  <div className="p-2 bg-destructive/10 rounded-full">
                    <Flame className="h-6 w-6 text-destructive" />
                  </div>
                ) : (
                  <div className="p-2 bg-blue-500/10 rounded-full">
                    <Waves className="h-6 w-6 text-blue-500" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-semibold capitalize">{log.type} Alert</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {history.length > 0 && (
        <CardFooter>
          <p className="text-xs text-muted-foreground">
            Displaying last {history.length} events.
          </p>
        </CardFooter>
      )}
    </Card>
  )
}

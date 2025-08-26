
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  TriangleAlert,
  MapPin,
  Phone,
  History,
  BookOpen,
  Settings,
} from "lucide-react";
import { useAlarm } from "@/hooks/useAlarm";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { LogEntry, AlertType } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

type Status = "safe" | AlertType;

const ActivityPanel = ({
  title,
  status,
}: {
  title: string;
  status: Status;
}) => {
  const isAlert = status !== "safe";
  return (
    <div className="flex h-48 flex-col items-center justify-center space-y-2 rounded-lg border bg-background p-4 text-center">
      <h3 className="font-headline text-lg">{title}</h3>
      {isAlert ? (
        <div className="flex flex-col items-center justify-center space-y-2 text-destructive">
          <TriangleAlert className="h-16 w-16 animate-pulse" />
          <p className="font-bold">EVACUATE NOW!</p>
        </div>
      ) : (
        <p className="text-muted-foreground">No results found</p>
      )}
    </div>
  );
};

export function DashboardClient() {
  const [earthquakeStatus, setEarthquakeStatus] = useState<Status>("safe");
  const [fireStatus, setFireStatus] = useState<Status>("safe");
  const { play, stop } = useAlarm();
  const [history, setHistory] = useLocalStorage<LogEntry[]>(
    "alert-history",
    []
  );
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const triggerAlert = () => {
      // Only trigger if both are safe
      if (earthquakeStatus !== "safe" || fireStatus !== "safe") return;

      const random = Math.random();
      if (random < 0.1) {
        // 10% chance
        const alertType: AlertType = random < 0.05 ? "fire" : "earthquake";
        if (alertType === "fire") {
          setFireStatus("fire");
        } else {
          setEarthquakeStatus("earthquake");
        }
        const newLog: LogEntry = {
          id: new Date().toISOString(),
          type: alertType,
          timestamp: Date.now(),
        };
        setHistory([newLog, ...history]);
        play();
        toast({
          title: 'ALERMIX',
          description: (
            <div className="flex flex-col">
              <span>EMERGENCY ALERT: {alertType.toUpperCase()} ACTIVITY DETECTED</span>
              <span>EVACUATE PREMISES IMMEDIATELY</span>
            </div>
          ),
          variant: "destructive",
          duration: 10000,
        });
      }
    };
    const alertInterval = setInterval(triggerAlert, 7000);
    return () => clearInterval(alertInterval);
  }, [history, setHistory, play, toast, earthquakeStatus, fireStatus]);
  
  const handleReset = () => {
      setEarthquakeStatus("safe");
      setFireStatus("safe");
      stop();
  }

  if (!isClient) {
    return (
      <div className="p-4 space-y-4">
        <Card>
            <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-48 w-full" />
                </div>
                 <div className="mt-4 flex items-center justify-center rounded-lg border p-2">
                    <Skeleton className="h-6 w-48" />
                </div>
            </CardContent>
        </Card>
        <div className="space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">DASHBOARD</h1>
      <div className="flex-1 space-y-4">
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <ActivityPanel title="Earthquake Activity" status={earthquakeStatus} />
              <ActivityPanel title="Fire Activity" status={fireStatus} />
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 rounded-lg border p-2 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-medium">GEN. EMILIO AGUINALDO NHS</span>
            </div>
          </CardContent>
        </Card>
        
        {(fireStatus !== 'safe' || earthquakeStatus !== 'safe') && (
            <Button onClick={handleReset} className="w-full" variant="destructive">
                Reset Alerts
            </Button>
        )}

      </div>

      <div className="space-y-2 py-4">
        <Link href="/hotlines" passHref>
          <Button variant="outline" className="w-full justify-start h-14 text-base">
            <Phone className="mr-4" /> Emergency Hotlines
          </Button>
        </Link>
        <Link href="/history" passHref>
          <Button variant="outline" className="w-full justify-start h-14 text-base">
            <History className="mr-4" /> History Log
          </Button>
        </Link>
        <Link href="/guides" passHref>
          <Button variant="outline" className="w-full justify-start h-14 text-base">
            <BookOpen className="mr-4" /> Emergency Guides
          </Button>
        </Link>
      </div>
    </div>
  );
}

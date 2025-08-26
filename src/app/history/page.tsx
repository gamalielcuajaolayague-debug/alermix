import Link from "next/link";
import { HistoryClient } from '@/components/HistoryClient';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function HistoryPage() {
    return (
        <div className="p-4 space-y-4">
            <Link href="/" passHref>
                <Button variant="outline" className="w-full justify-start">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </Button>
            </Link>
            <HistoryClient />
        </div>
    );
}

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, ArrowLeft } from "lucide-react"

const hotlines = [
  { name: "National Emergency Hotline", number: "911" },
  { name: "Bureau of Fire Protection", number: "117" },
  { name: "Philippine Red Cross", number: "143" },
  { name: "NDRRMC", number: "(02) 8911-5061" },
]

export default function HotlinesPage() {
  return (
    <div className="p-4 space-y-4">
      <Link href="/" passHref>
        <Button variant="outline" className="w-full justify-start">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </Link>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            Emergency Hotlines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {hotlines.map((hotline) => (
            <a key={hotline.name} href={`tel:${hotline.number}`}>
              <Button
                variant="outline"
                className="w-full justify-start h-16 bg-accent/30 hover:bg-accent/50 border-accent"
              >
                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-accent-foreground" />
                  <div className="text-left">
                    <p className="font-semibold text-accent-foreground">{hotline.name}</p>
                    <p className="text-muted-foreground">{hotline.number}</p>
                  </div>
                </div>
              </Button>
            </a>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

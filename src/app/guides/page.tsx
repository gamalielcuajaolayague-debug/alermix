import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Flame, Waves, ArrowLeft } from "lucide-react"

export default function GuidesPage() {
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
            Emergency Guides
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="fire">
              <AccordionTrigger>
                <div className="flex items-center gap-2 font-headline text-lg">
                  <Flame className="h-5 w-5 text-destructive" />
                  Fire Safety
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-2 text-muted-foreground">
                <p>
                  <strong>1. React Immediately:</strong> If you see fire, alert everyone and evacuate.
                </p>
                <p>
                  <strong>2. Crawl Low:</strong> If there is smoke, stay low to the ground to avoid inhaling it.
                </p>
                <p>
                  <strong>3. Check Doors:</strong> Before opening a door, feel it with the back of your hand. If it's hot, find another way out.
                </p>
                <p>
                  <strong>4. Stop, Drop, and Roll:</strong> If your clothes catch fire, stop, drop to the ground, and roll to extinguish the flames.
                </p>
                 <p>
                  <strong>5. Have a Meeting Point:</strong> Establish a safe meeting point outside for your family.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="earthquake">
              <AccordionTrigger>
                <div className="flex items-center gap-2 font-headline text-lg">
                  <Waves className="h-5 w-5 text-blue-500" />
                  Earthquake Safety
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-2 text-muted-foreground">
                 <p>
                  <strong>1. Drop, Cover, and Hold On:</strong> Drop to the ground, take cover under a sturdy table or desk, and hold on until the shaking stops.
                </p>
                <p>
                  <strong>2. Stay Indoors:</strong> Do not run outside during an earthquake. You are safer inside.
                </p>
                <p>
                  <strong>3. Avoid Doorways:</strong> Doorways are not safer and can cause injury from swinging doors.
                </p>
                 <p>
                  <strong>4. After the Shaking:</strong> When the shaking stops, check for injuries and hazards. Be prepared for aftershocks.
                </p>
                 <p>
                  <strong>5. If Outdoors:</strong> Move to an open area away from buildings, trees, and power lines.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}

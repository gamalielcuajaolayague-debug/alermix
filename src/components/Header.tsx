import { Settings } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b bg-card px-4">
      <div className="flex items-center gap-2">
        <svg
          width="28"
          height="28"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 text-primary"
        >
          <path
            d="M85,100H15C6.7,100,0,93.3,0,85V15C0,6.7,6.7,0,15,0H85c8.3,0,15,6.7,15,15V85C100,93.3,93.3,100,85,100Z"
            fill="currentColor"
          />
          <circle cx="50" cy="50" r="10" fill="black" />
          <circle cx="50" cy="50" r="20" stroke="black" strokeWidth="2" fill="none" />
          <circle cx="50" cy="50" r="30" stroke="black" strokeWidth="2" fill="none" />
          <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="2" fill="none" />
          <circle cx="50" cy="50" r="45" stroke="black" strokeWidth="1" fill="none" />
        </svg>
        <h1 className="font-headline text-2xl font-bold text-foreground">
          ALERMIX
        </h1>
      </div>
      <button aria-label="Settings">
        <Settings className="h-6 w-6 text-muted-foreground" />
      </button>
    </header>
  );
}

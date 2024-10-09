import Link from 'next/link';

export function Footer() {
  return (
    <div className="z-20 w-full bg-zinc-50 dark:bg-[#111318] backdrop-blur ">
      <div className="mx-4 md:mx-8 flex h-16 items-center border-t-2 dark:border-accent">
        <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
          Built on top of{' '}
          <Link
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            shadcn/ui
          </Link>
          . Developed by{' '}
          <Link
            href="https://kyantech.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Kyantech Solutions
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

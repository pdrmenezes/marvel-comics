import "../globals.css";
import marvelLogo from "../../../public/marvel_logo.svg";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Marvel API",
  description: "A website created to display Next.js and React skils",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="antialiased">
      <body>
        <div className="flex flex-col h-screen">
          <header className="flex justify-between p-5 bg-gray-700 text-white text-center">
            <Link href="/">
              <Image src={marvelLogo} alt="Marvel's logo" width={100} height={40} />
            </Link>
            <nav className="flex items-center gap-6 font-semibold">
              <Link href="/">Home</Link>
              <Link href="/characters">Characters</Link>
              <Link href="/faq">FAQ</Link>
            </nav>
          </header>
          <main className="flex-1 overflow-y-auto p-5">{children}</main>
          <footer className="flex gap-2 py-5 bg-gray-700 text-center items-center justify-center text-white">
            built with <Image src={marvelLogo} alt="Marvel's logo" width={100} height={40} />
          </footer>
        </div>
      </body>
    </html>
  );
}

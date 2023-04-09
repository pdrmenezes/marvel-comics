import "../globals.css";
import Link from "next/link";
import Image from "next/image";
import marvelLogo from "../../../public/marvel_logo.svg";

export const metadata = {
  title: "Marvel API - Checkout",
  description: "Checkout page of the website created to display Next.js and React skils",
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="antialiased">
      <body>
        <div className="flex flex-col h-screen">
          <header className="flex justify-between p-5 bg-gray-700 text-white text-center">
            <Link href="/">
              <Image src={marvelLogo} alt="Marvel's logo" width={100} height={40} priority={true} />
            </Link>
          </header>
          <main className="flex-1 overflow-y-auto p-5">{children}</main>
        </div>
      </body>
    </html>
  );
}

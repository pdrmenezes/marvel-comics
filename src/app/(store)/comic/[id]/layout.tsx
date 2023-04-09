"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { back } = useRouter();
  return (
    <div className="px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
      <div className="flex flex-col justify-start items-start w-full space-y-9">
        <div className="flex justify-start flex-col items-start space-y-2">
          <button onClick={back} className="flex flex-row items-center text-gray-600 hover:text-gray-500 space-x-1">
            <svg className="fill-stroke" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.91681 7H11.0835" stroke="currentColor" stroke-width="0.666667" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M2.91681 7L5.25014 9.33333" stroke="currentColor" stroke-width="0.666667" stroke-linecap="round" stroke-linejoin="round" />
              <path
                d="M2.91681 7.00002L5.25014 4.66669"
                stroke="currentColor"
                stroke-width="0.666667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="text-sm leading-none">Back</p>
          </button>
          <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800 ">Comic</p>
          <p className="text-base leading-normal sm:leading-4 text-gray-600 ">
            <Link href={"/"}>Home</Link> &gt; Comic
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}

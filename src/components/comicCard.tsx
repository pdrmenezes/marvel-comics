import Image from "next/image";
import Link from "next/link";
// import comicCover from "../../public/comic-cover.jpeg";

export default function ComicCard({ id, name, image }: { id: number; name: string; image: string }) {
  return (
    <div className="max-w-sm max-h-fit rounded overflow-hidden shadow-lg">
      <Image className="w-full" src={image} alt="Sunset in the mountains" width={200} height={300} />

      <div className="px-6 py-4">
        <div className="font-bold mb-2">{name}</div>
      </div>
      <div className="px-6 pt-4 pb-2 bottom-0">
        <Link href={`/checkout/${id}`}>
          <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-red-700 hover:text-white">
            Buy
          </button>
        </Link>
        <Link href={`/comic/${id}`}>
          <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-gray-700 hover:text-gray-200">
            Details
          </button>
        </Link>
      </div>
    </div>
  );
}

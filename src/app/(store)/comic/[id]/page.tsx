import { getComic } from "@/services/marvelApi";
import { Comic } from "@/types/comic";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { id: number } }) {
  const comic: Comic = await getComic(params.id);

  return {
    title: comic.title,
    description: comic.description || comic.title,
  };
}

export default async function ComicDetailsPage({ params }: { params: { id: number } }) {
  const comic: Comic = await getComic(params.id);
  const outOfStock = comic.stock < 1;

  return (
    <div className="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
      <div className="flex flex-col sm:flex-row xl:flex-col justify-center items-center bg-gray-100 py-7 sm:py-0 xl:py-10 px-10 xl:w-full">
        <div className="mt-6 sm:mt-0 xl:my-10 xl:px-20 w-52 sm:w-96 xl:w-auto">
          <Image src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} width={300} height={450} alt={comic.title} />
        </div>
      </div>

      <div className="p-8 bg-gray-100  flex flex-col lg:w-full xl:w-3/5">
        {outOfStock ? (
          <p className="text-sm text-gray-600 flex items-center">
            <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
            </svg>
            Members only
          </p>
        ) : null}
        <h1 className="text-xl font-semibold">{comic.title}</h1>
        <hr className="border w-full my-6" />
        <p className="text-gray-700 text-base">{comic.description}</p>

        {comic.oldPrice !== comic.price && (
          <p className="mt-4 text-base leading-none text-gray-500">
            It was: <span className="line-through">${comic.oldPrice}.00</span>
          </p>
        )}
        <p className="mt-4 text-base font-semibold leading-none">Only: ${comic.price}.00</p>
        <div className="flex flex-col gap-2 mt-2">
          <label className="mt-8 text-base leading-4 text-gray-800 ">Characters</label>
          {comic.characters.available === 0 && <div className="text-sm">No characters listed on this comic</div>}
          <div className="flex flex-wrap gap-2">
            {comic.characters.available > 0
              ? comic.characters.items.map((char) => (
                  <Link key={char.resourceURI} href={`/character/${char.resourceURI.split("/")[6]}`}>
                    <p className="flex text-sm border-b rounded-full px-3 py-1 hover:bg-gray-900 hover:text-white">{char.name}</p>
                  </Link>
                ))
              : null}
          </div>
        </div>
        <button className="mt-8 border border-transparent hover:border-gray-300  bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full">
          <div>
            <p className="text-base leading-4">Buy</p>
          </div>
        </button>
      </div>
    </div>
  );
}

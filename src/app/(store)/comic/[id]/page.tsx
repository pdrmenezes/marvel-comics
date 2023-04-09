import ComicCard from "@/components/comicCard";
import { getComic } from "@/services/marvelApi";
import { Comic } from "@/types/comic";
import Image from "next/image";
import Link from "next/link";

type Time = {
  datetime: string;
  day_of_week: number;
  day_of_year: number;
  timezone: string;
  week_number: number;
};

type User = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  bio: string;
};

async function getTime(): Promise<Time> {
  const res = await fetch("http://worldtimeapi.org/api/timezone/America/Chicago", {
    next: {
      // incremental static regeneration - revalidate every 5 seconds
      revalidate: 5,
    },
  });
  return res.json();
}
async function getData(username: string): Promise<User> {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    // fetch new data on every request, if removed, we get the default static data fetch
    cache: "no-store",
  });
  return res.json();
}

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
    <div className="border border-gray-400  bg-white rounded p-4 flex justify-between">
      <Image
        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
        className="flex-none bg-cover roundedoverflow-hidden"
        alt="Image"
        width={300}
        height={450}
      />
      <div>
        <p className="text-sm text-gray-600 flex items-center">
          <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
          </svg>
          Members only
        </p>
        <div className="text-gray-900 font-bold text-xl mb-2">{comic.title}</div>
        <p className="text-gray-700 text-base">{comic.description}</p>
        {comic.oldPrice !== comic.price && <p className="line-through text-gray-500">${comic.oldPrice}</p>}
        <p>${comic.price}</p>
        <Link href={`/checkout/${params.id}`}>
          <button
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-red-700 hover:text-white disabled:bg-zinc-300 disabled:hover:text-gray-700"
            disabled={outOfStock}
          >
            {outOfStock ? "Sem estoque" : "Comprar"}
          </button>
        </Link>
        {comic.characters.available === 0 && <div className="text-sm">No characters listed on this comic</div>}
        <div className="flex flex-col gap-2 mt-2">
          <h2>Characters</h2>
          <div className="flex gap-2">
            {comic.characters.available > 0
              ? comic.characters.items.map((char) => (
                  <Link key={char.resourceURI} href={`/character/${char.resourceURI.split("/")[6]}`}>
                    <p className="text-sm border-b rounded-full px-3 py-1">{char.name}</p>
                  </Link>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="flex gap-2">
        <div className="w-80">
          <Image src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={`${comic.title}'s thumbnail`} width={200} height={500} />
        </div>
        <div className="flex-1">
          <h1>{comic.title}</h1>
          {comic.oldPrice !== comic.price && <p style={{ textDecoration: "line-through" }}>${comic.oldPrice}</p>}
          <p>${comic.price}</p>
          <Link href={`/checkout/${params.id}`}>
            <button
              className="px-2 bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600 disabled:bg-zinc-300"
              disabled={outOfStock}
            >
              {outOfStock ? "Sem estoque" : "Comprar"}
            </button>
          </Link>
          {comic.characters.available === 0 && <div>No characters listed on this comic</div>}
          <div className="flex gap-2 mt-2">
            {comic.characters.available > 0
              ? comic.characters.items.map((char) => (
                  <p key={char.resourceURI} className="border border-1 rounded-full px-4 py-2">
                    {char.name}
                  </p>
                ))
              : null}
          </div>
        </div>
      </div>
    </div> */
}

import ComicCard from "@/components/comicCard";
import { getComics } from "@/services/marvelApi";
import { Comics } from "@/types/comics";

export default async function Home() {
  const comics: Comics = await getComics(300, 12);

  return (
    <div>
      <h1 className="text-lg font-semibold mb-2">Pick your poison</h1>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
        {comics.data.results.map((comic) => (
          <ComicCard key={comic.id} id={comic.id} name={comic.title} image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} />
        ))}
      </div>
    </div>
  );
}

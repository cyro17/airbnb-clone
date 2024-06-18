import Image from "next/image";
import Link from "next/link";
import { useCountries } from "../lib/getCountries";
import { Suspense } from "react";

interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  homeId: string;
}

export default function ListingCard({
  imagePath,
  description,
  location,
  price,
  homeId,
}: iAppProps) {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);
  return (
    <div className="flex flex-col w-4/5 rounded-md mx-auto ">
      <div className="relative h-72 ">
        <Image
          src={`https://tyvbwlgduvynguszefiy.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="Image of House"
          fill
          className="rounded-lg h-full object-cover mb-3"
        />
      </div>
      <Link href={`/home/${homeId}`} className="mt-2">
        <h3 className="font-medium text-base">
          {country?.flag} {country?.label} / {country?.region}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
        <p className="pt-2 text-muted-foreground">
          <span className="font-medium text-black">${price}</span> Night
        </p>
      </Link>
    </div>
  );
}

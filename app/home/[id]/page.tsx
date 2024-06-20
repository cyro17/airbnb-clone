import { CategoryShowcase } from "@/app/components/CategoryShowCase";
import { HomeMap } from "@/app/components/HomeMap";
import prisma from "@/app/lib/db";
import { useCountries } from "@/app/lib/getCountries";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

async function getData(homeId: string) {
  const data = prisma.home.findUnique({
    where: {
      id: homeId,
    },
    select: {
      photo: true,
      description: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      title: true,
      categoryName: true,
      price: true,
      country: true,

      User: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
    },
  });
  return data;
}

export default async function HomeRoute({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data?.country as string);
  return (
    <div className="w-[75%] mx-auto mt-10">
      <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
      <div className="relative h-[550px]">
        <Image
          alt="Image of Home"
          src={`https://tyvbwlgduvynguszefiy.supabase.co/storage/v1/object/public/images/${data?.photo}`}
          fill
          className="rounded-lg object-cover h-full w-full"
        />
      </div>

      <div className="flex justify-between gap-x-24 mt-8">
        <div className="w-2/3">
          <h3 className="text-xl font-medium">
            {country?.flag} {country?.label}
          </h3>
          <div className="flex gap-x-2 text-muted-foreground">
            <p>{data?.guests} Guests</p> * <p>{data?.bedrooms} Bedrooms</p> *{" "}
            <p>{data?.bathrooms} Bathrooms</p>
          </div>

          <div className="flex items-center mt-6">
            <Image
              src={
                data?.User?.profileImage ??
                "https://www.tenforums.com/attachments/user-accounts-family-safety/322690d1615743307-user-account-image-log-user.png"
              }
              alt="user image"
              width={200}
              height={200}
              className="w-11 h-11 rounded-full"
            />
            <div className="mx-5">
              <h3 className="font-medium">Hosted by {data?.User?.firstName}</h3>
              <p>Host since 2015</p>
            </div>
          </div>

          <Separator className="my-7" />

          <CategoryShowcase categoryName={data?.categoryName as string} />

          <Separator className="my-7" />

          <p className="text-muted-foreground">{data?.description}</p>

          <Separator className="my-7" />

          <HomeMap locationValue={data?.country as string} />

          <Separator className="my-7" />
        </div>
      </div>
    </div>
  );
}

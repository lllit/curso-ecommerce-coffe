"use client";

import { useGetCategories } from "@/api/getProducts";
import { CategoryType } from "@/types/category";
import { ResponseType } from "@/types/response";
import Link from "next/link";

export const ChooseCategory = () => {
  const { result, loading }: ResponseType = useGetCategories();

  console.log(result);
  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 pb-4 text-3xl sm:pb-8">
        Elige tu categoria favorita
      </h3>
      <div className="grid gap-5 sm:grid-cols-3">
        {!loading &&
          result !== undefined &&
          result.map((category: CategoryType) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="relative max-w-xs mx-auto overflow-hidden bg-no-repeat bg-cover rounded-lg"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${category.mainImage.url}`}
                alt={category.categoryName}
                className="max-w-[270px] transition duration-300 ease-in-out rounded-lg hover:scale-110"
              ></img>
              <p className="absolute w-full py-2 text-lg font-bold text-center text-white bottom-5 backdrop-blur-lg">{category.categoryName}</p>
            </Link>
          ))}
      </div>
    </div>
  );
};

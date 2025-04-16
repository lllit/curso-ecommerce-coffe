"use client";

import { useGetCategoryProduct } from "@/api/getCategoryProduct";
import { Separator } from "@/components/ui/separator";
import { ResponseType } from "@/types/response";
import { useParams } from "next/navigation";
import { FiltersControlsCategory } from "./components/filters-controls-category";
import { SkeletonSchema } from "@/components/skeletonSchema";
import { ProductoCard } from "./components/product-card";
import { ProductType } from "@/types/productos";
import { useState } from "react";
import { components } from "@/components/categories-static";
import { readSync } from "fs";

export default function Page() {
  const params = useParams();

  console.log(params)

  const { categorySlug } = params;
  
  const { result, loading }: ResponseType = useGetCategoryProduct(
    `${categorySlug}`
  );


  const [filterOrigin, setFilterOrigin] = useState("");
  const [filterTaste, setFilterTaste] = useState("");

  const filteredProducts =
    result !== null &&
    !loading &&
    (filterOrigin === ""
      ? result
      : result.filter(
          (product: ProductType) =>
            product.origin === filterOrigin && product.taste === filterTaste
        ));

  //console.log(filteredProducts);

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24 p-6">
      {result !== null && !loading && (
        <h1 className="text-3xl font-medium">
          Cafe {result[0].category.categoryName}
        </h1>
        
      )}
      {result !== null && !loading &&(
        <p className="mb-2 mt-2">{components.map((component) =>(
          component.description
        ))}</p>
      )}
      <Separator></Separator>
      <div className="sm:flex sm:justify-between">
        <FiltersControlsCategory
          setFilterOrigin={setFilterOrigin}
          setFilterTaste={setFilterTaste}
        ></FiltersControlsCategory>

        <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
          {loading && <SkeletonSchema grid={3}></SkeletonSchema>}
          {result !== null &&
            !loading &&
            filteredProducts.map((product: ProductType) => (
              <ProductoCard key={product.id} product={product}></ProductoCard>
            ))}

          {filteredProducts !== null &&
            !loading &&
            filteredProducts.length === 0 && (
              <p className="">No hay productos con este filtro</p>
            )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { DataTable } from "@/components/data-table";
import { useEffect, useState } from "react";
import { columns } from "./basic-columns";

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: { type: { name: string } }[];
}

export default function BasicTableExample() {
  const [data, setData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const pokemons = await Promise.all(
          Array.from({ length: 20 }, async (_, i) => {
            const res = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${i + 1}`
            );
            return res.json();
          })
        );
        setData(pokemons);
      } catch (error) {
        console.error("Error fetching pokemon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Basic Table Example</h1>
        <p className="text-muted-foreground">
          A simple example showing the basic features of the data table
          component.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={data}
          toolbar={{
            controls: [
              {
                type: "search",
                column: "name",
                placeholder: "Search pokemon...",
              },
            ],
          }}
        />
      )}
    </div>
  );
}

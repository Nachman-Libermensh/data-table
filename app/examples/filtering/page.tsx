/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { columns } from "./filtering-columns";
import type { Character } from "../examples.types";

export default function FilteringExample() {
  const [data, setData] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const characters: Character[] = [];
        // Fetch first 3 pages of characters
        for (let i = 1; i <= 3; i++) {
          const res = await fetch(`https://swapi.dev/api/people/?page=${i}`);
          const data = await res.json();

          // Fetch species for each character
          const charactersWithSpecies = await Promise.all(
            data.results.map(async (char: any) => {
              if (char.species.length > 0) {
                const speciesRes = await fetch(char.species[0]);
                const speciesData = await speciesRes.json();
                return {
                  name: char.name,
                  height: char.height,
                  mass: char.mass,
                  birth_year: char.birth_year,
                  gender: char.gender,
                  homeworld: char.homeworld,
                  species: speciesData.name,
                };
              }
              return {
                name: char.name,
                height: char.height,
                mass: char.mass,
                birth_year: char.birth_year,
                gender: char.gender,
                homeworld: char.homeworld,
                species: "Human",
              };
            })
          );

          characters.push(...charactersWithSpecies);
        }

        setData(characters);
      } catch (error) {
        console.error("Error fetching characters:", error);
        setError("Failed to load Star Wars characters");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Star Wars Characters</h1>
        <p className="text-muted-foreground">
          Filterable table of Star Wars characters with multiple filter options.
          Filter by name, species, or gender.
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
                placeholder: "Search names...",
              },
              {
                type: "filter",
                column: "species",
                placeholder: "Filter species",
                dynamic: true,
              },
              {
                type: "filter",
                column: "gender",
                placeholder: "Filter gender",
                dynamic: true,
              },
            ],
          }}
        />
      )}
    </div>
  );
}

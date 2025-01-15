"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { ElectionRecord, ElectionResponse } from "../examples.types";
import { columns } from "./rtl-columns";

const API_URL =
  "https://data.gov.il/api/3/action/datastore_search?resource_id=b392b8ee-ba45-4ea0-bfed-f03a1a36e99c&limit=100";

export default function RtlExample() {
  const [data, setData] = useState<ElectionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const result = (await response.json()) as ElectionResponse;

        if (result.success) {
          // Sort by total eligible voters descending
          const sortedData = result.result.records.sort(
            (a, b) => b.בזב - a.בזב
          );
          setData(sortedData);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (err) {
        console.error("Error fetching election data:", err);
        setError("שגיאה בטעינת הנתונים");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">תוצאות הבחירות לכנסת ה-25</h1>
        <p className="text-muted-foreground">
          תוצאות ההצבעה לפי יישובים כולל פילוח מפלגתי
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
          direction="rtl"
          toolbar={{
            controls: [
              {
                type: "search",
                column: "שם ישוב",
                placeholder: "חיפוש יישוב...",
              },
              {
                type: "filter",
                column: "בזב",
                placeholder: "סינון לפי מספר בוחרים",
              },
            ],
          }}
        />
      )}
    </div>
  );
}

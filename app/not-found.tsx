"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 px-6 py-12 text-center">
      <div className="max-w-md">
        <Image
          src="/not-found.png"
          alt="Not Found"
          width={200}
          height={200}
          className="mx-auto mb-5"
        />

        {/* כותרת */}
        <h1 className="text-4xl font-extrabold text-blue-800 sm:text-5xl">
          עמוד לא נמצא
        </h1>
        <p className="mt-4 text-lg text-blue-600">
          מצטערים, העמוד שחיפשת לא קיים. ייתכן שהוא הועבר או הוסר.
        </p>

        {/* כפתורים */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button
            variant="default"
            className="w-full sm:w-auto"
            onClick={() => router.push("/")}
          >
            חזרה לדף הבית
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => router.back()}
          >
            חזור לעמוד הקודם
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;

import Link from "next/link";
import { examples } from "./examples";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50/90 dark:from-slate-950 dark:to-slate-900/90">
      <div className="container px-4 mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
          Example Tables
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {examples.map((example) => (
            <Link key={example.href} href={example.href} className="group">
              <Card className="h-full backdrop-blur-sm bg-white/40 dark:bg-slate-900/40 border-slate-200/50 dark:border-slate-800/50 hover:border-primary/40 dark:hover:border-primary/40 hover:shadow-xl hover:shadow-slate-200/10 dark:hover:shadow-slate-900/10 transition-all duration-500">
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                    {example.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
                    {example.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full bg-slate-900/90 hover:bg-primary dark:bg-slate-800 dark:hover:bg-primary transition-all duration-300"
                    variant="default"
                  >
                    View Example →
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
export default page;

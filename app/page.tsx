import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { examples } from "./examples/examples";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-50/80 to-white dark:from-slate-950/80 dark:to-slate-950 py-32">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
              Data Table Examples
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A comprehensive collection of practical examples showing how to
              implement and customize data tables in React with modern features
              and styling
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50/50 dark:bg-slate-950/50">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {["Sorting & Filtering", "Pagination", "Customization"].map(
              (feature, index) => (
                <Card
                  key={index}
                  className="group border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300"
                >
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {feature}
                    </CardTitle>
                    <CardDescription className="text-base mt-3">
                      {feature === "Sorting & Filtering" &&
                        "Powerful built-in sorting and filtering capabilities for efficient data management"}
                      {feature === "Pagination" &&
                        "Handle large datasets with efficient pagination and customizable page sizes"}
                      {feature === "Customization" &&
                        "Fully customizable columns, rows, and styling to match your design system"}
                    </CardDescription>
                  </CardHeader>
                </Card>
              )
            )}
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="py-24">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Example Tables
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {examples.map((example) => (
              <Link key={example.href} href={example.href} className="group">
                <Card className="h-full border border-slate-200 dark:border-slate-800 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_1rem_rgba(0,0,0,0.05)]">
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {example.title}
                    </CardTitle>
                    <CardDescription className="text-base mt-3">
                      {example.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full group-hover:bg-primary/90 transition-colors"
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
    </div>
  );
}

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
    <div className="flex flex-col min-h-screen space-y-1">
      {/* Hero - Enhanced gradients and spacing */}
      <section className="relative bg-gradient-to-b from-slate-50/90 via-white to-white/80 dark:from-slate-950/90 dark:via-slate-900/80 dark:to-slate-950/90 py-16">
        <div className="container px-4 mx-auto relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary/80 via-primary to-primary/90 dark:from-white dark:via-slate-100 dark:to-slate-200 bg-clip-text text-transparent">
              Data Table Examples
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              A comprehensive collection of practical examples showing how to
              implement and customize data tables in React with modern features
              and styling
            </p>
          </div>
        </div>
      </section>

      {/* Features - Softer gradients and enhanced cards */}
      <section className="py-20 bg-gradient-to-b from-white via-slate-50/30 to-white/90 dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950/90">
        <div className="container px-4 mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {["Sorting & Filtering", "Pagination", "Customization"].map(
              (feature, index) => (
                <Card
                  key={index}
                  className="group backdrop-blur-sm bg-white/40 dark:bg-slate-900/40 border-slate-200/50 dark:border-slate-800/50 hover:border-primary/40 dark:hover:border-primary/40 hover:shadow-xl hover:shadow-slate-200/10 dark:hover:shadow-slate-900/10 transition-all duration-500"
                >
                  <CardHeader className="space-y-4">
                    <CardTitle className="group-hover:text-primary transition-colors duration-300">
                      {feature}
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-300 leading-relaxed">
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

      {/* Examples - Better spacing and hover effects */}
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
    </div>
  );
}

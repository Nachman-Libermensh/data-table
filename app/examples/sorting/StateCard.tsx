import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface StateCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: "up" | "down";
  loading?: boolean;
}

export function StateCard({
  title,
  value,
  icon,
  trend,
  loading = false,
}: StateCardProps) {
  return (
    <Card
      className={cn(
        "transition-all duration-300 hover:shadow-lg",
        trend === "up" &&
          "border-green-500/20 bg-green-500/5 hover:border-green-500/40",
        trend === "down" &&
          "border-red-500/20 bg-red-500/5 hover:border-red-500/40"
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {loading ? (
          <Skeleton className="h-4 w-4 rounded-full" />
        ) : (
          <div className="rounded-full p-1.5 bg-background/80">{icon}</div>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-[120px]" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold tracking-tight">{value}</div>
            {trend && (
              <Badge
                variant="outline"
                className={cn(
                  "flex items-center gap-1.5 px-2 py-1",
                  "text-xs font-medium tracking-wide transition-colors",
                  trend === "up"
                    ? "text-green-700 dark:text-green-500 border-green-500/50 bg-green-50/50 dark:bg-green-500/10"
                    : "text-red-700 dark:text-red-500 border-red-500/50 bg-red-50/50 dark:bg-red-500/10"
                )}
              >
                <span className="text-[10px]">
                  {trend === "up" ? "▲" : "▼"}
                </span>
                <span className="font-semibold">
                  {trend === "up" ? "GAIN" : "LOSS"}
                </span>
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

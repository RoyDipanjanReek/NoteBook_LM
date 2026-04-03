"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";

const chartStyles = {
  line: ({ dataKey, data, color }) => (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="rgb(var(--color-border))" strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tick={{ fill: "rgb(var(--color-muted))", fontSize: 12 }}
        />
        <YAxis tick={{ fill: "rgb(var(--color-muted))", fontSize: 12 }} />
        <Tooltip
          wrapperStyle={{
            backgroundColor: "rgb(var(--color-surface))",
            borderRadius: 12,
            borderColor: "rgb(var(--color-border))",
          }}
        />
        <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={3} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  ),
  area: ({ dataKey, data, color }) => (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="areaColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.35} />
            <stop offset="95%" stopColor={color} stopOpacity={0.06} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgb(var(--color-border))" strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tick={{ fill: "rgb(var(--color-muted))", fontSize: 12 }}
        />
        <YAxis tick={{ fill: "rgb(var(--color-muted))", fontSize: 12 }} />
        <Tooltip
          wrapperStyle={{
            backgroundColor: "rgb(var(--color-surface))",
            borderRadius: 12,
            borderColor: "rgb(var(--color-border))",
          }}
        />
        <Area type="monotone" dataKey={dataKey} stroke={color} fill="url(#areaColor)" fillOpacity={1} />
      </AreaChart>
    </ResponsiveContainer>
  ),
  bar: ({ dataKey, data, color }) => (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="rgb(var(--color-border))" strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tick={{ fill: "rgb(var(--color-muted))", fontSize: 12 }}
        />
        <YAxis tick={{ fill: "rgb(var(--color-muted))", fontSize: 12 }} />
        <Tooltip
          wrapperStyle={{
            backgroundColor: "rgb(var(--color-surface))",
            borderRadius: 12,
            borderColor: "rgb(var(--color-border))",
          }}
        />
        <Bar dataKey={dataKey} fill={color} radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  ),
};

export default function AnalyticsChart({
  title,
  data,
  type = "line",
  dataKey,
  color = "rgb(var(--color-primary))",
}) {
  return (
    <Card>
      <CardHeader className="mb-4">
        <CardTitle className="text-[1.6rem]">{title}</CardTitle>
        <CardDescription>Insights from the last 7 days</CardDescription>
      </CardHeader>
      <CardContent className="mt-0">
        {chartStyles[type]({ dataKey, data, color })}
      </CardContent>
    </Card>
  );
}

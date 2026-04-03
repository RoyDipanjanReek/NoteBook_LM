import { syncCurrentUser } from "@/lib/sync-current-user";
import AdminSidebar from "./components/AdminSidebar";
import AdminTopbar from "./components/AdminTopbar";
import OverviewCard from "./components/OverviewCard";
import AnalyticsChart from "./components/AnalyticsChart";
import SectionTable from "./components/SectionTable";
import { Card } from "@/components/ui";
import {
  overviewMetrics,
  apiUsageSeries,
  userGrowthSeries,
  dailyActiveUsers,
  recentActivities,
  usersList,
  apiUsageLog,
} from "./admin.mock";

export default async function AdminDashboardPage() {
  await syncCurrentUser();

  const activityColumns = [
    { key: "user", label: "User" },
    { key: "time", label: "Time" },
    { key: "action", label: "Action" },
  ];

  const userColumns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          className={`inline-flex rounded-pill px-3 py-1 text-xs font-semibold ${
            row.status === "active"
              ? "bg-success-soft text-success"
              : "bg-surface-strong text-muted"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  const apiLogColumns = [
    { key: "endpoint", label: "Endpoint" },
    { key: "user", label: "User" },
    { key: "time", label: "Timestamp" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[1750px] gap-6 px-4 py-6 xl:px-8 xl:py-8">
        <AdminSidebar />
        <main className="flex-1">
          <AdminTopbar />

          <div className="mt-8 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {overviewMetrics.map((metric) => (
                <OverviewCard key={metric.label} {...metric} />
              ))}
            </div>

            <div id="analytics" className="grid gap-6 xl:grid-cols-2">
              <AnalyticsChart
                title="API Requests"
                data={apiUsageSeries}
                dataKey="requests"
                type="line"
              />
              <AnalyticsChart
                title="User Growth"
                data={userGrowthSeries}
                dataKey="signups"
                type="area"
              />
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <SectionTable
                id="recent-activity"
                title="Recent Activity"
                description="Latest actions across the platform."
                columns={activityColumns}
                rows={recentActivities}
              />
              <SectionTable
                id="users"
                title="User Management"
                description="View and manage user roles and account status."
                columns={userColumns}
                rows={usersList}
              />
            </div>

            <Card id="settings" className="border-dashed bg-surface/85">
              <p className="text-eyebrow uppercase text-muted">Governance</p>
              <h2 className="mt-3 font-display text-2xl text-foreground">
                System settings
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-muted">
                Reserve this space for audit controls, quota policies, and admin-only
                configuration. It already inherits the shared panel styles, so new
                tools can slot into the system without introducing one-off layouts.
              </p>
            </Card>

            <SectionTable
              id="api-usage"
              title="API Usage Logs"
              description="Recent request activity for monitoring and debugging."
              columns={apiLogColumns}
              rows={apiUsageLog}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

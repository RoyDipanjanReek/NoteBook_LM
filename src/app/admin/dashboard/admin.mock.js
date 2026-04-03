export const overviewMetrics = [
  { label: "Total Users", value: "4,950", subtitle: "+12% this month", accent: "purple" },
  { label: "Active Users", value: "1,328", subtitle: "+8.4% last 24h", accent: "emerald" },
  { label: "API Usage", value: "24.6k", subtitle: "+16% weekly", accent: "amber" },
  { label: "Revenue", value: "$82.3k", subtitle: "+5.6% monthly", accent: "violet" },
];

export const apiUsageSeries = [
  { date: "Mar 22", requests: 420 },
  { date: "Mar 23", requests: 600 },
  { date: "Mar 24", requests: 510 },
  { date: "Mar 25", requests: 720 },
  { date: "Mar 26", requests: 860 },
  { date: "Mar 27", requests: 790 },
  { date: "Mar 28", requests: 1020 },
];

export const userGrowthSeries = [
  { date: "Mar 22", signups: 28 },
  { date: "Mar 23", signups: 42 },
  { date: "Mar 24", signups: 31 },
  { date: "Mar 25", signups: 55 },
  { date: "Mar 26", signups: 64 },
  { date: "Mar 27", signups: 72 },
  { date: "Mar 28", signups: 89 },
];

export const dailyActiveUsers = [
  { date: "Mar 22", active: 502 },
  { date: "Mar 23", active: 630 },
  { date: "Mar 24", active: 568 },
  { date: "Mar 25", active: 710 },
  { date: "Mar 26", active: 812 },
  { date: "Mar 27", active: 765 },
  { date: "Mar 28", active: 930 },
];

export const recentActivities = [
  { user: "julia@copybook.com", time: "12:14 PM", action: "Login" },
  { user: "matthew@copybook.com", time: "11:48 AM", action: "Uploaded file" },
  { user: "nina@copybook.com", time: "10:27 AM", action: "API call" },
  { user: "jordan@copybook.com", time: "09:33 AM", action: "Login" },
  { user: "megan@copybook.com", time: "08:58 AM", action: "API call" },
];

export const usersList = [
  { name: "Julia Watson", email: "julia@copybook.com", role: "user", status: "active" },
  { name: "Matthew Lee", email: "matthew@copybook.com", role: "user", status: "active" },
  { name: "Nina Park", email: "nina@copybook.com", role: "admin", status: "active" },
  { name: "Jordan Fox", email: "jordan@copybook.com", role: "user", status: "inactive" },
  { name: "Megan Rios", email: "megan@copybook.com", role: "user", status: "active" },
];

export const apiUsageLog = [
  { endpoint: "/api/chat", user: "julia@copybook.com", time: "12:12 PM", status: "200" },
  { endpoint: "/api/usage", user: "nina@copybook.com", time: "11:51 AM", status: "200" },
  { endpoint: "/api/ingest", user: "matthew@copybook.com", time: "10:34 AM", status: "201" },
  { endpoint: "/api/chat", user: "jordan@copybook.com", time: "09:40 AM", status: "429" },
  { endpoint: "/api/users", user: "megan@copybook.com", time: "08:50 AM", status: "200" },
];

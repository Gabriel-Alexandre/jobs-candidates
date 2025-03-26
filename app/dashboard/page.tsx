'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Briefcase, 
  Building2, 
  Users, 
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { mockStats } from '@/lib/data/mock-data';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

// Color palette that works well in both light and dark modes
const CHART_COLORS = {
  blue: 'hsl(210, 100%, 50%)',
  green: 'hsl(142, 76%, 36%)',
  purple: 'hsl(262, 47%, 55%)',
  orange: 'hsl(24, 100%, 50%)',
  red: 'hsl(346, 87%, 48%)',
};

const CHART_COLORS_ARRAY = Object.values(CHART_COLORS);

const STATUS_COLORS = {
  Applied: CHART_COLORS.blue,
  Screening: CHART_COLORS.purple,
  Interview: CHART_COLORS.orange,
  Offer: CHART_COLORS.green,
  Rejected: CHART_COLORS.red,
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up':
      return <ArrowUp className="h-4 w-4 text-green-500" />;
    case 'down':
      return <ArrowDown className="h-4 w-4 text-red-500" />;
    default:
      return <Minus className="h-4 w-4 text-yellow-500" />;
  }
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalApplications}</div>
            <p className="text-xs text-muted-foreground">+20% from last month</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.activeJobs}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalInterviews}</div>
            <p className="text-xs text-muted-foreground">+35% from last month</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offer Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.offerRate}%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Application Trends */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Application Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockStats.applicationTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="applications"
                  name="Applications"
                  stroke={CHART_COLORS.blue}
                  fill={CHART_COLORS.blue}
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="interviews"
                  name="Interviews"
                  stroke={CHART_COLORS.purple}
                  fill={CHART_COLORS.purple}
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="offers"
                  name="Offers"
                  stroke={CHART_COLORS.green}
                  fill={CHART_COLORS.green}
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Application Status */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Application Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockStats.applicationsByStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {mockStats.applicationsByStatus.map((entry) => (
                      <Cell 
                        key={entry.status} 
                        fill={STATUS_COLORS[entry.status as keyof typeof STATUS_COLORS]} 
                      />
                    ))}
                  </Pie>
                  <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Salary Distribution */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Salary Range Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockStats.salaryRanges}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [`${value} jobs (${mockStats.salaryRanges.find(r => r.count === value)?.percentage}%)`]}
                  />
                  <Bar 
                    dataKey="count" 
                    name="Number of Jobs" 
                    fill={CHART_COLORS.purple}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills in Demand */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Skills in Demand</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockStats.skillsInDemand.map((skill, index) => (
              <div key={index} className="flex items-center">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{skill.skill}</span>
                    <span className="ml-2">{getTrendIcon(skill.trend)}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${(skill.count / Math.max(...mockStats.skillsInDemand.map(s => s.count))) * 100}%`,
                        backgroundColor: CHART_COLORS.blue
                      }}
                    />
                  </div>
                </div>
                <div className="ml-4 text-sm text-muted-foreground">
                  {skill.count} jobs
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Location Stats */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Jobs by Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockStats.locationStats}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="location" />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="jobs" 
                  name="Number of Jobs" 
                  fill={CHART_COLORS.blue}
                />
                <Bar 
                  dataKey="avgSalary" 
                  name="Average Salary ($)" 
                  fill={CHART_COLORS.green}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
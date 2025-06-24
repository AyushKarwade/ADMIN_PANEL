
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, FileText, Settings, LogOut, Plus } from "lucide-react";
import { MemberManagement } from "./MemberManagement";
import { ClassManagement } from "./ClassManagement";
import { WorkoutPlans } from "./WorkoutPlans";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
}

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

export const AdminDashboard = ({ user, onLogout }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'classes' | 'workouts'>('overview');

  const stats = [
    { title: "Total Members", value: "234", icon: Users, color: "text-blue-600" },
    { title: "Active Classes", value: "12", icon: Calendar, color: "text-green-600" },
    { title: "Workout Plans", value: "45", icon: FileText, color: "text-purple-600" },
    { title: "Monthly Revenue", value: "$12,540", icon: Settings, color: "text-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-gray-600">Welcome back, {user.name}</p>
            </div>
            <Button onClick={onLogout} variant="outline" className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <nav className="mb-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: Settings },
              { id: 'members', label: 'Members', icon: Users },
              { id: 'classes', label: 'Classes', icon: Calendar },
              { id: 'workouts', label: 'Workout Plans', icon: FileText },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates across your gym</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "New member registered", time: "2 minutes ago", user: "Sarah Johnson" },
                    { action: "Class schedule updated", time: "15 minutes ago", user: "Yoga Morning Class" },
                    { action: "Workout plan assigned", time: "1 hour ago", user: "Mike Thompson" },
                    { action: "Payment received", time: "2 hours ago", user: "Emma Wilson" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.user}</p>
                      </div>
                      <span className="text-xs text-gray-400">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'members' && <MemberManagement />}
        {activeTab === 'classes' && <ClassManagement />}
        {activeTab === 'workouts' && <WorkoutPlans />}
      </div>
    </div>
  );
};

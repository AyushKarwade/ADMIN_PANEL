
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Users, Activity, LogOut, Clock, User } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
}

interface MemberDashboardProps {
  user: User;
  onLogout: () => void;
}

export const MemberDashboard = ({ user, onLogout }: MemberDashboardProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'classes' | 'workouts'>('overview');

  const myClasses = [
    { name: "Morning Yoga", time: "Monday, Wednesday, Friday - 7:00 AM", instructor: "Sarah Wilson" },
    { name: "HIIT Training", time: "Tuesday, Thursday - 6:00 PM", instructor: "Mike Thompson" }
  ];

  const myWorkouts = [
    { title: "Beginner Strength Training", progress: 60, nextSession: "Upper Body Workout" },
    { title: "Weight Loss Circuit", progress: 40, nextSession: "Cardio Circuit" }
  ];

  const upcomingClasses = [
    { name: "Morning Yoga", time: "Today, 7:00 AM", instructor: "Sarah Wilson" },
    { name: "HIIT Training", time: "Tomorrow, 6:00 PM", instructor: "Mike Thompson" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Member Dashboard</h1>
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
              { id: 'overview', label: 'Overview', icon: Activity },
              { id: 'classes', label: 'My Classes', icon: Calendar },
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
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Classes This Week
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Workout Progress
                  </CardTitle>
                  <Activity className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">75%</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Active Plans
                  </CardTitle>
                  <FileText className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Classes */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Classes</CardTitle>
                <CardDescription>Your scheduled classes for this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingClasses.map((cls, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{cls.name}</h4>
                        <p className="text-sm text-gray-600">with {cls.instructor}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{cls.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'classes' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">My Classes</h2>
              <p className="text-gray-600">Classes you're currently enrolled in</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myClasses.map((cls, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{cls.name}</CardTitle>
                    <CardDescription>with {cls.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        {cls.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="h-4 w-4" />
                        {cls.instructor}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'workouts' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">My Workout Plans</h2>
              <p className="text-gray-600">Your assigned workout plans and progress</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myWorkouts.map((workout, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{workout.title}</CardTitle>
                    <CardDescription>Next: {workout.nextSession}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-gray-600">{workout.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${workout.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <Button className="w-full">
                        Continue Workout
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

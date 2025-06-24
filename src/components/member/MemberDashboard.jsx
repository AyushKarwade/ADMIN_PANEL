
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Target, TrendingUp, LogOut, User, Dumbbell } from "lucide-react";

export const MemberDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { title: "Workouts This Month", value: "12", icon: Dumbbell, color: "text-blue-600" },
    { title: "Goals Achieved", value: "3/5", icon: Target, color: "text-green-600" },
    { title: "Calories Burned", value: "2,450", icon: TrendingUp, color: "text-orange-600" },
    { title: "Active Days", value: "18", icon: Calendar, color: "text-purple-600" },
  ];

  const workoutPlan = {
    name: "Beginner Strength Training",
    week: 2,
    totalWeeks: 4,
    progress: 50,
    nextWorkout: "Upper Body Strength",
    scheduledTime: "Tomorrow 6:00 PM"
  };

  const upcomingClasses = [
    { name: "Morning Yoga", time: "07:00", date: "Tomorrow", instructor: "Sarah Wilson", spots: 5 },
    { name: "HIIT Training", time: "18:00", date: "Jan 22", instructor: "Mike Johnson", spots: 3 },
    { name: "Pilates", time: "19:00", date: "Jan 23", instructor: "Emma Davis", spots: 8 },
  ];

  const recentWorkouts = [
    { name: "Full Body Workout", date: "Jan 18", duration: 45, calories: 320 },
    { name: "Cardio Session", date: "Jan 16", duration: 30, calories: 280 },
    { name: "Upper Body Strength", date: "Jan 14", duration: 50, calories: 250 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
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
              { id: 'overview', label: 'Overview', icon: User },
              { id: 'workouts', label: 'My Workouts', icon: Dumbbell },
              { id: 'classes', label: 'Classes', icon: Calendar },
              { id: 'progress', label: 'Progress', icon: TrendingUp },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current Workout Plan */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Workout Plan</CardTitle>
                  <CardDescription>{workoutPlan.name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Week {workoutPlan.week} of {workoutPlan.totalWeeks}</span>
                      <span>{workoutPlan.progress}%</span>
                    </div>
                    <Progress value={workoutPlan.progress} className="w-full" />
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium">Next Workout:</p>
                    <p className="text-lg">{workoutPlan.nextWorkout}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {workoutPlan.scheduledTime}
                    </p>
                  </div>
                  <Button className="w-full">Start Workout</Button>
                </CardContent>
              </Card>

              {/* Upcoming Classes */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Classes</CardTitle>
                  <CardDescription>Your booked fitness classes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingClasses.map((classItem, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{classItem.name}</p>
                          <p className="text-sm text-gray-500">{classItem.instructor}</p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {classItem.date} at {classItem.time}
                          </p>
                        </div>
                        <Badge variant="outline">{classItem.spots} spots left</Badge>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Browse All Classes
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Workouts */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Workouts</CardTitle>
                <CardDescription>Your latest training sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentWorkouts.map((workout, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{workout.name}</p>
                        <p className="text-sm text-gray-500">{workout.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{workout.duration} min</p>
                        <p className="text-sm text-gray-500">{workout.calories} cal</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'workouts' && (
          <Card>
            <CardHeader>
              <CardTitle>My Workout Plans</CardTitle>
              <CardDescription>Track your assigned workout routines</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Workout plans content would go here...</p>
            </CardContent>
          </Card>
        )}

        {activeTab === 'classes' && (
          <Card>
            <CardHeader>
              <CardTitle>Available Classes</CardTitle>
              <CardDescription>Book and manage your fitness classes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Classes booking content would go here...</p>
            </CardContent>
          </Card>
        )}

        {activeTab === 'progress' && (
          <Card>
            <CardHeader>
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>Monitor your fitness journey</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Progress tracking content would go here...</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

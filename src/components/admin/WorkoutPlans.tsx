
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, FileText, User, Clock, Edit, Trash, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface WorkoutPlan {
  id: string;
  title: string;
  description: string;
  targetAudience: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  createdDate: string;
  assignedMembers: number;
}

export const WorkoutPlans = () => {
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([
    {
      id: "1",
      title: "Beginner Strength Training",
      description: "A comprehensive 4-week strength training program for beginners",
      targetAudience: "New gym members",
      duration: "4 weeks",
      difficulty: "Beginner",
      createdDate: "2024-01-15",
      assignedMembers: 15
    },
    {
      id: "2",
      title: "Advanced HIIT Program",
      description: "High-intensity interval training for experienced athletes",
      targetAudience: "Advanced members",
      duration: "6 weeks",
      difficulty: "Advanced",
      createdDate: "2024-02-01",
      assignedMembers: 8
    },
    {
      id: "3",
      title: "Weight Loss Circuit",
      description: "Fat burning circuit training program",
      targetAudience: "Members looking to lose weight",
      duration: "8 weeks",
      difficulty: "Intermediate",
      createdDate: "2024-01-20",
      assignedMembers: 22
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<WorkoutPlan | null>(null);
  const [newPlan, setNewPlan] = useState({
    title: "",
    description: "",
    targetAudience: "",
    duration: "",
    difficulty: "Beginner" as 'Beginner' | 'Intermediate' | 'Advanced'
  });

  const handleAddPlan = () => {
    const plan: WorkoutPlan = {
      id: Date.now().toString(),
      ...newPlan,
      createdDate: new Date().toISOString().split('T')[0],
      assignedMembers: 0
    };
    setWorkoutPlans([...workoutPlans, plan]);
    setNewPlan({
      title: "",
      description: "",
      targetAudience: "",
      duration: "",
      difficulty: "Beginner"
    });
    setIsDialogOpen(false);
    toast({ title: "Workout plan created successfully!" });
  };

  const handleEditPlan = (plan: WorkoutPlan) => {
    setEditingPlan(plan);
    setNewPlan({
      title: plan.title,
      description: plan.description,
      targetAudience: plan.targetAudience,
      duration: plan.duration,
      difficulty: plan.difficulty
    });
    setIsDialogOpen(true);
  };

  const handleUpdatePlan = () => {
    if (editingPlan) {
      setWorkoutPlans(workoutPlans.map(p => 
        p.id === editingPlan.id 
          ? { ...editingPlan, ...newPlan }
          : p
      ));
      setEditingPlan(null);
      setNewPlan({
        title: "",
        description: "",
        targetAudience: "",
        duration: "",
        difficulty: "Beginner"
      });
      setIsDialogOpen(false);
      toast({ title: "Workout plan updated successfully!" });
    }
  };

  const handleDeletePlan = (id: string) => {
    setWorkoutPlans(workoutPlans.filter(p => p.id !== id));
    toast({ title: "Workout plan deleted successfully!" });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Workout Plans</h2>
          <p className="text-gray-600">Create and manage workout plans for members</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingPlan(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingPlan ? 'Edit Workout Plan' : 'Create New Workout Plan'}</DialogTitle>
              <DialogDescription>
                {editingPlan ? 'Update workout plan details' : 'Enter the details for the new workout plan'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="title">Plan Title</Label>
                <Input
                  id="title"
                  value={newPlan.title}
                  onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
                  placeholder="Enter plan title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newPlan.description}
                  onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                  placeholder="Enter plan description"
                />
              </div>
              <div>
                <Label htmlFor="target">Target Audience</Label>
                <Input
                  id="target"
                  value={newPlan.targetAudience}
                  onChange={(e) => setNewPlan({ ...newPlan, targetAudience: e.target.value })}
                  placeholder="e.g., Beginners, Advanced athletes"
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={newPlan.duration}
                  onChange={(e) => setNewPlan({ ...newPlan, duration: e.target.value })}
                  placeholder="e.g., 4 weeks, 2 months"
                />
              </div>
              <div>
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <select
                  id="difficulty"
                  value={newPlan.difficulty}
                  onChange={(e) => setNewPlan({ ...newPlan, difficulty: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <Button 
                onClick={editingPlan ? handleUpdatePlan : handleAddPlan}
                className="w-full"
              >
                {editingPlan ? 'Update Plan' : 'Create Plan'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Workout Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workoutPlans.map((plan) => (
          <Card key={plan.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{plan.title}</CardTitle>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditPlan(plan)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeletePlan(plan.id)}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  {plan.targetAudience}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  {plan.duration}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="h-4 w-4" />
                  {plan.assignedMembers} members assigned
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(plan.difficulty)}`}>
                    {plan.difficulty}
                  </span>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    PDF
                  </Button>
                </div>
                <div className="text-xs text-gray-500">
                  Created: {new Date(plan.createdDate).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};


import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const WorkoutPlans = () => {
  const { toast } = useToast();
  const [plans, setPlans] = useState([
    { id: 1, name: "Beginner Strength", difficulty: "Beginner", duration: "4 weeks", exercises: 8, assignedTo: 12, description: "Perfect for those new to strength training" },
    { id: 2, name: "Advanced HIIT", difficulty: "Advanced", duration: "6 weeks", exercises: 12, assignedTo: 8, description: "High-intensity interval training for experienced athletes" },
    { id: 3, name: "Weight Loss Circuit", difficulty: "Intermediate", duration: "8 weeks", exercises: 10, assignedTo: 15, description: "Effective circuit training for weight loss goals" },
    { id: 4, name: "Muscle Building", difficulty: "Intermediate", duration: "12 weeks", exercises: 15, assignedTo: 10, description: "Comprehensive muscle building program" },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [viewingPlan, setViewingPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    difficulty: "Beginner",
    duration: "",
    exercises: "",
    description: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingPlan) {
      setPlans(plans.map(plan => 
        plan.id === editingPlan.id 
          ? { ...plan, ...formData, assignedTo: plan.assignedTo }
          : plan
      ));
      toast({
        title: "Workout Plan Updated",
        description: "Workout plan has been successfully updated.",
      });
    } else {
      const newPlan = {
        id: Date.now(),
        ...formData,
        assignedTo: 0
      };
      setPlans([...plans, newPlan]);
      toast({
        title: "Workout Plan Created",
        description: "New workout plan has been successfully created.",
      });
    }
    
    setIsDialogOpen(false);
    setEditingPlan(null);
    setFormData({
      name: "",
      difficulty: "Beginner",
      duration: "",
      exercises: "",
      description: ""
    });
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      difficulty: plan.difficulty,
      duration: plan.duration,
      exercises: plan.exercises.toString(),
      description: plan.description
    });
    setIsDialogOpen(true);
  };

  const handleView = (plan) => {
    setViewingPlan(plan);
    setIsViewDialogOpen(true);
  };

  const handleDelete = (id) => {
    setPlans(plans.filter(plan => plan.id !== id));
    toast({
      title: "Workout Plan Deleted",
      description: "Workout plan has been successfully removed.",
    });
  };

  const getDifficultyBadge = (difficulty) => {
    const variants = {
      "Beginner": "secondary",
      "Intermediate": "outline",
      "Advanced": "destructive"
    };
    return <Badge variant={variants[difficulty]}>{difficulty}</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Workout Plans</CardTitle>
              <CardDescription>Create and manage workout plans for members</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => {
                  setEditingPlan(null);
                  setFormData({
                    name: "",
                    difficulty: "Beginner",
                    duration: "",
                    exercises: "",
                    description: ""
                  });
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Plan
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingPlan ? 'Edit Workout Plan' : 'Create New Workout Plan'}</DialogTitle>
                  <DialogDescription>
                    {editingPlan ? 'Update workout plan details' : 'Enter details for the new workout plan'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Plan Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g., Beginner Strength Training"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Difficulty Level</Label>
                      <select
                        id="difficulty"
                        value={formData.difficulty}
                        onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        value={formData.duration}
                        onChange={(e) => setFormData({...formData, duration: e.target.value})}
                        placeholder="e.g., 4 weeks"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="exercises">Number of Exercises</Label>
                    <Input
                      id="exercises"
                      type="number"
                      value={formData.exercises}
                      onChange={(e) => setFormData({...formData, exercises: e.target.value})}
                      placeholder="8"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Describe the workout plan and its goals..."
                      rows={3}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    {editingPlan ? 'Update Plan' : 'Create Plan'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan Name</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Exercises</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>{getDifficultyBadge(plan.difficulty)}</TableCell>
                  <TableCell>{plan.duration}</TableCell>
                  <TableCell>{plan.exercises} exercises</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-gray-500" />
                      {plan.assignedTo} members
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleView(plan)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(plan)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(plan.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Plan Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{viewingPlan?.name}</DialogTitle>
            <DialogDescription>Workout plan details</DialogDescription>
          </DialogHeader>
          {viewingPlan && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Difficulty</Label>
                  <div className="mt-1">{getDifficultyBadge(viewingPlan.difficulty)}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Duration</Label>
                  <p className="mt-1">{viewingPlan.duration}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Exercises</Label>
                  <p className="mt-1">{viewingPlan.exercises} exercises</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Assigned Members</Label>
                  <p className="mt-1">{viewingPlan.assignedTo} members</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Description</Label>
                <p className="mt-1 text-sm text-gray-700">{viewingPlan.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};


import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Clock, Users, Calendar, Edit, Trash } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface GymClass {
  id: string;
  name: string;
  instructor: string;
  schedule: string;
  duration: number;
  maxCapacity: number;
  currentEnrollment: number;
  description: string;
}

export const ClassManagement = () => {
  const [classes, setClasses] = useState<GymClass[]>([
    {
      id: "1",
      name: "Morning Yoga",
      instructor: "Sarah Wilson",
      schedule: "Monday, Wednesday, Friday - 7:00 AM",
      duration: 60,
      maxCapacity: 20,
      currentEnrollment: 15,
      description: "Gentle yoga flow to start your day"
    },
    {
      id: "2",
      name: "HIIT Training",
      instructor: "Mike Thompson",
      schedule: "Tuesday, Thursday - 6:00 PM",
      duration: 45,
      maxCapacity: 15,
      currentEnrollment: 12,
      description: "High-intensity interval training"
    },
    {
      id: "3",
      name: "Spin Class",
      instructor: "Emma Johnson",
      schedule: "Monday, Wednesday, Friday - 6:30 PM",
      duration: 50,
      maxCapacity: 25,
      currentEnrollment: 20,
      description: "High-energy cycling workout"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<GymClass | null>(null);
  const [newClass, setNewClass] = useState({
    name: "",
    instructor: "",
    schedule: "",
    duration: 60,
    maxCapacity: 20,
    description: ""
  });

  const handleAddClass = () => {
    const gymClass: GymClass = {
      id: Date.now().toString(),
      ...newClass,
      currentEnrollment: 0
    };
    setClasses([...classes, gymClass]);
    setNewClass({
      name: "",
      instructor: "",
      schedule: "",
      duration: 60,
      maxCapacity: 20,
      description: ""
    });
    setIsDialogOpen(false);
    toast({ title: "Class added successfully!" });
  };

  const handleEditClass = (gymClass: GymClass) => {
    setEditingClass(gymClass);
    setNewClass({
      name: gymClass.name,
      instructor: gymClass.instructor,
      schedule: gymClass.schedule,
      duration: gymClass.duration,
      maxCapacity: gymClass.maxCapacity,
      description: gymClass.description
    });
    setIsDialogOpen(true);
  };

  const handleUpdateClass = () => {
    if (editingClass) {
      setClasses(classes.map(c => 
        c.id === editingClass.id 
          ? { ...editingClass, ...newClass }
          : c
      ));
      setEditingClass(null);
      setNewClass({
        name: "",
        instructor: "",
        schedule: "",
        duration: 60,
        maxCapacity: 20,
        description: ""
      });
      setIsDialogOpen(false);
      toast({ title: "Class updated successfully!" });
    }
  };

  const handleDeleteClass = (id: string) => {
    setClasses(classes.filter(c => c.id !== id));
    toast({ title: "Class deleted successfully!" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Class Management</h2>
          <p className="text-gray-600">Manage gym classes and schedules</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingClass(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Class
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingClass ? 'Edit Class' : 'Add New Class'}</DialogTitle>
              <DialogDescription>
                {editingClass ? 'Update class information' : 'Enter the details for the new class'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="class-name">Class Name</Label>
                <Input
                  id="class-name"
                  value={newClass.name}
                  onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                  placeholder="Enter class name"
                />
              </div>
              <div>
                <Label htmlFor="instructor">Instructor</Label>
                <Input
                  id="instructor"
                  value={newClass.instructor}
                  onChange={(e) => setNewClass({ ...newClass, instructor: e.target.value })}
                  placeholder="Enter instructor name"
                />
              </div>
              <div>
                <Label htmlFor="schedule">Schedule</Label>
                <Input
                  id="schedule"
                  value={newClass.schedule}
                  onChange={(e) => setNewClass({ ...newClass, schedule: e.target.value })}
                  placeholder="e.g., Monday, Wednesday - 7:00 AM"
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={newClass.duration}
                  onChange={(e) => setNewClass({ ...newClass, duration: parseInt(e.target.value) })}
                  placeholder="Enter duration in minutes"
                />
              </div>
              <div>
                <Label htmlFor="capacity">Max Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={newClass.maxCapacity}
                  onChange={(e) => setNewClass({ ...newClass, maxCapacity: parseInt(e.target.value) })}
                  placeholder="Enter maximum capacity"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newClass.description}
                  onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
                  placeholder="Enter class description"
                />
              </div>
              <Button 
                onClick={editingClass ? handleUpdateClass : handleAddClass}
                className="w-full"
              >
                {editingClass ? 'Update Class' : 'Add Class'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((gymClass) => (
          <Card key={gymClass.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{gymClass.name}</CardTitle>
                  <CardDescription>with {gymClass.instructor}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditClass(gymClass)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteClass(gymClass.id)}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  {gymClass.schedule}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  {gymClass.duration} minutes
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  {gymClass.currentEnrollment}/{gymClass.maxCapacity} enrolled
                </div>
                <p className="text-sm text-gray-600">{gymClass.description}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ 
                      width: `${(gymClass.currentEnrollment / gymClass.maxCapacity) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

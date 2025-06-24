
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Calendar, Clock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ClassManagement = () => {
  const { toast } = useToast();
  const [classes, setClasses] = useState([
    { id: 1, name: "Morning Yoga", instructor: "Sarah Wilson", time: "07:00", duration: 60, capacity: 20, enrolled: 15, date: "2024-01-20" },
    { id: 2, name: "HIIT Training", instructor: "Mike Johnson", time: "18:00", duration: 45, capacity: 15, enrolled: 12, date: "2024-01-20" },
    { id: 3, name: "Pilates", instructor: "Emma Davis", time: "19:00", duration: 50, capacity: 12, enrolled: 8, date: "2024-01-20" },
    { id: 4, name: "Strength Training", instructor: "John Smith", time: "20:00", duration: 60, capacity: 10, enrolled: 10, date: "2024-01-20" },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    instructor: "",
    time: "",
    duration: "",
    capacity: "",
    date: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingClass) {
      setClasses(classes.map(classItem => 
        classItem.id === editingClass.id 
          ? { ...classItem, ...formData, enrolled: classItem.enrolled }
          : classItem
      ));
      toast({
        title: "Class Updated",
        description: "Class information has been successfully updated.",
      });
    } else {
      const newClass = {
        id: Date.now(),
        ...formData,
        enrolled: 0
      };
      setClasses([...classes, newClass]);
      toast({
        title: "Class Added",
        description: "New class has been successfully scheduled.",
      });
    }
    
    setIsDialogOpen(false);
    setEditingClass(null);
    setFormData({
      name: "",
      instructor: "",
      time: "",
      duration: "",
      capacity: "",
      date: ""
    });
  };

  const handleEdit = (classItem) => {
    setEditingClass(classItem);
    setFormData({
      name: classItem.name,
      instructor: classItem.instructor,
      time: classItem.time,
      duration: classItem.duration.toString(),
      capacity: classItem.capacity.toString(),
      date: classItem.date
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    setClasses(classes.filter(classItem => classItem.id !== id));
    toast({
      title: "Class Deleted",
      description: "Class has been successfully removed.",
    });
  };

  const getCapacityBadge = (enrolled, capacity) => {
    const percentage = (enrolled / capacity) * 100;
    if (percentage >= 100) return <Badge variant="destructive">Full</Badge>;
    if (percentage >= 80) return <Badge variant="outline">Almost Full</Badge>;
    return <Badge variant="secondary">Available</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Class Management</CardTitle>
              <CardDescription>Schedule and manage fitness classes</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => {
                  setEditingClass(null);
                  setFormData({
                    name: "",
                    instructor: "",
                    time: "",
                    duration: "",
                    capacity: "",
                    date: ""
                  });
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Class
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingClass ? 'Edit Class' : 'Schedule New Class'}</DialogTitle>
                  <DialogDescription>
                    {editingClass ? 'Update class information' : 'Enter details for the new class'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Class Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g., Morning Yoga"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instructor">Instructor</Label>
                    <Input
                      id="instructor"
                      value={formData.instructor}
                      onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                      placeholder="Instructor name"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (minutes)</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={formData.duration}
                        onChange={(e) => setFormData({...formData, duration: e.target.value})}
                        placeholder="60"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Capacity</Label>
                      <Input
                        id="capacity"
                        type="number"
                        value={formData.capacity}
                        onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                        placeholder="20"
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    {editingClass ? 'Update Class' : 'Schedule Class'}
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
                <TableHead>Class Name</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((classItem) => (
                <TableRow key={classItem.id}>
                  <TableCell className="font-medium">{classItem.name}</TableCell>
                  <TableCell>{classItem.instructor}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      {classItem.date}
                      <Clock className="h-4 w-4 text-gray-500 ml-2" />
                      {classItem.time}
                    </div>
                  </TableCell>
                  <TableCell>{classItem.duration} min</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-gray-500" />
                      {classItem.enrolled}/{classItem.capacity}
                    </div>
                  </TableCell>
                  <TableCell>{getCapacityBadge(classItem.enrolled, classItem.capacity)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(classItem)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(classItem.id)}
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
    </div>
  );
};

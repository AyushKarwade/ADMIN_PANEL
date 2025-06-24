
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const MemberManagement = () => {
  const { toast } = useToast();
  const [members, setMembers] = useState([
    { id: 1, name: "John Smith", email: "john@example.com", phone: "+1234567890", status: "Active", joinDate: "2024-01-15", membership: "Premium" },
    { id: 2, name: "Sarah Johnson", email: "sarah@example.com", phone: "+1234567891", status: "Active", joinDate: "2024-02-20", membership: "Basic" },
    { id: 3, name: "Mike Wilson", email: "mike@example.com", phone: "+1234567892", status: "Inactive", joinDate: "2023-12-10", membership: "Premium" },
    { id: 4, name: "Emma Davis", email: "emma@example.com", phone: "+1234567893", status: "Active", joinDate: "2024-03-05", membership: "Standard" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    membership: "Basic"
  });

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingMember) {
      setMembers(members.map(member => 
        member.id === editingMember.id 
          ? { ...member, ...formData }
          : member
      ));
      toast({
        title: "Member Updated",
        description: "Member information has been successfully updated.",
      });
    } else {
      const newMember = {
        id: Date.now(),
        ...formData,
        status: "Active",
        joinDate: new Date().toISOString().split('T')[0]
      };
      setMembers([...members, newMember]);
      toast({
        title: "Member Added",
        description: "New member has been successfully added.",
      });
    }
    
    setIsDialogOpen(false);
    setEditingMember(null);
    setFormData({ name: "", email: "", phone: "", membership: "Basic" });
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      membership: member.membership
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    setMembers(members.filter(member => member.id !== id));
    toast({
      title: "Member Deleted",
      description: "Member has been successfully removed.",
    });
  };

  const getStatusBadge = (status) => (
    <Badge variant={status === "Active" ? "default" : "secondary"}>
      {status}
    </Badge>
  );

  const getMembershipBadge = (membership) => {
    const variants = {
      "Basic": "secondary",
      "Standard": "outline", 
      "Premium": "default"
    };
    return <Badge variant={variants[membership]}>{membership}</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Member Management</CardTitle>
              <CardDescription>Manage gym members and their memberships</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => {
                  setEditingMember(null);
                  setFormData({ name: "", email: "", phone: "", membership: "Basic" });
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingMember ? 'Edit Member' : 'Add New Member'}</DialogTitle>
                  <DialogDescription>
                    {editingMember ? 'Update member information' : 'Enter details for the new member'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="membership">Membership Type</Label>
                    <select
                      id="membership"
                      value={formData.membership}
                      onChange={(e) => setFormData({...formData, membership: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="Basic">Basic</option>
                      <option value="Standard">Standard</option>
                      <option value="Premium">Premium</option>
                    </select>
                  </div>
                  <Button type="submit" className="w-full">
                    {editingMember ? 'Update Member' : 'Add Member'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Membership</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.phone}</TableCell>
                  <TableCell>{getStatusBadge(member.status)}</TableCell>
                  <TableCell>{getMembershipBadge(member.membership)}</TableCell>
                  <TableCell>{member.joinDate}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(member)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(member.id)}
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

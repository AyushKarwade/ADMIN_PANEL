
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search, Edit, Trash, Mail, Phone } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipType: string;
  joinDate: string;
  status: 'active' | 'inactive';
}

export const MemberManagement = () => {
  const [members, setMembers] = useState<Member[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234-567-8900",
      membershipType: "Premium",
      joinDate: "2024-01-15",
      status: "active"
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 234-567-8901",
      membershipType: "Basic",
      joinDate: "2024-02-20",
      status: "active"
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1 234-567-8902",
      membershipType: "Premium",
      joinDate: "2024-03-10",
      status: "inactive"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    phone: "",
    membershipType: "Basic"
  });

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMember = () => {
    const member: Member = {
      id: Date.now().toString(),
      ...newMember,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    setMembers([...members, member]);
    setNewMember({ name: "", email: "", phone: "", membershipType: "Basic" });
    setIsAddDialogOpen(false);
    toast({ title: "Member added successfully!" });
  };

  const handleDeleteMember = (id: string) => {
    setMembers(members.filter(m => m.id !== id));
    toast({ title: "Member deleted successfully!" });
  };

  const handleEditMember = (member: Member) => {
    setEditingMember(member);
    setNewMember({
      name: member.name,
      email: member.email,
      phone: member.phone,
      membershipType: member.membershipType
    });
    setIsAddDialogOpen(true);
  };

  const handleUpdateMember = () => {
    if (editingMember) {
      setMembers(members.map(m => 
        m.id === editingMember.id 
          ? { ...editingMember, ...newMember }
          : m
      ));
      setEditingMember(null);
      setNewMember({ name: "", email: "", phone: "", membershipType: "Basic" });
      setIsAddDialogOpen(false);
      toast({ title: "Member updated successfully!" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Member Management</h2>
          <p className="text-gray-600">Manage gym members and their details</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingMember(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingMember ? 'Edit Member' : 'Add New Member'}</DialogTitle>
              <DialogDescription>
                {editingMember ? 'Update member information' : 'Enter the details for the new member'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newMember.phone}
                  onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <Label htmlFor="membership">Membership Type</Label>
                <select
                  id="membership"
                  value={newMember.membershipType}
                  onChange={(e) => setNewMember({ ...newMember, membershipType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Basic">Basic</option>
                  <option value="Premium">Premium</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>
              <Button 
                onClick={editingMember ? handleUpdateMember : handleAddMember}
                className="w-full"
              >
                {editingMember ? 'Update Member' : 'Add Member'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search members by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <Card key={member.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription>{member.membershipType} Member</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditMember(member)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteMember(member.id)}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  {member.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  {member.phone}
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-500">
                    Joined: {new Date(member.joinDate).toLocaleDateString()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    member.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {member.status}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

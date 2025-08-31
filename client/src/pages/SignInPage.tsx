import { useState } from 'react';
import { SignIn } from '@/types';
import { mockSignIns } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SignInTable } from '@/components/signin/SignInTable';
import { SignInForm } from '@/components/signin/SignInForm';
import { Modal } from '@/components/ui/modal';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Plus, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SignInPage() {
  const [signIns, setSignIns] = useState<SignIn[]>(mockSignIns);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSignIn, setEditingSignIn] = useState<SignIn | undefined>();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredSignIns = signIns.filter(signIn =>
    signIn.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
    signIn.signWith.toLowerCase().includes(searchTerm.toLowerCase()) ||
    signIn.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateSignIn = (signInData: Partial<SignIn>) => {
    const newSignIn: SignIn = {
      signId: Date.now().toString(),
      website: signInData.website!,
      signWith: signInData.signWith!,
      option: signInData.option!,
      user: signInData.user!,
    };
    
    setSignIns([...signIns, newSignIn]);
    setIsFormOpen(false);
    toast({
      title: "Sign-in created",
      description: "New sign-in entry has been created successfully.",
    });
  };

  const handleEditSignIn = (signInData: Partial<SignIn>) => {
    const updatedSignIns = signIns.map(signIn =>
      signIn.signId === signInData.signId
        ? { ...signIn, ...signInData }
        : signIn
    );
    
    setSignIns(updatedSignIns);
    setEditingSignIn(undefined);
    setIsFormOpen(false);
    toast({
      title: "Sign-in updated",
      description: "Sign-in entry has been updated successfully.",
    });
  };

  const handleDeleteSignIn = (signId: string) => {
    setSignIns(signIns.filter(signIn => signIn.signId !== signId));
    setDeleteConfirm(null);
    toast({
      title: "Sign-in deleted",
      description: "Sign-in entry has been deleted successfully.",
    });
  };

  const openCreateForm = () => {
    setEditingSignIn(undefined);
    setIsFormOpen(true);
  };

  const openEditForm = (signIn: SignIn) => {
    setEditingSignIn(signIn);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Sign-in Credentials</h1>
          <p className="text-muted-foreground">Manage authentication details for various platforms</p>
        </div>
        <Button onClick={openCreateForm} className="self-start sm:self-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Sign-in
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by website, credentials, or user..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <SignInTable
        signIns={filteredSignIns}
        onEdit={openEditForm}
        onDelete={(id) => setDeleteConfirm(id)}
      />

      {filteredSignIns.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No sign-in entries found matching your search.</p>
        </div>
      )}

      <Modal
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        title={editingSignIn ? 'Edit Sign-in' : 'Create New Sign-in'}
        description={editingSignIn ? 'Update the sign-in details below.' : 'Fill in the details to create a new sign-in entry.'}
      >
        <SignInForm
          signIn={editingSignIn}
          onSubmit={editingSignIn ? handleEditSignIn : handleCreateSignIn}
          onCancel={() => setIsFormOpen(false)}
        />
      </Modal>

      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Sign-in Entry</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this sign-in entry? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => deleteConfirm && handleDeleteSignIn(deleteConfirm)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
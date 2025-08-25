import { useState } from 'react';
import { Idea } from '@/types';
import { mockIdeas } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IdeaCard } from '@/components/ideas/IdeaCard';
import { IdeaForm } from '@/components/ideas/IdeaForm';
import { Modal } from '@/components/ui/modal';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Plus, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function IdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>(mockIdeas);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingIdea, setEditingIdea] = useState<Idea | undefined>();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredIdeas = ideas.filter(idea => 
    idea.idea.toLowerCase().includes(searchTerm.toLowerCase()) ||
    idea.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateIdea = (ideaData: Partial<Idea>) => {
    const newIdea: Idea = {
      ideaId: Date.now().toString(),
      idea: ideaData.idea!,
      createdAt: new Date(),
      user: ideaData.user!,
    };
    
    setIdeas([...ideas, newIdea]);
    setIsFormOpen(false);
    toast({
      title: "Idea created",
      description: "New idea has been created successfully.",
    });
  };

  const handleEditIdea = (ideaData: Partial<Idea>) => {
    const updatedIdeas = ideas.map(idea =>
      idea.ideaId === ideaData.ideaId
        ? { ...idea, ...ideaData }
        : idea
    );
    
    setIdeas(updatedIdeas);
    setEditingIdea(undefined);
    setIsFormOpen(false);
    toast({
      title: "Idea updated",
      description: "Idea has been updated successfully.",
    });
  };

  const handleDeleteIdea = (ideaId: string) => {
    setIdeas(ideas.filter(idea => idea.ideaId !== ideaId));
    setDeleteConfirm(null);
    toast({
      title: "Idea deleted",
      description: "Idea has been deleted successfully.",
    });
  };

  const openCreateForm = () => {
    setEditingIdea(undefined);
    setIsFormOpen(true);
  };

  const openEditForm = (idea: Idea) => {
    setEditingIdea(idea);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Ideas</h1>
          <p className="text-muted-foreground">Capture and organize your creative thoughts</p>
        </div>
        <Button onClick={openCreateForm} className="self-start sm:self-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Idea
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search ideas or users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIdeas.map((idea) => (
          <IdeaCard
            key={idea.ideaId}
            idea={idea}
            onEdit={openEditForm}
            onDelete={(id) => setDeleteConfirm(id)}
          />
        ))}
      </div>

      {filteredIdeas.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No ideas found matching your search.</p>
        </div>
      )}

      <Modal
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        title={editingIdea ? 'Edit Idea' : 'Create New Idea'}
        description={editingIdea ? 'Update the idea details below.' : 'Fill in the details to create a new idea.'}
      >
        <IdeaForm
          idea={editingIdea}
          onSubmit={editingIdea ? handleEditIdea : handleCreateIdea}
          onCancel={() => setIsFormOpen(false)}
        />
      </Modal>

      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Idea</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this idea? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => deleteConfirm && handleDeleteIdea(deleteConfirm)}
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
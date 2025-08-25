import { useState, useEffect } from 'react';
import { Idea } from '@/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockUsers } from '@/data/mockData';

interface IdeaFormProps {
  idea?: Idea;
  onSubmit: (ideaData: Partial<Idea>) => void;
  onCancel: () => void;
}

export function IdeaForm({ idea, onSubmit, onCancel }: IdeaFormProps) {
  const [formData, setFormData] = useState({
    idea: idea?.idea || '',
    userId: idea?.user.userID || mockUsers[0].userID,
  });

  useEffect(() => {
    if (idea) {
      setFormData({
        idea: idea.idea,
        userId: idea.user.userID,
      });
    }
  }, [idea]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedUser = mockUsers.find(u => u.userID === formData.userId) || mockUsers[0];
    
    onSubmit({
      ...formData,
      user: selectedUser,
      ...(idea ? { ideaId: idea.ideaId } : {}),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="idea">Idea Description</Label>
        <Textarea
          id="idea"
          value={formData.idea}
          onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
          placeholder="Describe your idea..."
          required
          className="min-h-[120px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="user">Created By</Label>
        <Select value={formData.userId} onValueChange={(value) => setFormData({ ...formData, userId: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select user" />
          </SelectTrigger>
          <SelectContent>
            {mockUsers.map((user) => (
              <SelectItem key={user.userID} value={user.userID}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {idea ? 'Update' : 'Create'} Idea
        </Button>
      </div>
    </form>
  );
}
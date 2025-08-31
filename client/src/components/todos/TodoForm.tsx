import { useState, useEffect } from 'react';
import { Todo, User } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockUsers } from '@/data/mockData';

interface TodoFormProps {
  todo?: Todo;
  onSubmit: (todoData: Partial<Todo>) => void;
  onCancel: () => void;
}

export function TodoForm({ todo, onSubmit, onCancel }: TodoFormProps) {
  const [formData, setFormData] = useState({
    todo: todo?.todo || '',
    extendTime: todo?.extendTime || 0,
    status: todo?.status || false,
    userId: todo?.user.userID || mockUsers[0].userID,
  });

  useEffect(() => {
    if (todo) {
      setFormData({
        todo: todo.todo,
        extendTime: todo.extendTime,
        status: todo.status,
        userId: todo.user.userID,
      });
    }
  }, [todo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedUser = mockUsers.find(u => u.userID === formData.userId) || mockUsers[0];
    
    onSubmit({
      ...formData,
      user: selectedUser,
      ...(todo ? { todoID: todo.todoID } : {}),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="todo">Todo Task</Label>
        <Textarea
          id="todo"
          value={formData.todo}
          onChange={(e) => setFormData({ ...formData, todo: e.target.value })}
          placeholder="Enter todo task..."
          required
          className="min-h-[80px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="extendTime">Extend Time</Label>
        <Input
          id="extendTime"
          type="number"
          min="0"
          value={formData.extendTime}
          onChange={(e) => setFormData({ ...formData, extendTime: parseInt(e.target.value) || 0 })}
          placeholder="Number of extensions"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="user">Assigned User</Label>
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
          {todo ? 'Update' : 'Create'} Todo
        </Button>
      </div>
    </form>
  );
}
import { useState, useEffect } from 'react';
import { SignIn, SignInOption } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockUsers } from '@/data/mockData';

interface SignInFormProps {
  signIn?: SignIn;
  onSubmit: (signInData: Partial<SignIn>) => void;
  onCancel: () => void;
}

export function SignInForm({ signIn, onSubmit, onCancel }: SignInFormProps) {
  const [formData, setFormData] = useState({
    website: signIn?.website || '',
    signWith: signIn?.signWith || '',
    option: signIn?.option || SignInOption.EMAIL,
    userId: signIn?.user.userID || mockUsers[0].userID,
  });

  useEffect(() => {
    if (signIn) {
      setFormData({
        website: signIn.website,
        signWith: signIn.signWith,
        option: signIn.option,
        userId: signIn.user.userID,
      });
    }
  }, [signIn]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedUser = mockUsers.find(u => u.userID === formData.userId) || mockUsers[0];
    
    onSubmit({
      ...formData,
      user: selectedUser,
      ...(signIn ? { signId: signIn.signId } : {}),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          placeholder="Enter website name..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="signWith">Sign With</Label>
        <Input
          id="signWith"
          value={formData.signWith}
          onChange={(e) => setFormData({ ...formData, signWith: e.target.value })}
          placeholder="Enter email or username..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="option">Sign-in Option</Label>
        <Select value={formData.option} onValueChange={(value) => setFormData({ ...formData, option: value as SignInOption })}>
          <SelectTrigger>
            <SelectValue placeholder="Select sign-in option" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(SignInOption).map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="user">User</Label>
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
          {signIn ? 'Update' : 'Create'} Sign-in
        </Button>
      </div>
    </form>
  );
}
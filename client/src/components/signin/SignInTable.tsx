import { SignIn } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';

interface SignInTableProps {
  signIns: SignIn[];
  onEdit: (signIn: SignIn) => void;
  onDelete: (signId: string) => void;
}

const getOptionColor = (option: string) => {
  const colors: Record<string, string> = {
    'Email': 'bg-blue-100 text-blue-800',
    'Google': 'bg-red-100 text-red-800',
    'GitHub': 'bg-gray-100 text-gray-800',
    'Apple': 'bg-gray-100 text-gray-800',
    'Facebook': 'bg-blue-100 text-blue-800',
    'Twitter': 'bg-sky-100 text-sky-800',
  };
  return colors[option] || 'bg-gray-100 text-gray-800';
};

export function SignInTable({ signIns, onEdit, onDelete }: SignInTableProps) {
  return (
    <div className="bg-card rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Website</TableHead>
            <TableHead>Sign With</TableHead>
            <TableHead>Option</TableHead>
            <TableHead>User</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {signIns.map((signIn) => (
            <TableRow key={signIn.signId} className="hover:bg-muted/50">
              <TableCell className="font-medium">{signIn.website}</TableCell>
              <TableCell className="text-muted-foreground">{signIn.signWith}</TableCell>
              <TableCell>
                <Badge className={getOptionColor(signIn.option)} variant="secondary">
                  {signIn.option}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={signIn.user.profileUrl} alt={signIn.user.name} />
                    <AvatarFallback className="text-xs">
                      {signIn.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{signIn.user.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(signIn)}
                    className="h-8 w-8 p-0 hover:bg-muted"
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(signIn.signId)}
                    className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
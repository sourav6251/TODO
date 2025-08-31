import { Todo } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Calendar, Clock, Edit2, Trash2, User } from 'lucide-react';
import { format } from 'date-fns';

interface TodoCardProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (todoId: string) => void;
  onToggleStatus: (todoId: string, status: boolean) => void;
}

export function TodoCard({ todo, onEdit, onDelete, onToggleStatus }: TodoCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <Switch
              checked={todo.status}
              onCheckedChange={(checked) => onToggleStatus(todo.todoID, checked)}
              className="data-[state=checked]:bg-success"
            />
            <div className="flex-1">
              <h3 className={`font-medium text-sm leading-relaxed ${
                todo.status ? 'line-through text-muted-foreground' : 'text-foreground'
              }`}>
                {todo.todo}
              </h3>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(todo)}
              className="h-8 w-8 p-0 hover:bg-muted"
            >
              <Edit2 className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(todo.todoID)}
              className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-2">
          {todo.extendTime > 0 && (
            <Badge variant="secondary" className="text-xs">
              <Clock className="h-3 w-3 mr-1" />
              Extended {todo.extendTime} time{todo.extendTime > 1 ? 's' : ''}
            </Badge>
          )}
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-5 w-5">
                <AvatarImage src={todo.user.profileUrl} alt={todo.user.name} />
                <AvatarFallback className="text-xs">
                  {todo.user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span>{todo.user.name}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{format(todo.createdAt, 'MMM dd')}</span>
            </div>
          </div>
          
          {todo.finishAt && (
            <div className="text-xs text-success flex items-center gap-1">
              <span>Finished: {format(todo.finishAt, 'MMM dd, yyyy')}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
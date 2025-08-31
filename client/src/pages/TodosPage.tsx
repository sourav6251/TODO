import { useState } from 'react';
import { Todo } from '@/types';
import { mockTodos } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TodoCard } from '@/components/todos/TodoCard';
import { TodoForm } from '@/components/todos/TodoForm';
import { Modal } from '@/components/ui/modal';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Plus, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>(mockTodos);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | undefined>();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.todo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         todo.user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'completed' && todo.status) ||
                         (statusFilter === 'pending' && !todo.status);
    return matchesSearch && matchesStatus;
  });

  const handleCreateTodo = (todoData: Partial<Todo>) => {
    const newTodo: Todo = {
      todoID: Date.now().toString(),
      todo: todoData.todo!,
      extendTime: todoData.extendTime!,
      status: todoData.status!,
      createdAt: new Date(),
      extendAt: null,
      finishAt: null,
      user: todoData.user!,
    };
    
    setTodos([...todos, newTodo]);
    setIsFormOpen(false);
    toast({
      title: "Todo created",
      description: "New todo has been created successfully.",
    });
  };

  const handleEditTodo = (todoData: Partial<Todo>) => {
    const updatedTodos = todos.map(todo =>
      todo.todoID === todoData.todoID
        ? { ...todo, ...todoData }
        : todo
    );
    
    setTodos(updatedTodos);
    setEditingTodo(undefined);
    setIsFormOpen(false);
    toast({
      title: "Todo updated",
      description: "Todo has been updated successfully.",
    });
  };

  const handleDeleteTodo = (todoId: string) => {
    setTodos(todos.filter(todo => todo.todoID !== todoId));
    setDeleteConfirm(null);
    toast({
      title: "Todo deleted",
      description: "Todo has been deleted successfully.",
    });
  };

  const handleToggleStatus = (todoId: string, status: boolean) => {
    const updatedTodos = todos.map(todo =>
      todo.todoID === todoId
        ? { 
            ...todo, 
            status,
            finishAt: status ? new Date() : null 
          }
        : todo
    );
    
    setTodos(updatedTodos);
    toast({
      title: status ? "Todo completed" : "Todo reopened",
      description: `Todo has been marked as ${status ? 'completed' : 'pending'}.`,
    });
  };

  const openCreateForm = () => {
    setEditingTodo(undefined);
    setIsFormOpen(true);
  };

  const openEditForm = (todo: Todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Todos</h1>
          <p className="text-muted-foreground">Manage your tasks and track progress</p>
        </div>
        <Button onClick={openCreateForm} className="self-start sm:self-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Todo
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search todos or users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Todos</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTodos.map((todo) => (
          <TodoCard
            key={todo.todoID}
            todo={todo}
            onEdit={openEditForm}
            onDelete={(id) => setDeleteConfirm(id)}
            onToggleStatus={handleToggleStatus}
          />
        ))}
      </div>

      {filteredTodos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No todos found matching your criteria.</p>
        </div>
      )}

      <Modal
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        title={editingTodo ? 'Edit Todo' : 'Create New Todo'}
        description={editingTodo ? 'Update the todo details below.' : 'Fill in the details to create a new todo.'}
      >
        <TodoForm
          todo={editingTodo}
          onSubmit={editingTodo ? handleEditTodo : handleCreateTodo}
          onCancel={() => setIsFormOpen(false)}
        />
      </Modal>

      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Todo</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this todo? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => deleteConfirm && handleDeleteTodo(deleteConfirm)}
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
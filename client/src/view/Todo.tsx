// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Plus,
//   Edit3,
//   Trash2,
//   CheckCircle,
//   XCircle,
//   PauseCircle,
//   Calendar,
//   Clock,
//   Search,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

// // TypeScript interfaces
// interface Todo {
//   id: string;
//   title: string;
//   description: string;
//   status: "pending" | "in-progress" | "completed" | "paused" | "failed";
//   priority: "low" | "medium" | "high";
//   createdAt: Date;
//   expireDate: Date;
//   originalExpireDate: Date;
//   lastExtendedDate?: Date;
//   extensionCount: number;
//   tags: string[];
// }

// const Todo: React.FC = () => {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState<string>("all");
//   const [filterPriority, setFilterPriority] = useState<string>("all");
//   const [sortBy, setSortBy] = useState<"created" | "expire" | "priority">(
//     "created"
//   );
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

//   useEffect(() => {
//     const savedTodos = localStorage.getItem("productivitySuite-todos");
//     if (savedTodos) {
//       const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
//         ...todo,
//         createdAt: new Date(todo.createdAt),
//         expireDate: new Date(todo.expireDate),
//         originalExpireDate: new Date(todo.originalExpireDate),
//         lastExtendedDate: todo.lastExtendedDate
//           ? new Date(todo.lastExtendedDate)
//           : undefined,
//       }));
//       setTodos(parsedTodos);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("productivitySuite-todos", JSON.stringify(todos));
//     filterAndSortTodos();
//   }, [todos, searchTerm, filterStatus, filterPriority, sortBy, sortOrder]);

//   const filterAndSortTodos = () => {
//     let filtered = todos.filter((todo) => {
//       const matchesSearch =
//         todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         todo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         todo.tags.some((tag) =>
//           tag.toLowerCase().includes(searchTerm.toLowerCase())
//         );

//       const matchesStatus = filterStatus === "all" || todo.status === filterStatus;
//       const matchesPriority =
//         filterPriority === "all" || todo.priority === filterPriority;

//       return matchesSearch && matchesStatus && matchesPriority;
//     });

//     filtered.sort((a, b) => {
//       let aValue: number, bValue: number;
//       switch (sortBy) {
//         case "created":
//           aValue = a.createdAt.getTime();
//           bValue = b.createdAt.getTime();
//           break;
//         case "expire":
//           aValue = a.expireDate.getTime();
//           bValue = b.expireDate.getTime();
//           break;
//         case "priority":
//           const order = { high: 3, medium: 2, low: 1 };
//           aValue = order[a.priority];
//           bValue = order[b.priority];
//           break;
//         default:
//           return 0;
//       }
//       return sortOrder === "desc" ? bValue - aValue : aValue - bValue;
//     });

//     setFilteredTodos(filtered);
//   };

//   const handleDeleteTodo = (id: string) => {
//     setTodos(todos.filter((todo) => todo.id !== id));
//   };

//   const handleStatusChange = (id: string, status: Todo["status"]) => {
//     setTodos(todos.map((todo) => (todo.id === id ? { ...todo, status } : todo)));
//   };

//   const handleExtendExpireDate = (id: string, days: number) => {
//     setTodos(
//       todos.map((todo) => {
//         if (todo.id === id) {
//           const newExpireDate = new Date(todo.expireDate);
//           newExpireDate.setDate(newExpireDate.getDate() + days);
//           return {
//             ...todo,
//             expireDate: newExpireDate,
//             lastExtendedDate: new Date(),
//             extensionCount: todo.extensionCount + 1,
//           };
//         }
//         return todo;
//       })
//     );
//   };

//   const getStatusIcon = (status: Todo["status"]) => {
//     switch (status) {
//       case "completed":
//         return <CheckCircle className="w-5 h-5 text-green-500" />;
//       case "failed":
//         return <XCircle className="w-5 h-5 text-red-500" />;
//       case "paused":
//         return <PauseCircle className="w-5 h-5 text-yellow-500" />;
//       case "in-progress":
//         return <Clock className="w-5 h-5 text-blue-500" />;
//       default:
//         return <Clock className="w-5 h-5 text-gray-500" />;
//     }
//   };

//   const getPriorityVariant = (priority: Todo["priority"]) => {
//     switch (priority) {
//       case "high":
//         return "destructive";
//       case "medium":
//         return "secondary";
//       case "low":
//         return "outline";
//     }
//   };

//   const getDaysUntilExpire = (expireDate: Date): number => {
//     const today = new Date();
//     const diffTime = expireDate.getTime() - today.getTime();
//     return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8">
//       <div className="max-w-6xl mx-auto px-4">
//         <h1 className="text-4xl font-bold mb-6">Todo Management</h1>

//         {/* Filters */}
//         <div className="flex flex-col md:flex-row gap-4 mb-8">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
//             <Input
//               placeholder="Search todos..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>

//           <Select value={filterStatus} onValueChange={setFilterStatus}>
//             <SelectTrigger>
//               <SelectValue placeholder="Status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Status</SelectItem>
//               <SelectItem value="pending">Pending</SelectItem>
//               <SelectItem value="in-progress">In Progress</SelectItem>
//               <SelectItem value="completed">Completed</SelectItem>
//               <SelectItem value="paused">Paused</SelectItem>
//               <SelectItem value="failed">Failed</SelectItem>
//             </SelectContent>
//           </Select>

//           <Select value={filterPriority} onValueChange={setFilterPriority}>
//             <SelectTrigger>
//               <SelectValue placeholder="Priority" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Priority</SelectItem>
//               <SelectItem value="high">High</SelectItem>
//               <SelectItem value="medium">Medium</SelectItem>
//               <SelectItem value="low">Low</SelectItem>
//             </SelectContent>
//           </Select>

//           <div className="flex items-center gap-2">
//             <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
//               <SelectTrigger className="w-[150px]">
//                 <SelectValue placeholder="Sort by" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="created">Created Date</SelectItem>
//                 <SelectItem value="expire">Expire Date</SelectItem>
//                 <SelectItem value="priority">Priority</SelectItem>
//               </SelectContent>
//             </Select>

//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() =>
//                 setSortOrder(sortOrder === "asc" ? "desc" : "asc")
//               }
//             >
//               {sortOrder === "asc" ? (
//                 <ChevronUp className="w-4 h-4" />
//               ) : (
//                 <ChevronDown className="w-4 h-4" />
//               )}
//             </Button>
//           </div>
//         </div>

//         {/* Todo List */}
//         <div className="grid gap-6">
//           <AnimatePresence>
//             {filteredTodos.map((todo) => {
//               const days = getDaysUntilExpire(todo.expireDate);
//               const isExpired = days < 0;
//               return (
//                 <motion.div
//                   key={todo.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                 >
//                   <Card>
//                     <CardHeader className="flex flex-row items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         {getStatusIcon(todo.status)}
//                         <CardTitle
//                           className={`${
//                             todo.status === "completed"
//                               ? "line-through text-slate-400"
//                               : ""
//                           }`}
//                         >
//                           {todo.title}
//                         </CardTitle>
//                         <Badge variant={getPriorityVariant(todo.priority)}>
//                           {todo.priority}
//                         </Badge>
//                       </div>
//                       <div className="flex gap-2">
//                         <Button
//                           size="icon"
//                           variant="ghost"
//                           onClick={() => handleDeleteTodo(todo.id)}
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </Button>
//                       </div>
//                     </CardHeader>
//                     <CardContent>
//                       <p className="text-slate-600 mb-4">{todo.description}</p>
//                       <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-3">
//                         <div className="flex items-center gap-1">
//                           <Calendar className="w-4 h-4" />
//                           <span>
//                             Created: {todo.createdAt.toLocaleDateString()}
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Clock className="w-4 h-4" />
//                           <span
//                             className={isExpired ? "text-red-600 font-medium" : ""}
//                           >
//                             Expires: {todo.expireDate.toLocaleDateString()} (
//                             {isExpired
//                               ? `Expired ${Math.abs(days)}d ago`
//                               : `${days}d left`}
//                             )
//                           </span>
//                         </div>
//                         {todo.extensionCount > 0 && (
//                           <div className="text-blue-600">
//                             Extended {todo.extensionCount} time(s)
//                           </div>
//                         )}
//                       </div>
//                       {todo.tags.length > 0 && (
//                         <div className="flex flex-wrap gap-2 mb-3">
//                           {todo.tags.map((tag, i) => (
//                             <Badge key={i} variant="outline">
//                               #{tag}
//                             </Badge>
//                           ))}
//                         </div>
//                       )}
//                       <div className="flex items-center gap-2">
//                         <Select
//                           value={todo.status}
//                           onValueChange={(v: any) =>
//                             handleStatusChange(todo.id, v)
//                           }
//                         >
//                           <SelectTrigger className="w-[150px]">
//                             <SelectValue />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="pending">Pending</SelectItem>
//                             <SelectItem value="in-progress">In Progress</SelectItem>
//                             <SelectItem value="completed">Completed</SelectItem>
//                             <SelectItem value="paused">Paused</SelectItem>
//                             <SelectItem value="failed">Failed</SelectItem>
//                           </SelectContent>
//                         </Select>
//                         {[1, 3, 7].map((d) => (
//                           <Button
//                             key={d}
//                             variant="secondary"
//                             onClick={() => handleExtendExpireDate(todo.id, d)}
//                           >
//                             +{d}d
//                           </Button>
//                         ))}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               );
//             })}
//           </AnimatePresence>

//           {filteredTodos.length === 0 && (
//             <div className="text-center py-12 text-slate-500">
//               <Plus className="w-12 h-12 mx-auto mb-2 opacity-50" />
//               No todos found
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Todo;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  PauseCircle,
  Calendar,
  Clock,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// TypeScript interfaces
interface Todo {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'paused' | 'failed';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  expireDate: Date;
  originalExpireDate: Date;
  lastExtendedDate?: Date;
  extensionCount: number;
  tags: string[];
}

interface TodoFormData {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  expireDate: string;
  tags: string;
}

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'created' | 'expire' | 'priority'>('created');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [newTodo, setNewTodo] = useState<TodoFormData>({
    title: '',
    description: '',
    priority: 'medium',
    expireDate: '',
    tags: ''
  });

  // Load todos from localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem('productivitySuite-todos');
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        expireDate: new Date(todo.expireDate),
        originalExpireDate: new Date(todo.originalExpireDate),
        lastExtendedDate: todo.lastExtendedDate ? new Date(todo.lastExtendedDate) : undefined
      }));
      setTodos(parsedTodos);
    }
  }, []);

  // Save todos and filter/sort
  useEffect(() => {
    localStorage.setItem('productivitySuite-todos', JSON.stringify(todos));
    filterAndSortTodos();
  }, [todos, searchTerm, filterStatus, filterPriority, sortBy, sortOrder]);

  const filterAndSortTodos = () => {
    let filtered = todos.filter(todo => {
      const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           todo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           todo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = filterStatus === 'all' || todo.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || todo.priority === filterPriority;

      return matchesSearch && matchesStatus && matchesPriority;
    });

    filtered.sort((a, b) => {
      let aValue: number, bValue: number;
      
      switch (sortBy) {
        case 'created':
          aValue = a.createdAt.getTime();
          bValue = b.createdAt.getTime();
          break;
        case 'expire':
          aValue = a.expireDate.getTime();
          bValue = b.expireDate.getTime();
          break;
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          aValue = priorityOrder[a.priority];
          bValue = priorityOrder[b.priority];
          break;
        default:
          return 0;
      }

      return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
    });

    setFilteredTodos(filtered);
  };

  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const handleCreateTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;

    const todo: Todo = {
      id: generateId(),
      title: newTodo.title,
      description: newTodo.description,
      status: 'pending',
      priority: newTodo.priority,
      createdAt: new Date(),
      expireDate: newTodo.expireDate ? new Date(newTodo.expireDate) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      originalExpireDate: newTodo.expireDate ? new Date(newTodo.expireDate) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      extensionCount: 0,
      tags: newTodo.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    setTodos([...todos, todo]);
    setNewTodo({
      title: '',
      description: '',
      priority: 'medium',
      expireDate: '',
      tags: ''
    });
    setIsDialogOpen(false);
  };

  const handleUpdateTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTodo) return;

    const updatedTodos = todos.map(todo =>
      todo.id === editingTodo.id
        ? { 
            ...todo, 
            title: newTodo.title, 
            description: newTodo.description, 
            priority: newTodo.priority,
            tags: newTodo.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
          }
        : todo
    );

    setTodos(updatedTodos);
    setEditingTodo(null);
    setIsDialogOpen(false);
    setNewTodo({
      title: '',
      description: '',
      priority: 'medium',
      expireDate: '',
      tags: ''
    });
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleStatusChange = (id: string, status: Todo['status']) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, status } : todo
    ));
  };

  const handleExtendExpireDate = (id: string, days: number) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        const newExpireDate = new Date(todo.expireDate);
        newExpireDate.setDate(newExpireDate.getDate() + days);
        
        return {
          ...todo,
          expireDate: newExpireDate,
          lastExtendedDate: new Date(),
          extensionCount: todo.extensionCount + 1
        };
      }
      return todo;
    }));
  };

  const openEditModal = (todo: Todo) => {
    setEditingTodo(todo);
    setNewTodo({
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      expireDate: todo.expireDate.toISOString().split('T')[0],
      tags: todo.tags.join(', ')
    });
    setIsDialogOpen(true);
  };

  const openCreateModal = () => {
    setEditingTodo(null);
    setNewTodo({
      title: '',
      description: '',
      priority: 'medium',
      expireDate: '',
      tags: ''
    });
    setIsDialogOpen(true);
  };

  const getStatusIcon = (status: Todo['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'paused': return <PauseCircle className="w-4 h-4 text-yellow-500" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-blue-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusVariant = (status: Todo['status']) => {
    switch (status) {
      case 'completed': return 'default';
      case 'failed': return 'destructive';
      case 'paused': return 'secondary';
      case 'in-progress': return 'default';
      default: return 'outline';
    }
  };

  const getPriorityVariant = (priority: Todo['priority']) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getDaysUntilExpire = (expireDate: Date): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = expireDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.status === 'completed').length,
    pending: todos.filter(todo => todo.status === 'pending').length,
    inProgress: todos.filter(todo => todo.status === 'in-progress').length,
    expired: todos.filter(todo => getDaysUntilExpire(todo.expireDate) < 0 && todo.status !== 'completed').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Todo Management</h1>
          <p className="text-slate-600">Organize your tasks efficiently with our powerful todo system</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Plus className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">In Progress</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
                </div>
                <Clock className="w-4 h-4 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <PauseCircle className="w-4 h-4 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Expired</p>
                  <p className="text-2xl font-bold text-red-600">{stats.expired}</p>
                </div>
                <XCircle className="w-4 h-4 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
              <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search todos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={openCreateModal} className="shrink-0">
                <Plus className="w-4 h-4 mr-2" />
                Add Todo
              </Button>
            </div>

            {/* Sort Controls */}
            <div className="flex gap-4 mt-4 flex-wrap items-center">
              <span className="text-sm text-slate-600">Sort by:</span>
              <Select value={sortBy} onValueChange={(value: 'created' | 'expire' | 'priority') => setSortBy(value)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="created">Created Date</SelectItem>
                  <SelectItem value="expire">Expire Date</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="w-10 h-10 p-0"
              >
                {sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Todo List */}
        <div className="grid gap-4">
          <AnimatePresence>
            {filteredTodos.map((todo) => {
              const daysUntilExpire = getDaysUntilExpire(todo.expireDate);
              const isExpired = daysUntilExpire < 0;
              
              return (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card className="hover:shadow-md transition-shadow duration-200">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3 flex-wrap">
                              <Badge variant={getStatusVariant(todo.status)} className="gap-1">
                                {getStatusIcon(todo.status)}
                                {todo.status.replace('-', ' ')}
                              </Badge>
                              <h3 className={`text-lg font-semibold ${
                                todo.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-900'
                              }`}>
                                {todo.title}
                              </h3>
                              <Badge variant={getPriorityVariant(todo.priority)}>
                                {todo.priority}
                              </Badge>
                            </div>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => openEditModal(todo)}>
                                  <Edit3 className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteTodo(todo.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <p className="text-slate-600 mb-4">{todo.description}</p>

                          <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>Created: {todo.createdAt.toLocaleDateString()}</span>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span className={isExpired ? 'text-red-600 font-medium' : ''}>
                                Expires: {todo.expireDate.toLocaleDateString()} 
                                ({isExpired ? `Expired ${Math.abs(daysUntilExpire)} days ago` : `${daysUntilExpire} days left`})
                              </span>
                            </div>

                            {todo.extensionCount > 0 && (
                              <Badge variant="outline" className="text-blue-600">
                                Extended {todo.extensionCount} time(s)
                              </Badge>
                            )}
                          </div>

                          {todo.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {todo.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-2 min-w-[200px]">
                          <Select
                            value={todo.status}
                            onValueChange={(value: Todo['status']) => handleStatusChange(todo.id, value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="in-progress">In Progress</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="paused">Paused</SelectItem>
                              <SelectItem value="failed">Failed</SelectItem>
                            </SelectContent>
                          </Select>

                          <div className="flex gap-2">
                            {[1, 3, 7].map((days) => (
                              <Button
                                key={days}
                                variant="outline"
                                size="sm"
                                onClick={() => handleExtendExpireDate(todo.id, days)}
                                className="flex-1"
                              >
                                +{days}d
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredTodos.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-600 mb-2">No todos found</h3>
                <p className="text-slate-500 mb-4">
                  {searchTerm || filterStatus !== 'all' || filterPriority !== 'all' 
                    ? 'Try adjusting your search or filters' 
                    : 'Get started by creating your first todo'}
                </p>
                {/* <Button onClick={openCreateModal}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Todo
                </Button> */}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTodo ? 'Edit Todo' : 'Create New Todo'}</DialogTitle>
            <DialogDescription>
              {editingTodo ? 'Update your todo details' : 'Add a new todo to your list'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={editingTodo ? handleUpdateTodo : handleCreateTodo}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newTodo.title}
                  onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
                  placeholder="Enter todo title"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTodo.description}
                  onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
                  placeholder="Enter todo description"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newTodo.priority}
                    onValueChange={(value: 'low' | 'medium' | 'high') => setNewTodo({...newTodo, priority: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="expireDate">Expire Date</Label>
                  <Input
                    id="expireDate"
                    type="date"
                    value={newTodo.expireDate}
                    onChange={(e) => setNewTodo({...newTodo, expireDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={newTodo.tags}
                  onChange={(e) => setNewTodo({...newTodo, tags: e.target.value})}
                  placeholder="work, urgent, personal"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingTodo ? 'Update Todo' : 'Create Todo'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Todo;
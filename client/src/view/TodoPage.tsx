import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Edit,
  Trash2,
  Calendar,
  Flag,
  Tag,
  Clock,
  MoreVertical,
  CheckCircle,
  PlayCircle,
  PauseCircle,
  XCircle,
  Circle,
  ChevronLeft,
  ChevronRight,
  Eye,
  CalendarPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { sampleTodos } from "@/data/sampleData";
import { TodoData } from "@/types/Forms";

const ITEMS_PER_PAGE = 6;

export default function TodoPage() {
  const [todos, setTodos] = useState<TodoData[]>(sampleTodos);
  const [filteredTodos, setFilteredTodos] = useState<TodoData[]>(sampleTodos);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [tagFilter, setTagFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingTodo, setEditingTodo] = useState<TodoData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingTodo, setViewingTodo] = useState<TodoData | null>(null);
  const [isExtendModalOpen, setIsExtendModalOpen] = useState(false);
  const [extendingTodo, setExtendingTodo] = useState<TodoData | null>(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Get all unique tags for filter
  const allTags = Array.from(new Set(todos.flatMap((todo) => todo.tags)));

  // Filter and search logic
  useEffect(() => {
    let filtered = todos.filter((todo) => {
      const matchesSearch =
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesStatus =
        statusFilter === "all" || todo.status === statusFilter;
      const matchesPriority =
        priorityFilter === "all" || todo.priority === priorityFilter;
      const matchesTag = tagFilter === "all" || todo.tags.includes(tagFilter);

      return matchesSearch && matchesStatus && matchesPriority && matchesTag;
    });

    setFilteredTodos(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [todos, searchTerm, statusFilter, priorityFilter, tagFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredTodos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentTodos = filteredTodos.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Status configuration
  const statusConfig = {
    pending: {
      label: "Pending",
      color: "bg-gray-100 text-gray-800",
      icon: Circle,
    },
    "in-progress": {
      label: "In Progress",
      color: "bg-blue-100 text-blue-800",
      icon: PlayCircle,
    },
    completed: {
      label: "Completed",
      color: "bg-green-100 text-green-800",
      icon: CheckCircle,
    },
    paused: {
      label: "Paused",
      color: "bg-amber-100 text-amber-800",
      icon: PauseCircle,
    },
    failed: {
      label: "Failed",
      color: "bg-red-100 text-red-800",
      icon: XCircle,
    },
  };

  // Priority configuration
  const priorityConfig = {
    low: { label: "Low", color: "bg-green-100 text-green-800" },
    medium: { label: "Medium", color: "bg-amber-100 text-amber-800" },
    high: { label: "High", color: "bg-red-100 text-red-800" },
  };

  // Handlers
  const handleEdit = (todo: TodoData) => {
    setEditingTodo(todo);
    setIsEditModalOpen(true);
  };

  const handleView = (todo: TodoData) => {
    setViewingTodo(todo);
    setIsViewModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleStatusChange = (id: string, newStatus: TodoData["status"]) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo
      )
    );
  };

  const handleSaveEdit = (updatedTodo: TodoData) => {
    setTodos(
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
    setIsEditModalOpen(false);
    setEditingTodo(null);
  };

  const handleExtendTodo = (id: string, newExpireDate: Date) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            expireDate: newExpireDate,
            lastExtendedDate: new Date(),
            extensionCount: todo.extensionCount + 1,
          };
        }
        return todo;
      })
    );
    setIsExtendModalOpen(false);
    setExtendingTodo(null);
  };

  const handleOpenExtendModal = (todo: TodoData) => {
    setExtendingTodo(todo);
    setIsExtendModalOpen(true);
  };

//   const handleAddTodo = (
//     newTodo: Omit<
//       TodoData,
//       "id" | "createdAt" | "originalExpireDate" | "extensionCount"
//     >
//   ) => {
//     const todo: TodoData = {
//       ...newTodo,
//       id: Date.now().toString(),
//       createdAt: new Date(),
//       originalExpireDate: newTodo.expireDate,
//       extensionCount: 0,
//     };
//     setTodos([todo, ...todos]);
//   };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isOverdue = (expireDate: Date) => {
    return new Date(expireDate) < new Date();
  };

  const getDaysUntilDue = (expireDate: Date) => {
    const today = new Date();
    const dueDate = new Date(expireDate);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setPriorityFilter("all");
    setTagFilter("all");
    setIsMobileFiltersOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50/30 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Todo Manager
            </h1>
            {/* Mobile Menu Button */}
            <Sheet
              open={isMobileFiltersOpen}
              onOpenChange={setIsMobileFiltersOpen}
            >
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="sm:hidden">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] max-w-sm">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                      Clear All
                    </Button>
                  </div>

                  <div className="space-y-6 flex-1 overflow-y-auto">
                    {/* Status Filter */}
                    <div>
                      <Label className="text-sm font-medium mb-3 block">
                        Status
                      </Label>
                      <div className="space-y-2">
                        {[
                          "all",
                          "pending",
                          "in-progress",
                          "completed",
                          "paused",
                          "failed",
                        ].map((status) => (
                          <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                              statusFilter === status
                                ? "bg-blue-100 text-blue-700 font-medium"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {status === "all"
                              ? "All Status"
                              : status === "in-progress"
                              ? "In Progress"
                              : status.charAt(0).toUpperCase() +
                                status.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Priority Filter */}
                    <div>
                      <Label className="text-sm font-medium mb-3 block">
                        Priority
                      </Label>
                      <div className="space-y-2">
                        {["all", "high", "medium", "low"].map((priority) => (
                          <button
                            key={priority}
                            onClick={() => setPriorityFilter(priority)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                              priorityFilter === priority
                                ? "bg-blue-100 text-blue-700 font-medium"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {priority === "all"
                              ? "All Priority"
                              : priority.charAt(0).toUpperCase() +
                                priority.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tag Filter */}
                    <div>
                      <Label className="text-sm font-medium mb-3 block">
                        Tags
                      </Label>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        <button
                          onClick={() => setTagFilter("all")}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            tagFilter === "all"
                              ? "bg-blue-100 text-blue-700 font-medium"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          All Tags
                        </button>
                        {allTags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => setTagFilter(tag)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                              tagFilter === tag
                                ? "bg-blue-100 text-blue-700 font-medium"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button
                      className="w-full"
                      onClick={() => setIsMobileFiltersOpen(false)}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <p className="text-sm sm:text-base text-gray-600">
            Manage your tasks efficiently with search, filters, and pagination
          </p>
        </div>

        {/* Stats Cards - Mobile Optimized */}
        <div className="mb-6 sm:mb-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="sm:min-w-0  ">
            <CardContent className="p-3 sm:p-6">
                <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">
                    Total Tasks
                    </p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">
                    {todos.length}
                    </p>
                </div>
                <div className="p-2 sm:p-3 bg-blue-100 rounded-lg">
                    <ClipboardList className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                </div>
            </CardContent>
            </Card>

            <Card className="sm:min-w-0">
            <CardContent className="p-3 sm:p-6">
                <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">
                    {todos.filter((t) => t.status === "pending").length}
                    </p>
                </div>
                <div className="p-2 sm:p-3 bg-amber-100 rounded-lg">
                    <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-amber-600" />
                </div>
                </div>
            </CardContent>
            </Card>

            <Card className="sm:min-w-0">
            <CardContent className="p-3 sm:p-6">
                <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">
                    In Progress
                    </p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">
                    {todos.filter((t) => t.status === "in-progress").length}
                    </p>
                </div>
                <div className="p-2 sm:p-3 bg-blue-100 rounded-lg">
                    <PlayCircle className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                </div>
            </CardContent>
            </Card>

            <Card className="sm:min-w-0">
            <CardContent className="p-3 sm:p-6">
                <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">
                    Extended
                    </p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">
                    {todos.filter((t) => t.extensionCount > 0).length}
                    </p>
                </div>
                <div className="p-2 sm:p-3 bg-purple-100 rounded-lg">
                    <CalendarPlus className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
                </div>
                </div>
            </CardContent>
            </Card>
        </div>
        </div>


        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search tasks by title, description, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Desktop Filters - Hidden on Mobile */}
              <div className=" sm:flex flex-col sm:flex-row gap-3 grid grid-cols-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <Filter className="w-4 h-4 mr-2" />
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

                <Select
                  value={priorityFilter}
                  onValueChange={setPriorityFilter}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <Flag className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={tagFilter} onValueChange={setTagFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <Tag className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Tags" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tags</SelectItem>
                    {allTags.map((tag) => (
                      <SelectItem key={tag} value={tag}>
                        {tag}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Todo Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-6 sm:mb-8">
          <AnimatePresence>
            {currentTodos.map((todo) => {
              const StatusIcon = statusConfig[todo.status].icon;
              const isTodoOverdue = isOverdue(todo.expireDate);
              const daysUntilDue = getDaysUntilDue(todo.expireDate);

              return (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    className={`h-full transition-all hover:shadow-md ${
                      isTodoOverdue && todo.status !== "completed"
                        ? "border-red-200 bg-red-50/50"
                        : ""
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 mr-2">
                          <CardTitle className="text-base sm:text-lg font-semibold line-clamp-2 mb-2">
                            {todo.title}
                          </CardTitle>

                          <div className="flex flex-wrap gap-1 sm:gap-2 mb-2">
                            <Badge
                              variant="secondary"
                              className={`text-xs ${
                                statusConfig[todo.status].color
                              }`}
                            >
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {statusConfig[todo.status].label}
                            </Badge>
                            <Badge
                              variant="secondary"
                              className={`text-xs ${
                                priorityConfig[todo.priority].color
                              }`}
                            >
                              {priorityConfig[todo.priority].label}
                            </Badge>
                            {todo.extensionCount > 0 && (
                              <Badge
                                variant="secondary"
                                className="text-xs bg-purple-100 text-purple-800"
                              >
                                <CalendarPlus className="w-3 h-3 mr-1" />
                                Extended
                              </Badge>
                            )}
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleView(todo)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(todo)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleOpenExtendModal(todo)}
                            >
                              <CalendarPlus className="w-4 h-4 mr-2" />
                              Extend Due Date
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDelete(todo.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <p className="text-sm text-gray-600 line-clamp-2">
                        {todo.description}
                      </p>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        {/* Due Date */}
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Due Date:</span>
                          <div className="text-right">
                            <span
                              className={`font-medium text-sm ${
                                isTodoOverdue && todo.status !== "completed"
                                  ? "text-red-600"
                                  : "text-gray-900"
                              }`}
                            >
                              {formatDate(todo.expireDate)}
                            </span>
                            <div className="text-xs text-gray-500">
                              {isTodoOverdue && todo.status !== "completed" ? (
                                <span className="text-red-500">
                                  Overdue by {Math.abs(daysUntilDue)} days
                                </span>
                              ) : (
                                <span>{daysUntilDue} days remaining</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Extension Info */}
                        {todo.extensionCount > 0 && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Extensions:</span>
                            <span className="font-medium text-purple-600 text-sm">
                              {todo.extensionCount} time
                              {todo.extensionCount !== 1 ? "s" : ""}
                            </span>
                          </div>
                        )}

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {todo.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Quick Actions */}
                        <div className="gap-2 pt-2 grid grid-cols-2 sm:grid-cols-3">
                          {todo.status !== "completed" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs h-7"
                              onClick={() =>
                                handleStatusChange(todo.id, "completed")
                              }
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Complete
                            </Button>
                          )}
                          {todo.status !== "in-progress" &&
                            todo.status !== "completed" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs h-7"
                                onClick={() =>
                                  handleStatusChange(todo.id, "in-progress")
                                }
                              >
                                <PlayCircle className="w-3 h-3 mr-1" />
                                Start
                              </Button>
                            )}
                          {todo.status !== "completed" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs h-7"
                              onClick={() => handleOpenExtendModal(todo)}
                            >
                              <CalendarPlus className="w-3 h-3 mr-1" />
                              Extend
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {currentTodos.length === 0 && (
          <Card>
            <CardContent className="p-8 sm:p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Search className="w-10 h-10 sm:w-12 sm:h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No tasks found
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {searchTerm ||
                statusFilter !== "all" ||
                priorityFilter !== "all" ||
                tagFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Get started by creating your first task"}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 text-center sm:text-left">
              Showing {startIndex + 1}-
              {Math.min(startIndex + ITEMS_PER_PAGE, filteredTodos.length)} of{" "}
              {filteredTodos.length} tasks
            </p>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex-1 sm:flex-none"
              >
                <ChevronLeft className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Previous</span>
              </Button>
              <div className="flex items-center px-4">
                <span className="text-sm text-gray-600">
                  {currentPage} of {totalPages}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="flex-1 sm:flex-none"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4 ml-1 sm:ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Modals */}
        <EditTodoModal
          todo={editingTodo}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingTodo(null);
          }}
          onSave={handleSaveEdit}
        />

        <ViewTodoModal
          todo={viewingTodo}
          isOpen={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false);
            setViewingTodo(null);
          }}
          onStatusChange={handleStatusChange}
          onExtend={handleOpenExtendModal}
        />

        <ExtendTodoModal
          todo={extendingTodo}
          isOpen={isExtendModalOpen}
          onClose={() => {
            setIsExtendModalOpen(false);
            setExtendingTodo(null);
          }}
          onExtend={handleExtendTodo}
        />
      </div>
    </div>
  );
}

// Edit Todo Modal Component - Made responsive
function EditTodoModal({
  todo,
  isOpen,
  onClose,
  onSave,
}: {
  todo: TodoData | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (todo: TodoData) => void;
}) {
  const [formData, setFormData] = useState<TodoData | null>(null);

  useEffect(() => {
    if (todo) {
      setFormData(todo);
    }
  }, [todo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
    }
  };

  if (!formData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl w-full mx-2 sm:mx-0">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Edit Todo</DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Update the task details below.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-h-[70vh] overflow-y-auto"
        >
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-sm sm:text-base">
                Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                className="text-sm sm:text-base"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description" className="text-sm sm:text-base">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="text-sm sm:text-base resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="status" className="text-sm sm:text-base">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: TodoData["status"]) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger className="text-sm sm:text-base">
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
              </div>

              <div className="grid gap-2">
                <Label htmlFor="priority" className="text-sm sm:text-base">
                  Priority
                </Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value: TodoData["priority"]) =>
                    setFormData({ ...formData, priority: value })
                  }
                >
                  <SelectTrigger className="text-sm sm:text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="expireDate" className="text-sm sm:text-base">
                Due Date
              </Label>
              <Input
                id="expireDate"
                type="date"
                value={
                  new Date(formData.expireDate).toISOString().split("T")[0]
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    expireDate: new Date(e.target.value),
                  })
                }
                className="text-sm sm:text-base"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="tags" className="text-sm sm:text-base">
                Tags (comma separated)
              </Label>
              <Input
                id="tags"
                value={formData.tags.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tags: e.target.value.split(",").map((tag) => tag.trim()),
                  })
                }
                placeholder="work, urgent, personal"
                className="text-sm sm:text-base"
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// View Todo Modal Component - Made responsive
function ViewTodoModal({
  todo,
  isOpen,
  onClose,
  onStatusChange,
  onExtend,
}: {
  todo: TodoData | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (id: string, status: TodoData["status"]) => void;
  onExtend: (todo: TodoData) => void;
}) {
  if (!todo) return null;

  const statusConfig = {
    pending: {
      label: "Pending",
      color: "bg-gray-100 text-gray-800",
      icon: Circle,
    },
    "in-progress": {
      label: "In Progress",
      color: "bg-blue-100 text-blue-800",
      icon: PlayCircle,
    },
    completed: {
      label: "Completed",
      color: "bg-green-100 text-green-800",
      icon: CheckCircle,
    },
    paused: {
      label: "Paused",
      color: "bg-amber-100 text-amber-800",
      icon: PauseCircle,
    },
    failed: {
      label: "Failed",
      color: "bg-red-100 text-red-800",
      icon: XCircle,
    },
  };

  const priorityConfig = {
    low: { label: "Low", color: "bg-green-100 text-green-800" },
    medium: { label: "Medium", color: "bg-amber-100 text-amber-800" },
    high: { label: "High", color: "bg-red-100 text-red-800" },
  };

  const StatusIcon = statusConfig[todo.status].icon;
  const isOverdue = new Date(todo.expireDate) < new Date();
  const daysUntilDue = Math.ceil(
    (new Date(todo.expireDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl w-full mx-2 sm:mx-0 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <ClipboardList className="w-5 h-5" />
            Task Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              {todo.title}
            </h2>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge
                variant="secondary"
                className={statusConfig[todo.status].color}
              >
                <StatusIcon className="w-3 h-3 mr-1" />
                {statusConfig[todo.status].label}
              </Badge>
              <Badge
                variant="secondary"
                className={priorityConfig[todo.priority].color}
              >
                {priorityConfig[todo.priority].label}
              </Badge>
              {todo.extensionCount > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-800"
                >
                  <CalendarPlus className="w-3 h-3 mr-1" />
                  Extended {todo.extensionCount} time
                  {todo.extensionCount !== 1 ? "s" : ""}
                </Badge>
              )}
              {isOverdue && todo.status !== "completed" && (
                <Badge variant="secondary" className="bg-red-100 text-red-800">
                  Overdue by {Math.abs(daysUntilDue)} days
                </Badge>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
              Description
            </h3>
            <p className="text-gray-700 bg-gray-50 p-3 sm:p-4 rounded-lg text-sm sm:text-base">
              {todo.description || "No description provided."}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-1 flex items-center gap-2 text-sm sm:text-base">
                  <Calendar className="w-4 h-4" />
                  Dates
                </h4>
                <div className="space-y-1 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created:</span>
                    <span>{new Date(todo.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Original Due Date:</span>
                    <span>
                      {new Date(todo.originalExpireDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Due Date:</span>
                    <span
                      className={
                        isOverdue && todo.status !== "completed"
                          ? "text-red-600 font-medium"
                          : "text-gray-900"
                      }
                    >
                      {new Date(todo.expireDate).toLocaleDateString()}
                    </span>
                  </div>
                  {todo.lastExtendedDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Extended:</span>
                      <span>
                        {new Date(todo.lastExtendedDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-1 flex items-center gap-2 text-sm sm:text-base">
                  <Tag className="w-4 h-4" />
                  Tags
                </h4>
                <div className="flex flex-wrap gap-1">
                  {todo.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">
                  Quick Actions
                </h4>
                <div className="flex flex-wrap gap-2">
                  {todo.status !== "completed" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => onStatusChange(todo.id, "completed")}
                        className="text-xs"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Mark Complete
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onExtend(todo)}
                        className="text-xs"
                      >
                        <CalendarPlus className="w-3 h-3 mr-1" />
                        Extend Due Date
                      </Button>
                    </>
                  )}
                  {todo.status !== "in-progress" &&
                    todo.status !== "completed" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onStatusChange(todo.id, "in-progress")}
                        className="text-xs"
                      >
                        <PlayCircle className="w-3 h-3 mr-1" />
                        Start Task
                      </Button>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose} className="w-full sm:w-auto">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Extend Todo Modal Component - Made responsive
function ExtendTodoModal({
  todo,
  isOpen,
  onClose,
  onExtend,
}: {
  todo: TodoData | null;
  isOpen: boolean;
  onClose: () => void;
  onExtend: (id: string, newExpireDate: Date) => void;
}) {
  const [customDate, setCustomDate] = useState("");

  useEffect(() => {
    if (todo) {
      // Set default custom date to current expire date + 7 days
      const newDate = new Date(todo.expireDate);
      newDate.setDate(newDate.getDate() + 7);
      setCustomDate(newDate.toISOString().split("T")[0]);
    }
  }, [todo]);

  const handleQuickExtend = (days: number) => {
    if (todo) {
      const newExpireDate = new Date(todo.expireDate);
      newExpireDate.setDate(newExpireDate.getDate() + days);
      onExtend(todo.id, newExpireDate);
    }
  };

  const handleCustomExtend = () => {
    if (todo && customDate) {
      onExtend(todo.id, new Date(customDate));
    }
  };

  if (!todo) return null;

  const currentDueDate = new Date(todo.expireDate);
  const quickExtensions = [
    { days: 1, label: "1 day" },
    { days: 3, label: "3 days" },
    { days: 7, label: "1 week" },
    { days: 14, label: "2 weeks" },
    { days: 21, label: "3 weeks" },
    { days: 30, label: "1 month" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-md w-full mx-2 sm:mx-0">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <CalendarPlus className="w-5 h-5" />
            Extend Due Date
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Extend the due date for: <strong>{todo.title}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Current Due Date Info */}
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <div className="text-sm text-gray-600">Current due date:</div>
            <div className="text-base sm:text-lg font-semibold text-gray-900">
              {currentDueDate.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            {todo.extensionCount > 0 && (
              <div className="text-sm text-purple-600 mt-1">
                This task has been extended {todo.extensionCount} time
                {todo.extensionCount !== 1 ? "s" : ""}
              </div>
            )}
          </div>

          {/* Quick Extensions */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-sm sm:text-base">
              Quick Extensions
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {quickExtensions.map((extension) => {
                const newDate = new Date(currentDueDate);
                newDate.setDate(newDate.getDate() + extension.days);

                return (
                  <Button
                    key={extension.days}
                    variant="outline"
                    className="h-auto py-2 sm:py-3 flex flex-col text-xs"
                    onClick={() => handleQuickExtend(extension.days)}
                  >
                    <span className="font-medium">{extension.label}</span>
                    <span className="text-gray-500 mt-1">
                      {newDate.toLocaleDateString("short")}
                    </span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Custom Date Extension */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-sm sm:text-base">
              Custom Date
            </h4>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="date"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="flex-1 text-sm sm:text-base"
              />
              <Button
                onClick={handleCustomExtend}
                disabled={!customDate}
                className="sm:w-auto"
              >
                Apply
              </Button>
            </div>
          </div>

          {/* Extension History */}
          {todo.extensionCount > 0 && todo.lastExtendedDate && (
            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">
                Extension History
              </h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>
                  Original due date:{" "}
                  {new Date(todo.originalExpireDate).toLocaleDateString()}
                </div>
                <div>
                  Last extended:{" "}
                  {new Date(todo.lastExtendedDate).toLocaleDateString()}
                </div>
                <div>Total extensions: {todo.extensionCount}</div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Add the missing ClipboardList icon component
function ClipboardList(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </svg>
  );
}

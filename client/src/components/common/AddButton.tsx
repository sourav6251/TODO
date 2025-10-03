import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Plus, ClipboardList, Lightbulb, KeyRound, X, Globe, User,
  Calendar, Tag, AlertCircle, Clock, Flag
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CreateCredentials, CreateIdeas, CreateTodo } from "@/types/Forms";

type MenuItem = "todo" | "ideas" | "credentials";

type Position = "br" | "bl" | "tr" | "tl";

interface Props {
  onSelect?: (item: MenuItem, data: any) => void;
  position?: Position;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary" | "secondary";
}

// interface CreateCredentials {
//   url: string;
//   username: string;
//   description: string;
// }

const menuItems = [
  {
    id: "todo" as MenuItem,
    label: "Todo",
    icon: ClipboardList,
    description: "Create a new task",
    color: "text-blue-600"
  },
  {
    id: "ideas" as MenuItem,
    label: "Ideas",
    icon: Lightbulb,
    description: "Save your inspiration",
    color: "text-amber-600"
  },
  {
    id: "credentials" as MenuItem,
    label: "Credentials",
    icon: KeyRound,
    description: "Store secure information",
    color: "text-green-600"
  }
];

export default function AddMenuButton({ 
  onSelect, 
  position = "br", 
  className = "",
  size = "md",
  variant = "primary"
}: Props) {
  const [open, setOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<MenuItem | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    function handleDocumentClick(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscapeKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (activeModal) {
          setActiveModal(null);
        } else {
          setOpen(false);
        }
      }
    }

    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("keydown", handleEscapeKey);
    
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isMounted, activeModal]);

  const handleSelect = (item: MenuItem) => {
    setOpen(false);
    setActiveModal(item);
  };

  const handleFormSubmit = (data: any) => {
    onSelect?.(activeModal!, data);
    setActiveModal(null);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const positionClasses = {
    br: "bottom-6 right-6",
    bl: "bottom-6 left-6",
    tr: "top-6 right-6",
    tl: "top-6 left-6",
  }[position];

  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-16 h-16"
  }[size];

  const variantClasses = {
    default: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/25",
    secondary: "bg-gradient-to-br from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/25"
  }[variant];

  const iconSize = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-7 h-7"
  }[size];

  if (!isMounted) return null;

  return (
    <>
      <div 
        ref={rootRef} 
        className={`fixed ${positionClasses} z-50 ${className}`}
      >
        <div className="relative flex flex-col items-center">
          <AnimatePresence mode="wait">
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 25,
                  duration: 0.15
                }}
                className="absolute bottom-full mb-3 w-64 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200/60"
                role="menu"
                aria-label="Add menu"
                style={{
                  [position.includes('b') ? 'bottom' : 'top']: '100%',
                  [position.includes('r') ? 'right' : 'left']: '0',
                  marginBottom: position.includes('b') ? '0.75rem' : '0',
                  marginTop: position.includes('t') ? '0.75rem' : '0',
                }}
              >
                <div className="p-2">
                  {menuItems.map((item, index) => (
                    <MenuButton 
                      key={item.id}
                      item={item}
                      index={index}
                      onClick={() => handleSelect(item.id)}
                    />
                  ))}
                </div>
                
                <div className="px-3 py-2 border-t border-gray-100/60">
                  <p className="text-xs text-gray-500 text-center">
                    What would you like to create?
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            layout={false}
          >
            <Button
              onClick={() => setOpen((prev) => !prev)}
              className={`
                rounded-full p-0 flex items-center justify-center 
                transition-all duration-200 ease-out
                ${sizeClasses} ${variantClasses}
                border-0 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                relative overflow-hidden
              `}
              aria-haspopup="true"
              aria-expanded={open}
              aria-label={open ? "Close add menu" : "Open add menu"}
              style={{ transform: 'none' }}
            >
              <motion.span
                className="absolute inset-0 bg-white/20 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: open ? 1 : 0, opacity: open ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
              
              <motion.span
                animate={{ rotate: open ? 135 : 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 22 
                }}
                className="flex items-center justify-center relative z-10"
                aria-hidden
                style={{ transform: 'none' }}
              >
                <Plus className={iconSize} />
              </motion.span>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Redesigned Todo Dialog */}
      <TodoDialog 
        open={activeModal === "todo"} 
        onOpenChange={(open) => !open && setActiveModal(null)}
        onSubmit={handleFormSubmit}
      />

      {/* Ideas and Credentials Modals */}
      <AnimatePresence>
        {(activeModal === "ideas" || activeModal === "credentials") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 400 }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {activeModal === "ideas" && (
                <IdeasForm onSubmit={handleFormSubmit} onClose={handleCloseModal} />
              )}
              {activeModal === "credentials" && (
                <CredentialsForm onSubmit={handleFormSubmit} onClose={handleCloseModal} />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Redesigned Todo Dialog Component
function TodoDialog({ 
  open, 
  onOpenChange, 
  onSubmit 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateTodo) => void;
}) {
  const [newTodo, setNewTodo] = useState<Omit<CreateTodo, 'tags'> & { tagInput: string }>({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    expireDate: "",
    tagInput: ""
  });

  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.title.trim()) {
      const todoData: CreateTodo = {
        ...newTodo,
        tags: tags
      };
      onSubmit(todoData);
      // Reset form
      setNewTodo({
        title: "",
        description: "",
        status: "pending",
        priority: "medium",
        expireDate: "",
        tagInput: ""
      });
      setTags([]);
    }
  };

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      // Reset form when dialog closes
      setNewTodo({
        title: "",
        description: "",
        status: "pending",
        priority: "medium",
        expireDate: "",
        tagInput: ""
      });
      setTags([]);
    }
  };

  const addTag = () => {
    const tag = newTodo.tagInput.trim();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setNewTodo({ ...newTodo, tagInput: "" });
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const priorityOptions = [
    { value: "low" as const, label: "Low", color: "text-green-600", bgColor: "bg-green-100" },
    { value: "medium" as const, label: "Medium", color: "text-amber-600", bgColor: "bg-amber-100" },
    { value: "high" as const, label: "High", color: "text-red-600", bgColor: "bg-red-100" }
  ];

  const statusOptions = [
    { value: "pending" as const, label: "Pending", color: "text-gray-600", bgColor: "bg-gray-100" },
    { value: "in-progress" as const, label: "In Progress", color: "text-blue-600", bgColor: "bg-blue-100" },
    { value: "completed" as const, label: "Completed", color: "text-green-600", bgColor: "bg-green-100" },
    { value: "paused" as const, label: "Paused", color: "text-amber-600", bgColor: "bg-amber-100" },
    { value: "failed" as const, label: "Failed", color: "text-red-600", bgColor: "bg-red-100" }
  ];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ClipboardList className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Create New Todo
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Organize your tasks with details and priorities
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="space-y-6">
            {/* Title Section */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <span>Task Title</span>
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={newTodo.title}
                onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
                placeholder="What needs to be done?"
                className="h-12 text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            
            {/* Description Section */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <span>Description</span>
                <AlertCircle className="w-4 h-4 text-gray-400" />
              </Label>
              <Textarea
                id="description"
                value={newTodo.description}
                onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
                placeholder="Add more details about this task..."
                rows={3}
                className="resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            {/* Status & Priority Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>Status</span>
                </Label>
                <Select
                  value={newTodo.status}
                  onValueChange={(value: "pending" | "in-progress" | "completed" | "paused" | "failed") => 
                    setNewTodo({...newTodo, status: value})
                  }
                >
                  <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${option.bgColor}`} />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Priority */}
              <div className="space-y-2">
                <Label htmlFor="priority" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Flag className="w-4 h-4 text-gray-500" />
                  <span>Priority</span>
                </Label>
                <Select
                  value={newTodo.priority}
                  onValueChange={(value: 'low' | 'medium' | 'high') => 
                    setNewTodo({...newTodo, priority: value})
                  }
                >
                  <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priorityOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${option.bgColor}`} />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Due Date */}
            <div className="space-y-2">
              <Label htmlFor="expireDate" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>Due Date</span>
              </Label>
              <Input
                id="expireDate"
                type="date"
                value={newTodo.expireDate}
                onChange={(e) => setNewTodo({...newTodo, expireDate: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            </div>
            
            
            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tags" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Tag className="w-4 h-4 text-gray-500" />
                <span>Tags</span>
              </Label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    id="tags"
                    value={newTodo.tagInput}
                    onChange={(e) => setNewTodo({...newTodo, tagInput: e.target.value})}
                    onKeyDown={handleTagInputKeyDown}
                    placeholder="Add a tag and press Enter"
                    className="flex-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={addTag}
                    className="whitespace-nowrap"
                  >
                    Add Tag
                  </Button>
                </div>
                
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 hover:text-blue-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter className="px-0 pb-0 pt-6 mt-6 border-t border-gray-100">
            <div className="flex w-full gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="flex-1 border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/25"
                disabled={!newTodo.title.trim()}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Todo
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Ideas Form Component (unchanged)
function IdeasForm({ onSubmit, onClose }: { onSubmit: (data: CreateIdeas) => void; onClose: () => void }) {
  const [formData, setFormData] = useState<CreateIdeas>({
    title: "",
    description: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-600" />
          Save New Idea
        </h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="Enter idea title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="Describe your idea in detail..."
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-amber-600 hover:bg-amber-700"
          >
            Save Idea
          </Button>
        </div>
      </form>
    </div>
  );
}

// Credentials Form Component (unchanged)
function CredentialsForm({ onSubmit, onClose }: { onSubmit: (data: CreateCredentials) => void; onClose: () => void }) {
  const [formData, setFormData] = useState<CreateCredentials>({
    url: "",
    username: "",
    description: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.username.trim()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-green-600" />
          Store Credentials
        </h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="https://example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username/Email *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter username or email"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Additional notes about these credentials"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            Save Credentials
          </Button>
        </div>
      </form>
    </div>
  );
}

interface MenuButtonProps {
  item: typeof menuItems[0];
  index: number;
  onClick: () => void;
}

function MenuButton({ item, index, onClick }: MenuButtonProps) {
  const IconComponent = item.icon;
  
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      role="menuitem"
      className="
        w-full text-left p-3 rounded-lg 
        hover:bg-gray-50/80 active:bg-gray-100
        transition-all duration-200 ease-out
        flex items-center space-x-3
        group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset
      "
    >
      <div className={`
        p-2 rounded-lg bg-gray-100/60 
        group-hover:scale-110 transition-transform duration-200
        ${item.color}
      `}>
        <IconComponent className="w-4 h-4" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-900 group-hover:text-gray-700">
            {item.label}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-0.5">
          {item.description}
        </p>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.05 + 0.1 }}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Plus className="w-4 h-4 text-gray-400" />
      </motion.div>
    </motion.button>
  );
}
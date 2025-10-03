import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  Search, Filter, Edit, Trash2,  Calendar, 
  Clock, MoreVertical, Eye, Lightbulb, Sparkles,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { sampleIdeas } from '@/data/sampleData';
import { IdeasData } from '@/types/Forms';

const ITEMS_PER_PAGE = 6;

// Animation variants with proper TypeScript typing
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const cardHoverVariants: Variants = {
  rest: { 
    scale: 1,
    y: 0,
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
  },
  hover: { 
    scale: 1.02,
    y: -4,
    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
};

const statsVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      delay: 0.2
    }
  }
};

const modalVariants: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.8,
    y: 20
  },
  visible: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: -20,
    transition: {
      duration: 0.2
    }
  }
};

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

// Alternative approach if you want to define custom variant types
// interface CustomVariants {
//   [key: string]: {
//     opacity?: number;
//     scale?: number;
//     y?: number;
//     x?: number;
//     rotate?: number | number[];
//     transition?: {
//       duration?: number;
//       delay?: number;
//       type?: string;
//       stiffness?: number;
//       damping?: number;
//       ease?: string;
//       staggerChildren?: number;
//     };
//     boxShadow?: string;
//   };
// }

// You can use this CustomVariants interface as an alternative:
// const pageVariants: CustomVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       duration: 0.6,
//       staggerChildren: 0.1
//     }
//   }
// };

export default function IdeasPage() {
  const [ideas, setIdeas] = useState<IdeasData[]>(sampleIdeas);
  const [filteredIdeas, setFilteredIdeas] = useState<IdeasData[]>(sampleIdeas);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingIdea, setEditingIdea] = useState<IdeasData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingIdea, setViewingIdea] = useState<IdeasData | null>(null);

  // Filter and search logic
  useEffect(() => {
    let filtered = ideas.filter(idea => {
      const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           idea.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });

    // Sort ideas
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createAt).getTime() - new Date(a.createAt).getTime();
        case 'oldest':
          return new Date(a.createAt).getTime() - new Date(b.createAt).getTime();
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    setFilteredIdeas(filtered);
    setCurrentPage(1);
  }, [ideas, searchTerm, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredIdeas.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentIdeas = filteredIdeas.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Handlers
  const handleEdit = (idea: IdeasData) => {
    setEditingIdea(idea);
    setIsEditModalOpen(true);
  };

  const handleView = (idea: IdeasData) => {
    setViewingIdea(idea);
    setIsViewModalOpen(true);
  };

  const handleDelete = (ideaToDelete: IdeasData) => {
    setIdeas(ideas.filter(idea => idea !== ideaToDelete));
  };

  const handleSaveEdit = (updatedIdea: IdeasData) => {
    setIdeas(ideas.map(idea => 
      idea === editingIdea ? updatedIdea : idea
    ));
    setIsEditModalOpen(false);
    setEditingIdea(null);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - new Date(date).getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <motion.div 
      className="min-h-screen bg-amber-50/30 p-4 sm:p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div className="mb-6 sm:mb-8" variants={itemVariants}>
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Ideas Hub</h1>
          </div>
          <p className="text-sm sm:text-base text-gray-600">
            Capture, organize, and develop your brilliant ideas in one place
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="mb-6 sm:mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { 
                title: "Total Ideas", 
                value: ideas.length, 
                icon: Lightbulb, 
                color: "amber",
                delay: 0
              },
              { 
                title: "This Week", 
                value: ideas.filter(idea => {
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return new Date(idea.createAt) > weekAgo;
                }).length, 
                icon: Sparkles, 
                color: "green",
                delay: 0.1
              },
              { 
                title: "This Month", 
                value: ideas.filter(idea => {
                  const monthAgo = new Date();
                  monthAgo.setMonth(monthAgo.getMonth() - 1);
                  return new Date(idea.createAt) > monthAgo;
                }).length, 
                icon: Calendar, 
                color: "blue",
                delay: 0.2
              },
              { 
                title: "Avg. Length", 
                value: Math.round(ideas.reduce((acc, idea) => acc + idea.description.length, 0) / ideas.length) || 0, 
                icon: Clock, 
                color: "purple",
                delay: 0.3
              }
            ].map((stat) => (
              <motion.div
                key={stat.title}
                variants={statsVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: stat.delay }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
              >
                <Card className="sm:min-w-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-3 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-600">
                          {stat.title}
                        </p>
                        <p className="text-lg sm:text-2xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                      </div>
                      <div className={`p-2 sm:p-3 bg-${stat.color}-100 rounded-lg`}>
                        <stat.icon className={`w-4 h-4 sm:w-6 sm:h-6 text-${stat.color}-600`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div variants={itemVariants}>
          <Card className="mb-6 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search ideas by title or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 text-sm sm:text-base"
                    />
                  </div>
                </div>

                {/* Desktop Filters */}
                <div className="sm:flex flex-col sm:flex-row gap-3 grid grid-cols-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="title-asc">Title A-Z</SelectItem>
                      <SelectItem value="title-desc">Title Z-A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Ideas Grid */}
        <motion.div 
          className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-6 sm:mb-8"
          variants={containerVariants}
        >
          <AnimatePresence mode="popLayout">
            {currentIdeas.map((idea, index) => (
              <motion.div
                key={`${idea.title}-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.05,
                  layout: { type: "spring", stiffness: 300, damping: 30 }
                }}
                whileHover="hover"
              >
                <motion.div
                  variants={cardHoverVariants}
                  initial="rest"
                  whileHover="hover"
                  className="h-full"
                >
                  <Card className="h-full transition-all bg-white/90 backdrop-blur-sm hover:bg-white">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 mr-2">
                          <CardTitle className="text-base sm:text-lg font-semibold line-clamp-2 mb-2 text-gray-900">
                            {idea.title}
                          </CardTitle>
                          <Badge variant="secondary" className="bg-amber-100 text-amber-800 text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {getTimeAgo(idea.createAt)}
                          </Badge>
                        </div>
                        
                        <motion.div whileTap={{ scale: 0.95 }}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleView(idea)}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEdit(idea)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => handleDelete(idea)}
                                className="text-red-600"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </motion.div>
                      </div>
                      
                      <p className="text-sm text-gray-600 line-clamp-3 mt-2">
                        {idea.description}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Created: {formatDate(idea.createAt)}</span>
                        <span className="flex items-center">
                          <Lightbulb className="w-3 h-3 mr-1 text-amber-500" />
                          {idea.description.length > 100 ? 'Detailed' : 'Brief'}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        <AnimatePresence>
          {currentIdeas.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 sm:p-12 text-center">
                  <motion.div 
                    className="text-gray-400 mb-4"
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <Lightbulb className="w-16 h-16 mx-auto text-amber-200" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No ideas found</h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-4">
                    {searchTerm
                      ? 'Try adjusting your search terms'
                      : 'Get started by capturing your first brilliant idea'}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-between gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm text-gray-600 text-center sm:text-left">
              Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredIdeas.length)} of {filteredIdeas.length} ideas
            </p>
            <div className="flex gap-2 w-full sm:w-auto">
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="flex-1 sm:flex-none"
                >
                  <ChevronLeft className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Previous</span>
                </Button>
              </motion.div>
              <div className="flex items-center px-4">
                <span className="text-sm text-gray-600">
                  {currentPage} of {totalPages}
                </span>
              </div>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="flex-1 sm:flex-none"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4 ml-1 sm:ml-2" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Modals */}
        <EditIdeaModal
          idea={editingIdea}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingIdea(null);
          }}
          onSave={handleSaveEdit}
        />

        <ViewIdeaModal
          idea={viewingIdea}
          isOpen={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false);
            setViewingIdea(null);
          }}
        />
      </div>
    </motion.div>
  );
}

// Edit Idea Modal Component
function EditIdeaModal({ 
  idea, 
  isOpen, 
  onClose, 
  onSave 
}: { 
  idea: IdeasData | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (idea: IdeasData) => void;
}) {
  const [formData, setFormData] = useState<Omit<IdeasData, 'createAt'> | null>(null);

  useEffect(() => {
    if (idea) {
      setFormData({
        title: idea.title,
        description: idea.description
      });
    }
  }, [idea]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData && idea) {
      onSave({
        ...formData,
        createAt: idea.createAt
      });
    }
  };

  if (!formData) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <motion.div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          />
          <motion.div
            className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl flex items-center gap-2">
                <Edit className="w-5 h-5" />
                Edit Idea
              </DialogTitle>
              <DialogDescription className="text-sm sm:text-base">
                Update your idea details below.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title" className="text-sm sm:text-base">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                    className="text-sm sm:text-base"
                    placeholder="Enter a compelling title for your idea..."
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description" className="text-sm sm:text-base">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={6}
                    className="text-sm sm:text-base resize-none"
                    placeholder="Describe your idea in detail. What problem does it solve? How does it work? What makes it unique?"
                  />
                </div>
              </div>
              
              <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                <motion.div whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Button type="button" variant="outline" onClick={onClose} className="w-full">
                    Cancel
                  </Button>
                </motion.div>
                <motion.div whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">
                    Save Changes
                  </Button>
                </motion.div>
              </DialogFooter>
            </form>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

// View Idea Modal Component
function ViewIdeaModal({
  idea,
  isOpen,
  onClose
}: {
  idea: IdeasData | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!idea) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <motion.div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          />
          <motion.div
            className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg max-h-[90vh] overflow-y-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Lightbulb className="w-5 h-5 text-amber-600" />
                Idea Details
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{idea.title}</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                    <Calendar className="w-3 h-3 mr-1" />
                    Created {new Date(idea.createAt).toLocaleDateString()}
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    <Clock className="w-3 h-3 mr-1" />
                    {idea.description.length > 200 ? 'Detailed' : idea.description.length > 100 ? 'Medium' : 'Brief'}
                  </Badge>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Description</h3>
                <p className="text-gray-700 bg-amber-50/50 p-3 sm:p-4 rounded-lg text-sm sm:text-base leading-relaxed">
                  {idea.description || 'No description provided.'}
                </p>
              </motion.div>

              {/* Metadata */}
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1 flex items-center gap-2 text-sm sm:text-base">
                      <Calendar className="w-4 h-4" />
                      Timeline
                    </h4>
                    <div className="space-y-1 text-xs sm:text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Created:</span>
                        <span>{new Date(idea.createAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time ago:</span>
                        <span>
                          {(() => {
                            const now = new Date();
                            const diffTime = Math.abs(now.getTime() - new Date(idea.createAt).getTime());
                            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                            if (diffDays === 0) return 'Today';
                            if (diffDays === 1) return 'Yesterday';
                            if (diffDays < 7) return `${diffDays} days ago`;
                            if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
                            return `${Math.floor(diffDays / 30)} months ago`;
                          })()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1 flex items-center gap-2 text-sm sm:text-base">
                      <Sparkles className="w-4 h-4" />
                      Statistics
                    </h4>
                    <div className="space-y-1 text-xs sm:text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Title length:</span>
                        <span>{idea.title.length} characters</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Description length:</span>
                        <span>{idea.description.length} characters</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Word count:</span>
                        <span>{idea.description.split(/\s+/).filter(word => word.length > 0).length} words</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <DialogFooter>
              <motion.div whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Button onClick={onClose} className="w-full bg-amber-600 hover:bg-amber-700">
                  Close
                </Button>
              </motion.div>
            </DialogFooter>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
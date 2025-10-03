import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  Search, Filter, Edit, Trash2,  Calendar, 
  Clock, MoreVertical, Eye, Key, Shield,
  ChevronLeft, ChevronRight, Globe, User
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
import { sampleCredentials } from '@/data/sampleData';
import { CredentialsData } from '@/types/Forms';

const ITEMS_PER_PAGE = 6;

// Animation variants
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

export default function CredentialsPage() {
  const [credentials, setCredentials] = useState<CredentialsData[]>(sampleCredentials);
  const [filteredCredentials, setFilteredCredentials] = useState<CredentialsData[]>(sampleCredentials);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingCredential, setEditingCredential] = useState<CredentialsData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingCredential, setViewingCredential] = useState<CredentialsData | null>(null);

  // Filter and search logic
  useEffect(() => {
    let filtered = credentials.filter(credential => {
      const matchesSearch = credential.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           credential.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           credential.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });

    // Sort credentials
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createAt).getTime() - new Date(a.createAt).getTime();
        case 'oldest':
          return new Date(a.createAt).getTime() - new Date(b.createAt).getTime();
        case 'url-asc':
          return a.url.localeCompare(b.url);
        case 'url-desc':
          return b.url.localeCompare(a.url);
        default:
          return 0;
      }
    });

    setFilteredCredentials(filtered);
    setCurrentPage(1);
  }, [credentials, searchTerm, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredCredentials.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCredentials = filteredCredentials.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Handlers
  const handleEdit = (credential: CredentialsData) => {
    setEditingCredential(credential);
    setIsEditModalOpen(true);
  };

  const handleView = (credential: CredentialsData) => {
    setViewingCredential(credential);
    setIsViewModalOpen(true);
  };

  const handleDelete = (credentialToDelete: CredentialsData) => {
    setCredentials(credentials.filter(credential => credential !== credentialToDelete));
  };

  const handleSaveEdit = (updatedCredential: CredentialsData) => {
    setCredentials(credentials.map(credential => 
      credential === editingCredential ? updatedCredential : credential
    ));
    setIsEditModalOpen(false);
    setEditingCredential(null);
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

  const getDomainFromUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '');
    } catch {
      return url;
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-blue-50/30 p-4 sm:p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div className="mb-6 sm:mb-8" variants={itemVariants}>
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Credentials Vault</h1>
          </div>
          <p className="text-sm sm:text-base text-gray-600">
            Securely manage and organize your login credentials and access details
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
                title: "Total Credentials", 
                value: credentials.length, 
                icon: Key, 
                color: "blue",
                delay: 0
              },
              { 
                title: "This Week", 
                value: credentials.filter(credential => {
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return new Date(credential.createAt) > weekAgo;
                }).length, 
                icon: Shield, 
                color: "green",
                delay: 0.1
              },
              { 
                title: "This Month", 
                value: credentials.filter(credential => {
                  const monthAgo = new Date();
                  monthAgo.setMonth(monthAgo.getMonth() - 1);
                  return new Date(credential.createAt) > monthAgo;
                }).length, 
                icon: Calendar, 
                color: "purple",
                delay: 0.2
              },
              { 
                title: "Domains", 
                value: new Set(credentials.map(c => getDomainFromUrl(c.url))).size, 
                icon: Globe, 
                color: "orange",
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
                      placeholder="Search by URL, username, or description..."
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
                      <SelectItem value="url-asc">URL A-Z</SelectItem>
                      <SelectItem value="url-desc">URL Z-A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Credentials Grid */}
        <motion.div 
          className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-6 sm:mb-8"
          variants={containerVariants}
        >
          <AnimatePresence mode="popLayout">
            {currentCredentials.map((credential, index) => (
              <motion.div
                key={`${credential.url}-${credential.username}-${index}`}
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
                          <div className="flex items-center gap-2 mb-2">
                            <Globe className="w-4 h-4 text-blue-600" />
                            <CardTitle className="text-base sm:text-lg font-semibold line-clamp-1 text-gray-900">
                              {getDomainFromUrl(credential.url)}
                            </CardTitle>
                          </div>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {getTimeAgo(credential.createAt)}
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
                              <DropdownMenuItem onClick={() => handleView(credential)}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEdit(credential)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => handleDelete(credential)}
                                className="text-red-600"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </motion.div>
                      </div>
                      
                      <div className="space-y-2 mt-3">
                        <div className="flex items-center gap-2">
                          <User className="w-3 h-3 text-gray-500" />
                          <p className="text-sm text-gray-600 line-clamp-1">
                            {credential.username}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {credential.description}
                        </p>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="text-xs">Added: {formatDate(credential.createAt)}</span>
                        <span className="flex items-center text-xs">
                          <Key className="w-3 h-3 mr-1 text-blue-500" />
                          Credential
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
          {currentCredentials.length === 0 && (
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
                    <Key className="w-16 h-16 mx-auto text-blue-200" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No credentials found</h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-4">
                    {searchTerm
                      ? 'Try adjusting your search terms'
                      : 'Get started by adding your first credential'}
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
              Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredCredentials.length)} of {filteredCredentials.length} credentials
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
        <EditCredentialModal
          credential={editingCredential}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingCredential(null);
          }}
          onSave={handleSaveEdit}
        />

        <ViewCredentialModal
          credential={viewingCredential}
          isOpen={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false);
            setViewingCredential(null);
          }}
        />
      </div>
    </motion.div>
  );
}

// Edit Credential Modal Component
function EditCredentialModal({ 
  credential, 
  isOpen, 
  onClose, 
  onSave 
}: { 
  credential: CredentialsData | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (credential: CredentialsData) => void;
}) {
  const [formData, setFormData] = useState<CredentialsData | null>(null);

  useEffect(() => {
    if (credential) {
      setFormData(credential);
    }
  }, [credential]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
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
                Edit Credential
              </DialogTitle>
              <DialogDescription className="text-sm sm:text-base">
                Update your credential details below.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="url" className="text-sm sm:text-base">URL</Label>
                  <Input
                    id="url"
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({...formData, url: e.target.value})}
                    required
                    className="text-sm sm:text-base"
                    placeholder="https://example.com"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="username" className="text-sm sm:text-base">Username/Email</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    required
                    className="text-sm sm:text-base"
                    placeholder="username@example.com"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description" className="text-sm sm:text-base">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={4}
                    className="text-sm sm:text-base resize-none"
                    placeholder="Describe what this credential is used for..."
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
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
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

// View Credential Modal Component
function ViewCredentialModal({
  credential,
  isOpen,
  onClose
}: {
  credential: CredentialsData | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!credential) return null;

  const getDomainFromUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '');
    } catch {
      return url;
    }
  };

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
                <Key className="w-5 h-5 text-blue-600" />
                Credential Details
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Globe className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                      {getDomainFromUrl(credential.url)}
                    </h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        <Calendar className="w-3 h-3 mr-1" />
                        Created {new Date(credential.createAt).toLocaleDateString()}
                      </Badge>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <Shield className="w-3 h-3 mr-1" />
                        Secure
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Credential Details */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Login Information</h3>
                <div className="space-y-4 bg-blue-50/50 p-4 rounded-lg">
                  <div>
                    <Label className="text-xs font-medium text-gray-600">URL</Label>
                    <p className="text-sm text-gray-900 mt-1 break-all">{credential.url}</p>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-600">Username/Email</Label>
                    <p className="text-sm text-gray-900 mt-1 break-all">{credential.username}</p>
                  </div>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Description</h3>
                <p className="text-gray-700 bg-gray-50 p-3 sm:p-4 rounded-lg text-sm sm:text-base leading-relaxed">
                  {credential.description || 'No description provided.'}
                </p>
              </motion.div>

              {/* Metadata */}
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
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
                        <span>{new Date(credential.createAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time ago:</span>
                        <span>
                          {(() => {
                            const now = new Date();
                            const diffTime = Math.abs(now.getTime() - new Date(credential.createAt).getTime());
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
                      <Shield className="w-4 h-4" />
                      Security
                    </h4>
                    <div className="space-y-1 text-xs sm:text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Domain:</span>
                        <span className="text-green-600 font-medium">Verified</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">HTTPS:</span>
                        <span className={credential.url.startsWith('https://') ? 'text-green-600 font-medium' : 'text-orange-600'}>
                          {credential.url.startsWith('https://') ? 'Enabled' : 'Not enabled'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="text-blue-600 font-medium">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <DialogFooter>
              <motion.div whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Button onClick={onClose} className="w-full bg-blue-600 hover:bg-blue-700">
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
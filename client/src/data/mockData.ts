import { User, Todo, Idea, SignIn, SignInOption } from '@/types';

export const mockUsers: User[] = [
  {
    userID: '1',
    authID: 'auth_1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    profileUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face',
    profileUrlId: 'alice_profile',
    createdAt: new Date('2024-01-15')
  },
  {
    userID: '2',
    authID: 'auth_2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    profileUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    profileUrlId: 'bob_profile',
    createdAt: new Date('2024-01-20')
  },
  {
    userID: '3',
    authID: 'auth_3',
    name: 'Carol Davis',
    email: 'carol@example.com',
    profileUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    profileUrlId: 'carol_profile',
    createdAt: new Date('2024-02-01')
  }
];

export const mockTodos: Todo[] = [
  {
    todoID: '1',
    todo: 'Complete project proposal',
    extendTime: 2,
    status: false,
    createdAt: new Date('2024-01-20'),
    extendAt: null,
    finishAt: null,
    user: mockUsers[0]
  },
  {
    todoID: '2',
    todo: 'Review team performance',
    extendTime: 1,
    status: true,
    createdAt: new Date('2024-01-18'),
    extendAt: new Date('2024-01-19'),
    finishAt: new Date('2024-01-21'),
    user: mockUsers[1]
  },
  {
    todoID: '3',
    todo: 'Update documentation',
    extendTime: 0,
    status: false,
    createdAt: new Date('2024-01-22'),
    extendAt: null,
    finishAt: null,
    user: mockUsers[2]
  },
  {
    todoID: '4',
    todo: 'Prepare presentation slides',
    extendTime: 3,
    status: true,
    createdAt: new Date('2024-01-15'),
    extendAt: new Date('2024-01-16'),
    finishAt: new Date('2024-01-19'),
    user: mockUsers[0]
  }
];

export const mockIdeas: Idea[] = [
  {
    ideaId: '1',
    idea: 'Implement dark mode theme for better user experience during night hours. This could include automatic switching based on system preferences.',
    createdAt: new Date('2024-01-21'),
    user: mockUsers[0]
  },
  {
    ideaId: '2',
    idea: 'Add drag and drop functionality to reorganize todo items by priority.',
    createdAt: new Date('2024-01-19'),
    user: mockUsers[1]
  },
  {
    ideaId: '3',
    idea: 'Create mobile app version with offline sync capabilities.',
    createdAt: new Date('2024-01-23'),
    user: mockUsers[2]
  }
];

export const mockSignIns: SignIn[] = [
  {
    signId: '1',
    website: 'GitHub',
    signWith: 'alice.johnson@work.com',
    option: SignInOption.GITHUB,
    user: mockUsers[0]
  },
  {
    signId: '2',
    website: 'Slack',
    signWith: 'bob.smith@company.com',
    option: SignInOption.EMAIL,
    user: mockUsers[1]
  },
  {
    signId: '3',
    website: 'Google Drive',
    signWith: 'carol.davis@personal.com',
    option: SignInOption.GOOGLE,
    user: mockUsers[2]
  },
  {
    signId: '4',
    website: 'Linear',
    signWith: 'alice.j.work',
    option: SignInOption.EMAIL,
    user: mockUsers[0]
  }
];
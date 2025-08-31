export interface User {
  userID: string;
  authID: string;
  name: string;
  email: string;
  profileUrl: string;
  profileUrlId: string;
  createdAt: Date;
}

export interface Todo {
  todoID: string;
  todo: string;
  extendTime: number;
  status: boolean;
  createdAt: Date;
  extendAt: Date | null;
  finishAt: Date | null;
  user: User;
}

export interface Idea {
  ideaId: string;
  idea: string;
  createdAt: Date;
  user: User;
}

export enum SignInOption {
  EMAIL = 'Email',
  GOOGLE = 'Google',
  GITHUB = 'GitHub',
  APPLE = 'Apple',
  FACEBOOK = 'Facebook',
  TWITTER = 'Twitter'
}

export interface SignIn {
  signId: string;
  website: string;
  signWith: string;
  option: SignInOption;
  user: User;
}
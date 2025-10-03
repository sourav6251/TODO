export interface CreateTodo{
    title:string,
    description:string,
    status: "pending" | "in-progress" | "completed" | "paused" | "failed";
    priority: "low" | "medium" | "high";
    expireDate: string;
    tags: string[];
}
export interface TodoData {
    id: string;
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed" | "paused" | "failed";
    priority: "low" | "medium" | "high";
    createdAt: Date;
    expireDate: Date;
    originalExpireDate: Date;
    lastExtendedDate?: Date;
    extensionCount: number;
    tags: string[];
}
export interface CreateIdeas{
    title:string,
    description:string
}

export interface IdeasData{
    title:string,
    description:string,
    createAt:Date
}

export interface CreateCredentials{
    url: string;
    username: string;
    description: string;
}

export interface CredentialsData{
    url: string;
    username: string;
    description: string;
    createAt:Date
}


export interface UserProfile {
    id: string;
    name: string;
    email: string;
    profilePhoto?: string;
    phone?: string;
    bio?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    otp?: string;
  }
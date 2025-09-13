export interface User {
  id: number;
  email: string;
  name: string;
  password?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  expiresAt: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export type TodoStatus = 'todo' | 'in_progress' | 'done';
export type TodoPriority = 'low' | 'medium' | 'high';

export interface Todo {
  id: number;
  userId: number;
  title: string;
  description?: string;
  status: TodoStatus;
  priority?: TodoPriority;
  tags: { id: string; name: string }[] | [];
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodoCreateRequest {
  id: number;
  title: string;
  description?: string;
  status: TodoStatus;
  priority?: TodoPriority;
  tags?: { id: string; name: string }[];
  dueDate?: string;
  userId: number;
}

export interface TodoUpdateRequest extends Partial<TodoCreateRequest> {
  id: number;
  title: string;
  status: TodoStatus;
}

export interface TodoFilters {
  status?: TodoStatus;
  search?: string;
  sortBy?: 'createdAt' | 'dueDate' | 'priority';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type Theme = 'light' | 'dark';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}
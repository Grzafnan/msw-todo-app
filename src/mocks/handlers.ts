/* eslint-disable @typescript-eslint/no-explicit-any */
import { http, HttpResponse } from 'msw';
import { Todo, User } from '../types';
import { todos, users } from '../constants';

// Simulate latency
const simulateDelay = (min = 100, max = 400) => new Promise(res => setTimeout(res, Math.random() * (max - min) + min));

// 5% random failure
const randomFailure = () => {
  if (Math.random() < 0.05) {
    throw new Error('Internal server error'); // Throwing an error to be caught by the try/catch
  }
};

// Helper to extract userId from Authorization header
const getUserIdFromAuth = (authHeader: string | null): number | null => {
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }
  const tokenParts = authHeader.split('-');
  const userIdStr = tokenParts[tokenParts.length - 1]; // Assuming token is 'mock-token-USER_ID'
  const userId = parseInt(userIdStr);
  return isNaN(userId) ? null : userId;
};

// --- MSW Handlers ---
export const handlers = [
  http.post('/auth/register', async ({ request }) => {
    await simulateDelay();
    try {
      randomFailure();
      const { email, password, name } = (await request.json()) as Pick<User, 'email' | 'password' | 'name'>;

      if (!email || !password || !name) {
        return HttpResponse.json({ message: 'All fields required' }, { status: 400 });
      }

      const exists = users.find(u => u.email === email);
      if (exists) {
        return HttpResponse.json({ message: 'User already exists' }, { status: 409 });
      }

      const newUser: User = { id: Date.now(), email, password, name };
      users.push(newUser);
      return HttpResponse.json(
        { user: newUser, token: `mock-token-${newUser.id}`, expiresAt: Date.now() + 3600 * 1000 },
        { status: 201 }
      );
    } catch (error: any) {
      console.error('Registration error:', error);
      return HttpResponse.json({ message: error.message || 'Server error' }, { status: 500 });
    }
  }),

  http.post('/auth/login', async ({ request }) => {
    await simulateDelay();
    try {
      randomFailure();
      const { email, password } = (await request.json()) as Pick<User, 'email' | 'password'>;

      const user = users.find(u => u.email === email && u.password === password);
      if (!user) {
        return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 });
      }
      return HttpResponse.json(
        { user, token: `mock-token-${user.id}`, expiresAt: Date.now() + 3600 * 1000 },
        { status: 200 }
      );
    } catch (error: any) {
      console.error('Login error:', error);
      return HttpResponse.json({ message: error.message || 'Server error' }, { status: 500 });
    }
  }),


  http.get('/todos', async ({ request }) => {
    await simulateDelay();
    try {
      randomFailure();

      const authHeader = request.headers.get('authorization');
      const userId = getUserIdFromAuth(authHeader);

      if (userId === null) {
        return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }

      let userTodos = todos.filter(t => t.userId === userId);

      const url = new URL(request.url);
      const status = url.searchParams.get('status');
      const q = url.searchParams.get('q');
      const page = parseInt(url.searchParams.get('_page') || '1');
      const limit = parseInt(url.searchParams.get('_limit') || '10');
      const sortField = url.searchParams.get('_sort') || 'createdAt';
      const sortOrder = url.searchParams.get('_order') || 'desc';

      // Filtering
      if (status) {
        userTodos = userTodos.filter(t => t.status === status);
      }
      if (q) {
        const lowerQ = q.toLowerCase();
        userTodos = userTodos.filter(t =>
          t.title?.toLowerCase().includes(lowerQ) ||
          t.description?.toLowerCase().includes(lowerQ)
        );
      }

      // Sorting
      userTodos.sort((a, b) => {
        const aValue = (a as any)[sortField];
        const bValue = (b as any)[sortField];

        if (aValue === undefined || bValue === undefined) {
          // Handle cases where sortField might not exist on all todos
          return 0;
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });

      const total = userTodos.length;
      const pagedTodos = userTodos.slice((page - 1) * limit, page * limit);
      return HttpResponse.json(
        {
          data: pagedTodos, // Ensure it's an object even if empty
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
        {
          status: 200,
          headers: {
            'X-Total-Count': total.toString(),
            'Access-Control-Expose-Headers': 'X-Total-Count', // Important for CORS if client needs this header
          },
        }
      );
    } catch (error: any) {
      console.error('Get todos error:', error);
      return HttpResponse.json({ message: error.message || 'Server error' }, { status: 500 });
    }
  }),

  http.post('/todos', async ({ request }) => {
    await simulateDelay();
    try {
      randomFailure();
      const authHeader = request.headers.get('authorization');
      const userId = getUserIdFromAuth(authHeader);

      if (userId === null) {
        return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }

      const todoPartial = (await request.json()) as Partial<Todo>;
      if (!todoPartial.title) {
        return HttpResponse.json({ message: 'Title is required' }, { status: 400 });
      }

      const newTodo: Todo = {
        ...todoPartial,
        id: Date.now(), // Simple unique ID generation
        userId,
        status: todoPartial.status || 'pending', // Default status
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Todo; // Type assertion since we've filled in required fields

      todos.push(newTodo); // Mutate the mock data

      return HttpResponse.json(newTodo, { status: 201 });
    } catch (error: any) {
      console.error('Create todo error:', error);
      return HttpResponse.json({ message: error.message || 'Server error' }, { status: 500 });
    }
  }),

  http.patch('/todos/:id', async ({ request, params }) => {
    await simulateDelay();
    try {
      randomFailure();
      const authHeader = request.headers.get('authorization');
      const userId = getUserIdFromAuth(authHeader);

      if (userId === null) {
        return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }

      const todoId = Number(params.id);
      if (isNaN(todoId)) {
        return HttpResponse.json({ message: 'Invalid Todo ID' }, { status: 400 });
      }

      const rawUpdates = await request.json();
      const updates: Partial<Todo> = typeof rawUpdates === 'object' && rawUpdates !== null ? rawUpdates : {};

      const index = todos.findIndex(t => t.id === todoId && t.userId === userId);
      if (index === -1) {
        return HttpResponse.json({ message: 'Todo not found or not authorized' }, { status: 404 });
      }

      todos[index] = { ...todos[index], ...updates, updatedAt: new Date().toISOString() }; // Mutate
      return HttpResponse.json(todos[index], { status: 200 });
    } catch (error: any) {
      console.error('Update todo error:', error);
      return HttpResponse.json({ message: error.message || 'Server error' }, { status: 500 });
    }
  }),

  http.delete('/todos/:id', async ({ request, params }) => {
    await simulateDelay();
    try {
      randomFailure();
      const authHeader = request.headers.get('authorization');
      const userId = getUserIdFromAuth(authHeader);

      if (userId === null) {
        return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }

      const todoId = Number(params.id);
      if (isNaN(todoId)) {
        return HttpResponse.json({ message: 'Invalid Todo ID' }, { status: 400 });
      }

      const index = todos.findIndex(t => t.id === todoId && t.userId === userId);
      if (index === -1) {
        return HttpResponse.json({ message: 'Todo not found or not authorized' }, { status: 404 });
      }

      todos.splice(index, 1); // Mutate
      return HttpResponse.json({ success: true, message: 'Todo deleted successfully' }, { status: 200 });
    } catch (error: any) {
      console.error('Delete todo error:', error);
      return HttpResponse.json({ message: error.message || 'Server error' }, { status: 500 });
    }
  }),
];
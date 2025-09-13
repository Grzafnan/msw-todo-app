import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  Todo,
  TodoCreateRequest,
  TodoFilters,
  PaginatedResponse
} from '../../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    getTodos: builder.query<PaginatedResponse<Todo>, TodoFilters>({
      query: (filters = {}) => {
        const params = new URLSearchParams();

        // Add filters to params
        if (filters.status) params.append('status', filters.status);
        if (filters.search) params.append('q', filters.search);
        if (filters.sortBy) {
          params.append('_sort', filters.sortBy);
          params.append('_order', filters.sortOrder || 'desc');
        }

        const page = filters.page || 1;
        const limit = filters.limit || 10;
        params.append('_page', page.toString());
        params.append('_limit', limit.toString());

        return {
          url: `/todos?${params.toString()}`,
          method: 'GET',
        };
      },
      transformResponse: (response: PaginatedResponse<Todo>, meta) => {
        const total = parseInt(meta?.response?.headers.get('X-Total-Count') || '0', 10);
        const page = parseInt(meta?.request?.url.match(/_page=(\d+)/)?.[1] || '1', 10);
        const limit = parseInt(meta?.request?.url.match(/_limit=(\d+)/)?.[1] || '10', 10);
        return {
          data: response?.data || response, // Handle case where response might be the array itself
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        };
      },
      providesTags: ['Todo', ...Array.from({ length: 10 }, (_, i) => ({ type: 'Todo' as const, id: i + 1 }))],
    }),

    getTodo: builder.query<Todo, number>({
      query: (id) => `/todos/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Todo', id }],
    }),

    createTodo: builder.mutation<Todo, TodoCreateRequest>({
      query: (todo) => ({
        url: '/todos',
        method: 'POST',
        body: { ...todo },
      }),
      invalidatesTags: [{ type: 'Todo' }]
    }),

    updateTodo: builder.mutation<Todo, TodoCreateRequest>({
      query: ({ id, ...patch }) => ({
        url: `/todos/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Todo', id },   // invalidate single todo
        { type: 'Todo' },       // invalidate todos list
      ],
    }),

    deleteTodo: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Todo', id },
        { type: 'Todo' },
      ],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetTodoQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApi;
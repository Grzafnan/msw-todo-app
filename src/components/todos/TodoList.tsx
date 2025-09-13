import React, { useCallback, useState } from 'react';
import { Plus } from 'lucide-react';
import { useGetTodosQuery } from '../../store/api/todosApi';
import TodoItem from './TodoItem';
import TodoFilters from './TodoFilters';
import TodoPagination from './TodoPagination';
import EmptyState from './EmptyState';
import TodoSkeleton from './TodoSkeleton';
import Button from '../ui/Button';

interface TodoListProps {
  onCreateTodo: () => void;
}

const TodoList: React.FC<TodoListProps> = ({ onCreateTodo }) => {
  const [filters, setFilters] = useState({
    status: undefined as 'todo' | 'in_progress' | 'done' | undefined,
    search: '',
    sortBy: 'createdAt' as 'createdAt' | 'dueDate' | 'priority',
    sortOrder: 'desc' as 'asc' | 'desc',
    page: 1,
    limit: 10,
  });

  const { data, isLoading, error } = useGetTodosQuery(filters, {
    refetchOnFocus: false,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });
  const handleFiltersChange = useCallback(
    (newFilters: Partial<typeof filters>) => {
      setFilters(prev => ({
        ...prev,
        ...newFilters,
        page: newFilters.page || 1,
      }));
    },
    []
  );

  const handlePageChange = useCallback((page: number) => {
    setFilters(prev => ({ ...prev, page }));
  }, []);

  if (error) {
    return (
      <div className="py-12 text-center">
        <div className="max-w-md p-4 mx-auto border border-red-200 rounded-md bg-red-50 dark:bg-red-900/20 dark:border-red-800">
          <p className="text-red-600 dark:text-red-400">
            Failed to load todos. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            My Todos
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            {data ? `${data.total} total todos` : 'Loading...'}
          </p>
        </div>
        <Button onClick={onCreateTodo}>
          <Plus className="w-4 h-4 mr-2" />
          New Todo
        </Button>
      </div>

      {/* Filters */}
      <TodoFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />

      {/* Content */}
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <TodoSkeleton key={i} />
          ))}
        </div>
      ) : data?.data?.length === 0 ? (
        <EmptyState
          hasFilters={!!(filters.status || filters.search)}
          onCreateTodo={onCreateTodo}
          onClearFilters={() => handleFiltersChange({ status: undefined, search: '' })}
        />
      ) : (
        <>
          <div className="space-y-4">
            { data?.data?.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>

          {data &&  data?.totalPages > 1 && (
            <TodoPagination
              currentPage={data?.page}
              totalPages={data?.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default TodoList;
import React from 'react';
import { Plus, Filter } from 'lucide-react';
import Button from '../ui/Button';

interface EmptyStateProps {
  hasFilters: boolean;
  onCreateTodo: () => void;
  onClearFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  hasFilters,
  onCreateTodo,
  onClearFilters,
}) => {
  if (hasFilters) {
    return (
      <div className="py-12 text-center">
        <Filter className="w-12 h-12 mx-auto text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
          No todos match your filters
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Try adjusting your search or filter criteria.
        </p>
        <div className="mt-6">
          <Button className='text-red-600 border-red-600 dark:border-red-600' variant="outline" onClick={onClearFilters}>
            Clear Filters
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 text-center">
      <div className="flex items-center justify-center w-24 h-24 mx-auto bg-gray-100 rounded-full dark:bg-gray-800">
        <Plus className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
        No todos yet
      </h3>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Get started by creating your first todo.
      </p>
      <div className="mt-6">
        <Button onClick={onCreateTodo}>
          <Plus className="w-4 h-4 mr-2" />
          Create your first todo
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;
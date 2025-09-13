/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { debounce } from '../../lib/utils';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

interface TodoFiltersProps {
  filters: {
    status?: 'todo' | 'in_progress' | 'done';
    search: string;
    sortBy: 'createdAt' | 'dueDate' | 'priority';
    sortOrder: 'asc' | 'desc';
  };
  onFiltersChange: (filters: any) => void;
}

const TodoFilters: React.FC<TodoFiltersProps> = ({ filters, onFiltersChange }) => {
  const [searchValue, setSearchValue] = useState(filters.search);

  const debouncedSearch = useMemo(
    () => debounce((value: string) => {
      onFiltersChange({ search: value });
    }, 300),
    [onFiltersChange]
  );

  useEffect(() => {
    debouncedSearch(searchValue);
  }, [searchValue, debouncedSearch]);

  const handleClearFilters = () => {
    setSearchValue('');
    onFiltersChange({
      status: undefined,
      search: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
  };

  const hasActiveFilters = filters.status || filters.search;

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-center gap-4 mb-4">
        <Filter className="w-5 h-5 text-gray-500" />
        <h3 className="font-medium text-gray-900 dark:text-gray-100">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="ml-auto text-red-600"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="relative">
          <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          <Input
            placeholder="Search todos..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select
          value={filters.status || ''}
          onChange={(e) => onFiltersChange({ status: e.target.value || undefined })}
          options={[
            { value: '', label: 'All Status' },
            { value: 'todo', label: 'Todo' },
            { value: 'in_progress', label: 'In Progress' },
            { value: 'done', label: 'Done' },
          ]}
        />

        <Select
          value={filters.sortBy}
          onChange={(e) => onFiltersChange({ sortBy: e.target.value })}
          options={[
            { value: 'createdAt', label: 'Created Date' },
            { value: 'dueDate', label: 'Due Date' },
            { value: 'priority', label: 'Priority' },
          ]}
        />

        <Select
          value={filters.sortOrder}
          onChange={(e) => onFiltersChange({ sortOrder: e.target.value })}
          options={[
            { value: 'desc', label: 'Newest First' },
            { value: 'asc', label: 'Oldest First' },
          ]}
        />
      </div>
    </div>
  );
};

export default TodoFilters;
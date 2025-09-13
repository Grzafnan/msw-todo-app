/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, X } from 'lucide-react';
import { useCreateTodoMutation } from '../../store/api/todosApi';
import { useAppDispatch, useAppSelector } from '../../store';
import { addToast } from '../../store/slices/uiSlice';
import { todoSchema, type TodoFormData } from '../../schemas/todo';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Modal from '../ui/Modal';
import z from 'zod';
import { selectUser } from '../../store/slices/authSlice';

interface TodoFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [createTodo, { isLoading }] = useCreateTodoMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TodoFormData & { tagInput: string }>({
  resolver: zodResolver(todoSchema.extend({
    tagInput: z.string().optional(),
  })),
    defaultValues: {
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      tags: [],
      tagInput: '',
      dueDate: '',
    },
  });

const { fields: tags, append: appendTag, remove: removeTag } = useFieldArray({
  control,
  name: 'tags',
});

  const tagInput = watch('tagInput');

  const onSubmit = async (data: TodoFormData & { tagInput: string }) => {
    try {
      const { tagInput, ...todoData } = data;
      const userId = user?.id;
      if (!userId) {
        dispatch(addToast({
          type: 'error',
          message: 'User not found. Please log in again.',
        }));
        return;
      }

      const payload = { ...todoData, id: Date.now(), userId };
      await createTodo(payload).unwrap();

      dispatch(addToast({
        type: 'success',
        message: 'Todo created successfully',
      }));
      
      reset();
      onClose();
    } catch (error: any) {
      dispatch(addToast({
        type: 'error',
        message: 'Failed to create todo',
      }));
    }
  };

  const handleAddTag = () => {
    if (tagInput?.trim() && !tags.some(tag => tag.name === tagInput.trim())) {
      appendTag({ id: Date.now().toString(), name: tagInput.trim() });
      setValue('tagInput', '');
    }
  };
  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Todo"
      size="lg"
      footer={
        <>
          <Button className='text-red-600 border-red-600' variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            loading={isLoading}
          >
            Create Todo
          </Button>
        </>
      }
    >
      <form className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Title *
          </label>
          <Input
            {...register('title')}
            placeholder="Enter todo title"
            error={errors.title?.message}
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            {...register('description')}
            placeholder="Enter description (optional)"
            rows={3}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </label>
            <Select
              {...register('status')}
              options={[
                { value: 'todo', label: 'Todo' },
                { value: 'in_progress', label: 'In Progress' },
                { value: 'done', label: 'Done' },
              ]}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Priority
            </label>
            <Select
              {...register('priority')}
              options={[
                { value: '', label: 'No Priority' },
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
              ]}
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Due Date
          </label>
          <Input
            {...register('dueDate')}
            type="date"
            error={errors.dueDate?.message}
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Tags
          </label>
          <div className="flex gap-2 mb-3">
            <Input
              {...register('tagInput')}
              placeholder="Enter a tag"
              onKeyDown={handleTagInputKeyDown}
              className="flex-1"
            />
            <Button
              type="button"
              onClick={handleAddTag}
              disabled={!tagInput?.trim()}
              size="sm"
              className='block h-9.5'
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={tag.id ?? index}
                  className="inline-flex items-center gap-1 px-3 py-1 text-sm text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900/20 dark:text-blue-200"
                >
                  {tag.name}
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default TodoForm;
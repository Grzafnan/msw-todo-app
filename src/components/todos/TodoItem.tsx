import React, { useState } from 'react';
import { Calendar, Tag, AlertCircle, MoreHorizontal, Trash2, Edit } from 'lucide-react';
import { useUpdateTodoMutation, useDeleteTodoMutation } from '../../store/api/todosApi';
import { useAppDispatch } from '../../store';
import { addToast } from '../../store/slices/uiSlice';
import { formatDate, cn } from '../../lib/utils';
import type { Todo, TodoStatus, TodoPriority } from '../../types';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Form state for editing
  const [formData, setFormData] = useState({
    title: todo.title,
    description: todo.description || '',
    dueDate: todo.dueDate ? todo.dueDate.slice(0, 10) : '',
    status: todo.status,
    priority: todo.priority || 'low' as TodoPriority,
  });

  const statusColors = {
    todo: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    in_progress: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200',
    done: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200',
  };

  const priorityColors = {
    low: 'text-green-600 dark:text-green-400',
    medium: 'text-yellow-600 dark:text-yellow-400',
    high: 'text-red-600 dark:text-red-400',
  };

  const handleStatusChange = async (status: TodoStatus) => {
    try {
      await updateTodo({ 
        ...todo, 
        status, 
        tags: todo.tags || []
      }).unwrap();
      dispatch(addToast({
        type: 'success',
        message: 'Todo updated successfully',
      }));
    } catch {
      dispatch(addToast({
        type: 'error',
        message: 'Failed to update todo',
      }));
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id).unwrap();
      dispatch(addToast({
        type: 'success',
        message: 'Todo deleted successfully',
      }));
      setShowDeleteModal(false);
    } catch {
      dispatch(addToast({
        type: 'error',
        message: 'Failed to delete todo',
      }));
    }
  };

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && todo.status !== 'done';

  // --- Edit Modal Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    try {
      await updateTodo({
        id: todo.id,
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : undefined,
        status: formData.status,
        priority: formData.priority,
        tags: todo.tags?.map(tag => ({ id: tag.id, name: tag.name })) || [],
        userId: todo.userId,
      }).unwrap();

      dispatch(addToast({
        type: 'success',
        message: 'Todo updated successfully',
      }));
      setShowEditModal(false);
    } catch {
      dispatch(addToast({
        type: 'error',
        message: 'Failed to update todo',
      }));
    }
  };

  const openEditModal = () => {
    // Reset form data to current todo before opening modal
    setFormData({
      title: todo.title,
      description: todo.description || '',
      dueDate: todo.dueDate ? todo.dueDate.slice(0, 10) : '',
      status: todo.status,
      priority: todo.priority || 'low',
    });
    setShowEditModal(true);
    setShowMenu(false);
  };

  return (
    <>
      <div className="p-6 transition-shadow bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-700 hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <input
                type="checkbox"
                checked={todo.status === 'done'}
                onChange={(e) => handleStatusChange(e.target.checked ? 'done' : 'todo')}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
              />
              <h3 className={cn(
                'font-medium text-gray-900 dark:text-gray-100',
                todo.status === 'done' && 'line-through text-gray-500 dark:text-gray-400'
              )}>
                {todo.title}
              </h3>
              <span className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                statusColors[todo.status]
              )}>
                {todo.status.replace('_', ' ')}
              </span>
            </div>

            {todo.description && (
              <p className="mb-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {todo.description}
              </p>
            )}

            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              {todo.dueDate && (
                <div className={cn(
                  'flex items-center gap-1',
                  isOverdue && 'text-red-600 dark:text-red-400'
                )}>
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(todo.dueDate)}</span>
                  {isOverdue && <AlertCircle className="w-4 h-4" />}
                </div>
              )}

              {todo.priority && (
                <div className={cn(
                  'flex items-center gap-1 font-medium',
                  priorityColors[todo.priority]
                )}>
                  <AlertCircle className="w-4 h-4" />
                  <span>{todo.priority}</span>
                </div>
              )}

              {todo.tags && todo.tags.length > 0 && (
                <div className="flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  <span>{todo.tags.map(tag => tag?.name).filter(Boolean).join(', ') + '.'}</span>
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMenu(!showMenu)}
              className="w-8 h-8 p-0"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>

            {showMenu && (
              <div className="absolute right-0 z-10 w-48 mt-2 bg-white border border-gray-200 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700">
                <div className="py-1">
                  <button
                    onClick={openEditModal}
                    className="flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteModal(true);
                      setShowMenu(false);
                    }}
                    className="flex items-center w-full gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Todo"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </>
        }
      >
        <p className="text-gray-600 dark:text-gray-400">
          Are you sure you want to delete "{todo.title}"? This action cannot be undone.
        </p>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Todo"
        footer={
          <>
            <Button title='Cancel' className='text-red-600 border-red-600'  variant="outline" onClick={() => setShowEditModal(false)}>Cancel</Button>
            <Button title='Update' variant="primary" onClick={handleEditSubmit}>Update</Button>
          </>
        }
      >
        <form
          onSubmit={e => {
            e.preventDefault();
            handleEditSubmit();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300" htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300" htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300" htmlFor="dueDate">Due Date</label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300" htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
            >
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300" htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default React.memo(TodoItem);

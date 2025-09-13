import React, { useState } from 'react';
import TodoList from '../components/todos/TodoList';
import TodoForm from '../components/todos/TodoForm';
import Layout from '../components/layout/Layout';

const TodosPage: React.FC = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <Layout>
      <TodoList onCreateTodo={() => setShowCreateForm(true)} />
      <TodoForm
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
      />
    </Layout>
  );
};

export default TodosPage;
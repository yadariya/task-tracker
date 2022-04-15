type TodoStatus = 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface Todo {
  id: string;
  name: string;
  deadline: string;
  tags: string[];
  description?: string;
  status: TodoStatus;
}

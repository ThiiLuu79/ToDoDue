export interface Task {
    id: number;
    name: string;
    course: string;
    dueDate: string;
    description: string;
    effortEstimate: number;
    notes: string;
    status: 'TODO' | 'In Progress' | 'Done';
}

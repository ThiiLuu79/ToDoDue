import { TaskStatus } from "../enum/task-status.enum";

export interface Task {
    id: number;
    name: string;
    course: string;
    dueDate: string;
    description: string;
    effortEstimate: number;
    notes: string;
    status: TaskStatus;
}

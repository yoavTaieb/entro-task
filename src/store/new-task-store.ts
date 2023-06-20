import { create } from "zustand"

interface NewTaskState {
    title?: string
    description?: string
    assigneeId?: string
    linkedTasks: string[]

    step: number
    isLoading: boolean

    errors: string[]

    setTitle: (title: string) => void
    setAssigneeId: (id: string) => void

    setDescription: (description: string) => void

    addLinkedTask: (id: string) => void
    removeLinkedTask: (id: string) => void

    nextStep: () => void
    prevStep: () => void

    startLoading: () => void
    stopLoading: () => void

    setError: (error: string) => void
}

export const useTaskStore = create<NewTaskState>((set) => ({
    title: undefined,
    description: undefined,
    assigneeId: undefined,
    linkedTasks: [],
    isLoading: false,
    step: 0,
    errors: [],

    setTitle: (title) => set({ title }),
    setAssigneeId: (id) => set({ assigneeId: id }),
    setDescription: (description) => set({ description }),

    addLinkedTask: (id) => set((state) => ({ linkedTasks: [...state.linkedTasks, id] })),
    removeLinkedTask: (id) => set((state) => ({ linkedTasks: state.linkedTasks.filter((taskId) => taskId != id) })),

    nextStep: () => set((state) => ({ step: state.step + 1 })),
    prevStep: () => set((state) => ({ step: state.step - 1 })),

    startLoading: () => set({ isLoading: true }),
    stopLoading: () => set({ isLoading: false }),

    setError: (error) => set((state) => ({ errors: [...state.errors, error] })),
}))
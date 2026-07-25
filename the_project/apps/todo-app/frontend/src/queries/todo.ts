import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchJson } from "../api/fetchJson";

export type Todo = { id: string; content: string; completed: boolean };

const todoKeys = {
	all: ["todos"] as const,
};

async function fetchTodos(): Promise<Todo[]> {
	const response = await fetchJson<{ todos: Todo[] }>("/api/v1/todos");

	if (!response.todos) {
		throw new Error("Invalid response from server");
	}

	return response.todos;
}

export function todoQueryOptions() {
	return queryOptions({
		queryKey: todoKeys.all,
		queryFn: fetchTodos,
	});
}

export function useTodoQuery() {
	return useQuery(todoQueryOptions());
}

export function useTodoMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (newTodo: Omit<Todo, "id">) => {
			const response = await fetchJson<Todo>("/api/v1/todos", {
				method: "POST",
				body: JSON.stringify(newTodo),
			});
			return response;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: todoKeys.all });
		},
	});
}

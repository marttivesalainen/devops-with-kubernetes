import { createFileRoute } from "@tanstack/react-router";
import { TodoForm, todoFormDefaults } from "../components/TodoForm";
import { useAppForm } from "../form";
import { useHealthQuery } from "../queries/health";
import { useTodoMutation, useTodoQuery } from "../queries/todo";

function HomePage() {
	const { isLoading, isError, data } = useHealthQuery();

	const status = isLoading ? "checking…" : isError ? "unreachable" : (data?.status ?? "unknown");

	const todoMutation = useTodoMutation();
	const { isLoading: isTodosLoading, data: todos } = useTodoQuery();

	const form = useAppForm({
		defaultValues: todoFormDefaults,
		onSubmit: async ({ value, formApi }) => {
			// TODO: replace with real POST /api/v1/todos call
			await todoMutation.mutateAsync({ content: value.content, completed: false });
			formApi.reset();
		},
	});

	return (
		<main className="mx-auto max-w-2xl space-y-6 p-6">
			<h1 className="text-3xl font-bold">Todo app</h1>
			<p className="text-sm text-gray-600">
				Backend health: <strong className="font-semibold text-gray-900">{status}</strong>
			</p>

			<img src="/api/v1/image" alt="Some random content" className="w-full rounded-lg shadow" />

			<TodoForm form={form} />

			<h2 className="text-xl font-semibold">Todos</h2>

			<ul className="list-inside list-disc space-y-1">
				{isTodosLoading ? (
					<li>Loading...</li>
				) : todos && todos.length > 0 ? (
					todos.map((todo) => <li key={todo.id}>{todo.content}</li>)
				) : (
					<li>No todos found</li>
				)}
			</ul>
		</main>
	);
}

export const Route = createFileRoute("/")({ component: HomePage });

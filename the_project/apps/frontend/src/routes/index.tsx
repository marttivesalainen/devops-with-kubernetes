import { createFileRoute } from "@tanstack/react-router";
import { TodoForm, todoFormDefaults } from "../components/TodoForm";
import { useAppForm } from "../form";
import { useHealthQuery } from "../queries/health";

function HomePage() {
	const { isLoading, isError, data } = useHealthQuery();

	const status = isLoading ? "checking…" : isError ? "unreachable" : (data?.status ?? "unknown");

	const form = useAppForm({
		defaultValues: todoFormDefaults,
		onSubmit: async ({ value, formApi }) => {
			// TODO: replace with real POST /api/v1/todos call
			console.log("submit todo", value);
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
				<li>Todo 1</li>
				<li>Todo 2</li>
				<li>Todo 3</li>
			</ul>
		</main>
	);
}

export const Route = createFileRoute("/")({ component: HomePage });

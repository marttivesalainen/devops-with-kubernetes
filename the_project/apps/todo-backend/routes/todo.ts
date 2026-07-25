import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

const todoSchema = z.object({
	id: z.string(),
	content: z.string(),
	completed: z.boolean(),
});

const todosResponseSchema = z.object({
	todos: z.array(todoSchema),
});

const TEMP_TODOS: z.infer<typeof todoSchema>[] = [
	{ id: "1", content: "Todo 1", completed: false },
	{ id: "2", content: "Todo 2", completed: true },
	{ id: "3", content: "Todo 3", completed: false },
];

export const todoRoutes: FastifyPluginAsyncZod = async (app) => {
	app.get(
		"/",
		{
			schema: {
				response: { 200: todosResponseSchema },
			},
		},
		async () => ({ todos: TEMP_TODOS }) as const,
	);

	app.post(
		"/",
		{
			schema: {
				body: todoSchema.pick({ content: true, completed: true }),
				response: { 200: todoSchema },
			},
		},
		async (request) => {
			const newTodo = {
				id: String(TEMP_TODOS.length + 1),
				content: request.body.content,
				completed: request.body.completed,
			};
			TEMP_TODOS.push(newTodo);
			return newTodo;
		},
	);
};

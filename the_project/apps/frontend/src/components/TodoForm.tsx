import { withForm } from "../form";

export const MAX_TITLE_LENGTH = 140;

export const todoFormDefaults = { title: "" };

export const TodoForm = withForm({
	defaultValues: todoFormDefaults,
	render: ({ form }) => (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				event.stopPropagation();
				void form.handleSubmit();
			}}
			className="space-y-3"
		>
			<form.AppField
				name="title"
				validators={{
					onChange: ({ value }) => {
						const trimmed = value.trim();
						if (trimmed.length === 0) return "Title is required";
						if (value.length > MAX_TITLE_LENGTH) {
							return `Max ${MAX_TITLE_LENGTH} characters`;
						}
						return undefined;
					},
				}}
			>
				{(field) => (
					<field.TextField
						label="New todo"
						placeholder={`Enter a new todo (max ${MAX_TITLE_LENGTH} characters)`}
						maxLength={MAX_TITLE_LENGTH}
					/>
				)}
			</form.AppField>

			<form.AppForm>
				<form.SubmitButton label="Send" />
			</form.AppForm>
		</form>
	),
});

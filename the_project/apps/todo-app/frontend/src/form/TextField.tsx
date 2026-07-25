import type { InputHTMLAttributes } from "react";
import { useFieldContext } from "./context";

type NativeProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	"name" | "value" | "onChange" | "onBlur" | "defaultValue"
>;

type TextFieldProps = NativeProps & {
	label: string;
};

export function TextField({ label, id, className, ...rest }: TextFieldProps) {
	const field = useFieldContext<string>();
	const inputId = id ?? `field-${field.name}`;
	const errors = field.state.meta.errors;
	const hasError = errors.length > 0 && field.state.meta.isTouched;

	return (
		<div className="flex flex-col gap-1">
			<label htmlFor={inputId} className="text-sm font-medium text-gray-700">
				{label}
			</label>
			<input
				id={inputId}
				name={field.name}
				value={field.state.value ?? ""}
				onChange={(event) => {
					field.handleChange(event.target.value);
				}}
				onBlur={field.handleBlur}
				aria-invalid={hasError || undefined}
				className={
					className ??
					"rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-500"
				}
				{...rest}
			/>
			{hasError ? (
				<p className="text-xs text-red-600">{errors.map(formatError).join(", ")}</p>
			) : null}
		</div>
	);
}

function formatError(error: unknown): string {
	if (typeof error === "string") return error;
	if (error && typeof error === "object" && "message" in error) {
		return String((error as { message: unknown }).message);
	}
	return String(error);
}

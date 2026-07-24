import type { ButtonHTMLAttributes } from "react";
import { useFormContext } from "./context";

type SubmitButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "children"> & {
	label: string;
	pendingLabel?: string;
};

export function SubmitButton({
	label,
	pendingLabel = "Submitting…",
	className,
	disabled,
	...rest
}: SubmitButtonProps) {
	const form = useFormContext();

	return (
		<form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting] as const}>
			{([canSubmit, isSubmitting]) => (
				<button
					type="submit"
					disabled={disabled || !canSubmit || isSubmitting}
					className={
						className ??
						"rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
					}
					{...rest}
				>
					{isSubmitting ? pendingLabel : label}
				</button>
			)}
		</form.Subscribe>
	);
}

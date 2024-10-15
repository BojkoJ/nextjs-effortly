import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export const FormButton = () => {
	const { pending } = useFormStatus();

	return (
		<Button
			disabled={pending}
			type='submit'
			className='bg-black text-white p-1 ml-3'
		>
			Create
		</Button>
	);
};

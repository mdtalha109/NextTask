"use client"

import { createBoard } from "@/actions/create-board"
import { FormInput } from "@/components/form/form-input"
import { Button } from "@/components/ui/button"
import { useAction } from "@/hooks/use-action"
import { useFormState } from "react-dom"
import { FormSubmit } from "@/components/form/form-submit"

export const Form = () => {

    const initialState = {message: null, errors: {}};
    
   const {execute, fieldErrors} = useAction(createBoard, {
    onSuccess: (data) => {
        console.log("Success");
    },
    onError: (error) => {
        console.log("Error")
    }
   })

   const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({title})
   }

    return (
        <form action={onSubmit}>
            <div className="flex flex-col space-y-2">
                <FormInput 
                    label = "Board Title"
                    id= "title"
                    errors={fieldErrors}
                />
                
            </div>

            <FormSubmit>
                Save
            </FormSubmit>
        </form>
    )
}
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";
import { FaPlus } from "react-icons/fa";

const CreateBoardDialog = ({ setBoards,orgId, loading }: any) => {

  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success("Board created!");
      formRef.current?.reset();
      setIsOpen(false)
      setBoards((prevBoards:any) => [...prevBoards, data]);
    },
    onError: (error) => {
      alert(error);
      console.log("error: ", error);
    }
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    execute({ title, orgId, description, image: "" });
  };

  return (
    <>

{
        !loading && 
          <div
            role="button"
            className="bg-card text-2xl flex justify-center items-center rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 border-2 border-black border-dashed"
            onClick={() => { setIsOpen(true) }}
          >
            <FaPlus />

          </div>
       
      }


    <Dialog open={isOpen} onOpenChange={()=> setIsOpen(false)}>
      <DialogContent>
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create board
        </div>
        <form
          ref={formRef}
          action={onSubmit}
          className="m-1 py-0.5 px-1 space-y-4"
        >
          <FormInput id="title" placeholder="Enter a title for this Board..." />
          <FormTextarea id="description" placeholder="Enter a description for this Board..." />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add Board</FormSubmit>
          </div>
        </form>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default CreateBoardDialog;

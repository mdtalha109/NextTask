"use client";

import { useQuery } from "@tanstack/react-query";

import { CardWithList } from "@/app/types";
import { useCardModal } from "@/hooks/use-card-modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Header } from "@radix-ui/react-accordion";
import { useCreateCardModal } from "@/hooks/use-create-card-modal";
import { ElementRef, KeyboardEventHandler, useRef } from "react";
import { useAction } from "@/hooks/use-action";
import { createCard } from "@/actions/create-card";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { FormTextarea } from "@/components/form/form-textarea";
import { FormSubmit } from "@/components/form/form-submit";
import { Input } from "@/components/ui/input";
import { FormInput } from "@/components/form/form-input";



export const CreateCardModal = () => {
  const listId = useCreateCardModal((state) => state.id);
  const isOpen = useCreateCardModal((state) => state.isOpen);
  const onClose = useCreateCardModal((state) => state.onClose);

  const formRef = useRef<ElementRef<"form">>(null);

  const params = useParams();
  const createCardModal = useCreateCardModal();

  const { execute, fieldErrors } = useAction(createCard, {
    onSuccess: (data) => {
      toast.success(`Card "${data.title}" created`);
      formRef.current?.reset();
      createCardModal.onClose()
    },
    onError: (error) => {
      toast.error(error);
    },
  });

 
  const onTextareakeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const listId = formData.get("listId") as string;
    const boardId = params.boardId as string;

    execute({ title, description, listId, boardId });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent>
      <form
        ref={formRef}
        action={onSubmit}
        className="m-1 py-0.5 px-1 space-y-4"
      >
        <FormInput
          id="title"
          placeholder="Enter a title for this card..."
        />

        <FormTextarea
          id="description"
          placeholder="Enter a description for this card..."
        />

        <input
          hidden
          id="listId"
          name="listId"
          value={listId}
        />
        <div className="flex items-center gap-x-1">
          <FormSubmit>
            Add card
          </FormSubmit>
          {/* <Button onClick={disableEditing} size="sm" variant="ghost">
            <X className="h-5 w-5" />
          </Button> */}
        </div>
      </form>
       
      </DialogContent>
    </Dialog>
  );
};
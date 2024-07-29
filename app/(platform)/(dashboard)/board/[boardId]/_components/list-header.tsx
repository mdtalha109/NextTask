"use client";

import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import { useState, useRef, ElementRef } from "react";

import { FaPlus, FaTrash } from 'react-icons/fa';
import { useAction } from "@/hooks/use-action";
import { FormInput } from "@/components/form/form-input";
import { updateList } from "@/actions/update-list";
import { deleteList } from "@/actions/delete-list";
import { ListWithCards } from "@/app/types";



interface ListHeaderProps {
  data: ListWithCards;
  onAddCard: () => void;
};

export const ListHeader = ({
  data,
  onAddCard,
}: ListHeaderProps) => {
  console.log("data: ", data)
  const [title, setTitle] = useState(data.title?.toUpperCase());
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Renamed to "${data.title}"`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    if (title === data.title) {
      return disableEditing();
    }

    execute({
      title,
      id,
      boardId,
    });
  }

  const onBlur = () => {
    formRef.current?.requestSubmit();
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" deleted`);
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  const onDelete = () => {
    const { id, boardId } = data;
    executeDelete({ id, boardId });
  };

  useEventListener("keydown", onKeyDown);

  return (
    <div className="mb-4 pt-2 px-2 text-sm font-semibold flex justify-between items-start- gap-x-2 ">
      {isEditing ? (
        <form
          ref={formRef}
          action={handleSubmit}
          className="flex-1 px-[2px]"
        >
          <input hidden id="id" name="id" value={data.id} />
          <input hidden id="boardId" name="boardId" value={data.boardId} />
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            placeholder="Enter list title.."
            defaultValue={title}
            className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
          />
          <button type="submit" hidden />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full font-bold px-2.5 py-1 h-7  border-transparent"
        >
          {title} {data?.cards.length}
        </div>
      )}
      <div className="flex items-center gap-4">
        <button
        className="p-2"
          onClick={onAddCard}
        >
          <FaPlus />
        </button>

        <button
          onClick={onDelete}
        >
          <FaTrash />
        </button>
      </div>



    </div>
  );
};
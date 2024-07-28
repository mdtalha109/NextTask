"use client";
import moment from 'moment';
import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";
import { useCardModal } from "@/hooks/use-card-modal";

interface CardItemProps {
  data: Card;
  index: number;
};

export const CardItem = ({
  data,
  index,
}: CardItemProps) => {
  const cardModal = useCardModal();

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => cardModal.onOpen(data.id)}
          className="flex flex-col gap-4 border-dashed border-2 border-grey py-2 px-3 text-sm bg-white rounded-md shadow-sm "
        >
          <div className="text-base font-medium ">{data.title}</div>
          <div className="text-sm line-clamp-4 text-muted-foreground">{data.description}</div>
          <div>{moment(data.createdAt).format('MMMM D, YYYY')}</div>
          
          
        </div>
      )}
    </Draggable>
  );
};
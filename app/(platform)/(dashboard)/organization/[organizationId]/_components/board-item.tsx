import Link from "next/link";
import { Button } from "@/components/ui/button";

const BoardItem = ({ board }: { board: any }) => (
  <Link
    key={board.id}
    href={`/board/${board.id}`}
    className="bg-card flex flex-col justify-between rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 border-2 border-black"
  >
    <div className="p-4">
      <p className="text-xl font-bold">{board.title}</p>
      <p className="text-muted-foreground text-sm">{board.description}</p>
    </div>
    <div className="bg-muted p-4 flex justify-end items-center">
      <Button>View Board</Button>
    </div>
  </Link>
);

export default BoardItem;
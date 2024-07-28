'use client';

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { fetchBoards } from "@/lib/api/fetch-board";
import BoardItem from "./board-item";
import BoardListSkeleton from "./board-list-skeleton";
import BoardListHeader from "./board-list-header";
import CreateBoardDialog from "./create-board-dialog";

export const BoardList = () => {
  const params = useParams();
  const [boards, setBoards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {

    const loadBoards = async () => {
      try {
        setLoading(true);
        const data = await fetchBoards(params.organizationId as string);
        setBoards(data);
      } catch (err) {
        setError('Failed to load boards');
      } finally {
        setLoading(false);
      }
    };

    loadBoards();
  }, [params.organizationId]);

 
  if(loading) return <BoardListSkeleton/>

  return (
    <div className="space-y-4">

    <BoardListHeader/>

    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">

      <CreateBoardDialog setBoards={setBoards} orgId={params.organizationId} loading={loading} />
      {boards.map((board) => (
        <BoardItem board={board}/>
      ))}

    </div>

  </div>
  );
};



'use client'

import { Suspense, useEffect, useState } from "react";

import { Separator } from "@/components/ui/separator";

import { Info } from "./_components/info";
import { BoardList } from "./_components/board-list";
import { useOrganization } from "@/hooks/use-organization";
import { fetchBoards } from "@/lib/api/fetch-board";
import BoardListSkeleton from "./_components/board-list-skeleton";



interface Props {
  params: {
    orgId: string;
  };
}

const OrganizationIdPage = async ({params}:Props) => {

  return (
    <div className="w-full mb-20">
      <Info  />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardListSkeleton />}>
          <BoardList/>
        </Suspense>
      </div>
    </div>
  );
};

export default OrganizationIdPage;
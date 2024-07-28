import { User2 } from "lucide-react";

const BoardListHeader = () => (
    <div className="flex items-center font-semibold text-lg">
        <User2 className="h-6 w-6 mr-2" />
        <div className="font-bold">Your Board</div>
    </div>
);

export default BoardListHeader
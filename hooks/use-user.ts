import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export const useUser = () => {

    const user = useSelector((state: RootState) => state.user);
    return user;
    
  };
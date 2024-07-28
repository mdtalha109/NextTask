interface ListWrapperProps {
    children: React.ReactNode;
  };
  
  export const ListWrapper = ({
    children
  }: ListWrapperProps) => {
    return (
      <li className="shrink-0 min-h-[85vh] w-[272px] select-none">
        {children}
      </li>
    );
  };
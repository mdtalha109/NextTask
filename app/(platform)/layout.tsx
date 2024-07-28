'use client';

import { Toaster } from "sonner";

import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const PlatformLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <Provider store={store}>
      
        <QueryProvider>
          <Toaster />
          <ModalProvider />
          {children}
        </QueryProvider>
    
    </Provider>
  );
};

export default PlatformLayout;

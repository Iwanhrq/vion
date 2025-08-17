import React, { createContext, ReactNode, useContext, useState } from 'react';

export interface Router {
  id: string;
  name: string;
  description: string;
  ip?: string;
  status?: 'Seguro' | 'Atenção' | 'Crítico';
}

interface RouterContextType {
  routers: Router[];
  addRouter: (router: Omit<Router, 'id'>) => void;
  removeRouter: (id: string) => void;
  updateRouter: (id: string, updates: Partial<Router>) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const useRouterContext = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouterContext deve ser usado dentro de um RouterProvider');
  }
  return context;
};

interface RouterProviderProps {
  children: ReactNode;
}

export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
  const [routers, setRouters] = useState<Router[]>([]);

  const addRouter = (routerData: Omit<Router, 'id'>) => {
    const newRouter: Router = {
      ...routerData,
      id: Date.now().toString(),
      ip: routerData.ip || '192.168.1.1',
      status: routerData.status || 'Seguro'
    };
    setRouters(prev => [...prev, newRouter]);
  };

  const removeRouter = (id: string) => {
    setRouters(prev => prev.filter(router => router.id !== id));
  };

  const updateRouter = (id: string, updates: Partial<Router>) => {
    setRouters(prev => prev.map(router => 
      router.id === id ? { ...router, ...updates } : router
    ));
  };

  return (
    <RouterContext.Provider value={{ routers, addRouter, removeRouter, updateRouter }}>
      {children}
    </RouterContext.Provider>
  );
};


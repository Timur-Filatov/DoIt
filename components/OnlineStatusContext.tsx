import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
} from 'react';

interface OnlineStatusContextType {
  isOnline: boolean;
  toggleOnlineStatus: () => void;
}

const OnlineStatusContext = createContext<OnlineStatusContextType | undefined>(
  undefined,
);

export const useOnlineStatus = () => {
  const context = useContext(OnlineStatusContext);
  if (context === undefined) {
    throw new Error(
      'useOnlineStatus must be used within an OnlineStatusProvider',
    );
  }
  return context;
};

export const OnlineStatusProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  const toggleOnlineStatus = useCallback(() => {
    setIsOnline(prevIsOnline => !prevIsOnline);
  }, []);

  return (
    <OnlineStatusContext.Provider value={{isOnline, toggleOnlineStatus}}>
      {children}
    </OnlineStatusContext.Provider>
  );
};

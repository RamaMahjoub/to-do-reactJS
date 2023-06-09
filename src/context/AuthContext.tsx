import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { User } from "../schema/User";

interface Props {
  children: ReactNode;
}

interface IAuthContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  showLoginDialog: boolean;
  setShowLoginDialog: Dispatch<SetStateAction<boolean>>;
  show: () => void;
}
export const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: () => {},
  showLoginDialog: false,
  setShowLoginDialog: () => {},
  show: () => {},
});

export const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [showLoginDialog, setShowLoginDialog] = useState<boolean>(false);

  const show = () => {
    setShowLoginDialog(!user);
  };
  return (
    <AuthContext.Provider
      value={{ user, setUser, showLoginDialog, setShowLoginDialog, show }}
    >
      {children} 
    </AuthContext.Provider>
  );
};

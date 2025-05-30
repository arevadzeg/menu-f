import { AuthResponse } from "../api/hooks/auth/useLogin";
import { atomWithStorage } from "jotai/utils";

interface AuthAtomInterface extends AuthResponse {
  isTurnUserMode: boolean;
}

export const authAtom = atomWithStorage<AuthAtomInterface | null>("user", null);

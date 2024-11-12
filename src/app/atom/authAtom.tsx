import { AuthResponse } from "../api/hooks/auth/useLogin";
import { atomWithStorage } from "jotai/utils";

export const authAtom = atomWithStorage<AuthResponse | null>("user", null);

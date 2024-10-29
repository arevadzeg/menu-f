import { AuthResponse } from "../api/useLogin";
import { atomWithStorage } from "jotai/utils";

export const authAtom = atomWithStorage<AuthResponse | null>("user", null);

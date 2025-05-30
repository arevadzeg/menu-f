import { atomWithStorage } from 'jotai/utils';
import { AuthResponse } from '../api/hooks/auth/useLogin';

interface AuthAtomInterface extends AuthResponse {
  isTurnUserMode: boolean;
}

export const authAtom = atomWithStorage<AuthAtomInterface | null>('user', null);

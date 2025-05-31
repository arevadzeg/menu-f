import { atomWithStorage } from 'jotai/utils';
import { AuthResponse } from '../api/hooks/auth/useLogin';

interface AuthAtomInterface extends AuthResponse {
  isTurnUserMode: boolean;
}

const authAtom = atomWithStorage<AuthAtomInterface | null>('user', null);

export default authAtom;

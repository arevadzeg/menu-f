import { atom } from 'jotai';
import { Product } from '../api/hooks/product/InterfaceProduct';

export const draggingCardAtom = atom<Product | null>(null);

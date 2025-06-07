'use client';

import { atom } from 'jotai';
import { Product } from '../api/hooks/product/InterfaceProduct';

const draggingCardAtom = atom<Product | null>(null);

export default draggingCardAtom;

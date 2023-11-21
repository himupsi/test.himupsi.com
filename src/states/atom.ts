import { atom } from 'recoil';

export const isInitializedAtom = atom({
  key: 'isInitialized',
  default: false,
});

export const userInfoAtom = atom({
  key: 'userInfo',
  default: null as { name: string, avatar: string } | null,
});


export const interactionCountAtom = atom({
  key: 'interactionCount',
  default: 0,
});

'use client';

import { useCallback } from 'react';
import { RecoilRoot, SetRecoilState } from 'recoil';
import RecoilNexus from 'recoil-nexus';

export default function RecoilProvider({
  children,
}: React.PropsWithChildren) {
  return (
    <RecoilRoot>
      <RecoilNexus  />
      {children}
    </RecoilRoot>
  )
}
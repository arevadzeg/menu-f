'use client';

import { useState } from 'react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useGetUserStores } from './api/hooks/store/useGetStore';
import authAtom from './atom/authAtom';

import LandingPageHeader from './components/landingPage/LandingPageHeader/LandingPageHeader';
import LandingPageOffers from './components/landingPage/LandingPageOffers/LandingPageOffers';
import LandingPageFooter from './components/landingPage/LandingPageFooter/LandingPageFooter';
import StoreList from './components/landingPage/StoreList/StoreList';
import CreateStoreModal from './components/landingPage/CreateStoreModal/CreateStoreModal';
import LoginModal from './components/landingPage/LoginModal/LoginModal';
import LandingPageIntro from './components/landingPage/LandingPageIntro/LandingPageIntro';

export default function Page() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCreateStoreModal, setIsCreateStoreModal] = useState(false);

  const [user] = useAtom(authAtom);
  const { data: allStores, isLoading } = useGetUserStores();

  const router = useRouter();

  const isUserLoggedIn = !!user;

  return (
    <div id="landing-page">
      <LandingPageHeader handleLoginClick={() => setIsLoginModalOpen(true)} />
      {isUserLoggedIn
        ? allStores && (
          <StoreList
            isLoading={isLoading}
            allStores={allStores}
            handleOpenCreateStoreModal={() => {
              setIsCreateStoreModal(true);
            }}
            handleNavigateToStore={(name: string) => router.push(`/${name}`)}
          />
        )
        : (
          <>
            <LandingPageIntro />
            <LandingPageOffers />

            <LandingPageFooter />
          </>
        )}
      <LoginModal
        isLoginModalOpen={isLoginModalOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
      />
      <CreateStoreModal
        isCreateStoreModal={isCreateStoreModal}
        setIsCreateStoreModal={setIsCreateStoreModal}
      />
    </div>
  );
}

"use client";
import { useState } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useGetUserStores } from "./api/hooks/store/useGetStore";
import { authAtom } from "./atom/authAtom";

import LandingPageHeader from "./components/landingPage/LandingPageHeader/LandingPageHeader";
import LandingPageOffers from "./components/landingPage/LandingPageOffers/LandingPageOffers";
import LandingPageFooter from "./components/landingPage/LandingPageFooter/LandingPageFooter";
import StoreList from "./components/landingPage/StoreList/StoreList";
import Test from "./components/landingPage/Test/Test";
import CreateStoreModal from "./components/landingPage/CreateStoreModal/CreateStoreModal";
import LoginModal from "./components/landingPage/LoginModal/LoginModal";

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCreateStoreModal, setIsCreateStoreModal] = useState(false);

  const [user] = useAtom(authAtom);
  const { data: allStores, isLoading } = useGetUserStores();

  const router = useRouter();

  const isUserLoggedIn = !!user;

  return (
    <div>
      <LandingPageHeader handleLoginClick={() => setIsLoginModalOpen(true)} />
      {isUserLoggedIn ? (
        <>
          {allStores && (
            <StoreList
              isLoading={isLoading}
              allStores={allStores}
              handleOpenCreateStoreModal={() => {
                setIsCreateStoreModal(true);
              }}
              handleNavigateToStore={(name: string) => router.push(`/${name}`)}
            />
          )}
        </>
      ) : (
        <>
          <div style={{ position: "relative", height: "300vh" }}>
            {[
              "https://ofoodo.com/src/prod/img/section_banners/desktop_banners/qrmenu.png",
              "https://ofoodo.com/src/prod/img/section_banners/desktop_banners/websiteslide.png",
              "https://ofoodo.com/src/prod/img/section_banners/desktop_banners/manage.png",
            ].map((item, index) => (
              <Test item={item} key={index} />
            ))}
          </div>
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

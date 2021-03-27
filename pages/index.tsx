import React, { MutableRefObject, useRef } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import Header from '@components/commons/Header';

import { Modal, useUI } from '@components/ui';
import { isMobile } from '@lib/is-mobile';

const CreditsView = dynamic(() => import('@components/commons/CreditsView'));
const Carpas = dynamic(() => import('@components/home/Carpas'), { ssr: false });
const Adflow = dynamic(() => import('@components/home/Adflow'), { ssr: false });
const Form = dynamic(() => import('@components/home/Form'), { ssr: false });

export default function Home() {
  const { displayModal, closeModal, modalView } = useUI();
  const highestZIndex = useRef<number>(1);

  const bringToFront = (targetRef: MutableRefObject<HTMLDivElement>) => {
    highestZIndex.current = highestZIndex.current + 1;
    targetRef.current.style.zIndex = highestZIndex.current.toString();
  };

  return (
    <>
      <Head>
        <title>Fishy Products by Adflow.ai</title>
        {/* 32 x 32 */}
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>

      <div className="screen">
        <>
          <Header />
          <main className="flex-1 w-full min-h-screen overflow-y-auto sm:overflow-hidden min-w-screen">
            <div className="relative w-full p-3 sm:h-full screen-size">
              <Modal open={displayModal} onClose={closeModal}>
                {modalView === 'CREDITS_VIEW' && <CreditsView />}
              </Modal>

              <Carpas bringToFront={bringToFront} />
              <Adflow bringToFront={bringToFront} />
              <Form bringToFront={bringToFront} />
            </div>
          </main>
        </>
      </div>
    </>
  );
}

'use client';

import { createMouseSpinner, imageAroundMouse } from '../utility/animations';
import React, { useLayoutEffect, useRef } from 'react';
import LogoHotelCentral from '@/components/icons/hotelCentral';
import SmileyRing from '@/components/icons/smiley';
import LogoIconStuttgart from '@/components/icons/logoIconStuttgart';
import Link from 'next/link';
import { PageContent } from '../types/pageContent';
import { PortableText, PortableTextComponents } from '@portabletext/react';

const components: PortableTextComponents = {
	block: {
		normal: ({ children }) => <p className={'mb-10'}>{children}</p>,
	},
};

export default function Festival2024({ content }: { content?: PageContent }) {
	const smileyRef = useRef<any>(null);

	useLayoutEffect(() => {
		if (smileyRef.current) {
			createMouseSpinner(smileyRef.current);
		}
	}, []);

	return (
		<div className={'content pt-[80px]'} onMouseMove={e => imageAroundMouse(e, smileyRef.current)}>
			<div ref={smileyRef} className={'pointer-events-none smiley hidden md:block'}>
				<SmileyRing />
			</div>
			<section className='flex h-full flex-col p-6 md:mb-[10rem]'>
				<div className='text-center text-black heroText'>
					<p className={'italic text-[4rem] leading-[3rem] md:text-[6rem] md:leading-[4.5rem]'}>Festival<br />Hotel<br />Central
					</p>
					<p className={'bold text-[5rem] leading-[3.5rem] md:text-[7rem] md:leading-[4.9rem]'}>Inter<br />Change<br />05.–17.<br />Nov.
						24</p>
				</div>
			</section>
			<section className={'mb-8 md:mb-[10rem]'}>
				<div className={'flex z-20 justify-end mt-14 md:mt-0 md:fixed md:top-1/4 md:right-0 uppercase'}>
					<p className={'p-3 pr-12 md:pr-32 text-[var(--violet)] text-sm bg-white rounded-l-lg'}>Festival für
						Musik,<br />Kultur und
						Austausch<br />in Stuttgart</p>
				</div>
				<div
					className={'flex z-20 justify-start mt-4 md:mt-0 text-right md:text-left md:fixed md:top-1/2 md:left-0 uppercase'}>
					<p className={'p-3 pl-8 md:pl-40 text-[var(--violet)] text-sm bg-white rounded-r-lg'}>
						Kreativ-Workshops,<br />Paneltalks,<br />Live-Konzerte
						<br />und vieles mehr
					</p>
				</div>
			</section>
			<section>
				<SmileyRing
					className={'absolute z-10 -top-[9.5rem] md:top-0 -left-[18rem] md:-left-[8rem] w-[30rem] text-[var(--violet)]'} />
				<SmileyRing className={'absolute -z-10 md:z-40 top-1/2 -right-[8rem] w-[22rem] text-[var(--violet)]'} />
			</section>
			<section className={'flex justify-center py-32 programm'}>
				<div
					className={'w-[50rem] aspect-square bg-[#ebeef2] rounded-full text-center text-black flex flex-col justify-center text-2xl md:text-4xl'}>
					{content && <PortableText value={content.content} components={components} />}
				</div>
			</section>
			<section className={'w-full fixed bottom-0 flex justify-around h-[5rem]'}>
				<div className={'bubble flex w-3/12 md:w-2/12 p-2'}>
					<img src='/icon__initiative--musik.svg' alt='Initiative Musik' className='flex' />
				</div>
				<div className={'bubble flex items-center w-3/12 md:w-2/12 p-2 md:px-6'}>
					<LogoIconStuttgart />
				</div>
				<div className={'bubble flex w-3/12 md:w-2/12 p-2 md:px-8'}>
					<img src='/icon_popbuero.png' alt='Pop-Büro Region Stuttgart' className={'object-contain h-full'} />
				</div>
				<div className={'bubble md:w-4/12 py-2 hidden md:flex'}>
					<SmileyRing className={'text-white h-full'} />
					<SmileyRing className={'text-white h-full'} />
					<SmileyRing className={'text-white h-full'} />
					<SmileyRing className={'text-white hidden sm:block h-full'} />
					<SmileyRing className={'text-white hidden md:block h-full'} />
					<SmileyRing className={'text-white hidden lg:block h-full'} />
					<SmileyRing className={'text-white hidden lg:block h-full'} />
					<SmileyRing className={'text-white hidden lg:block h-full'} />
					<SmileyRing className={'text-white hidden lg:block h-full'} />
				</div>
				<div className={'bubble flex w-3/12 md:w-2/12 p-2'}>
					<Link href={'/'} className={'flex justify-center w-full'}>
						<LogoHotelCentral className={'text-white h-full'} />
					</Link>
				</div>
			</section>
		</div>
	);
}
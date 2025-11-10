'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { NavigationItem } from '../types/navigationItem';

export default function Navigation() {
	const pathname = usePathname();

	const [small, setSmall] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [hideMenu, setHideMenu] = useState(false);

	const active = (pageSlug: string) => pathname === pageSlug;

	const menuItems: NavigationItem[] = [
		{ name: 'Der Verein', href: '/' },
		{ name: 'Vision', href: '/vision' },
		/*{ name: 'Events', href: '/events' },*/
		{
			name: 'Festival', href: 'http://hotelcentral.live', subItems: [
				{ name: '2023', href: '/festival/2023' },
				{ name: '2024', href: '/festival/2024' },
				{ name: '2025', href: 'https://hotelcentral.live/' }
			]
		},
		{
			name: 'Mitglied werden',
			href: '/HotelCentral_230719_Mitgliedschaftsantrag.pdf',
			options: { target: '_blank' }
		},
	];

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', () => {
				const bottomOfPage = window.scrollY > 32 && window.innerHeight + window.scrollY < document.documentElement.scrollHeight - 100;
				setSmall(window.scrollY > 32);
				setHideMenu(window.scrollY > 32);
				setSmall(bottomOfPage);
				setHideMenu(bottomOfPage);
			});
		}

		return () => {
			if (typeof window !== 'undefined') {
				window.removeEventListener('scroll', () => {
					setSmall(window.scrollY > 32);
					setHideMenu(window.scrollY > 32);
				});
			}
		};
	}, []);

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add('overflow-hidden');
		} else {
			document.body.classList.remove('overflow-hidden');
		}
	}, [isOpen]);

	return (
		<>
			<div className={'fixed w-full'}>
				<div className='m-auto flex max-w-screen-lg flex-col'>
					<div
						className={`flex mt-4 justify-center text-black self-center ${
							small ? 'md:w-1/5 w-1/2' : 'md:w-1/3 w-1/2'
						} z-0 ease-in-out duration-300 max-w-xl`}>
						<Link href={'/'}>
							<Image
								src='/wordmark-round.svg'
								width={483}
								height={207}
								alt='Hotel Central Logo'
								className='inline-block'
								unoptimized
							/>
						</Link>
					</div>
				</div>
			</div>
			<nav
				className={`fixed md:w-full md:fixed z-50 top-0 right-0 md:top-[10rem] md:right-auto mx-auto md:flex md:justify-center md:p-4 ${hideMenu ? 'md:hidden' : 'md:block'}`}>
				<div
					className={`md:mx-auto md:max-w-screen-xl bg-[#fbe5e9] md:bg-transparent ${isOpen ? 'w-screen h-screen' : ''}`}>
					<button
						type='button'
						className='absolute z-30 top-6 right-6 inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-black focus:outline-none focus:ring-2 md:hidden'
						onClick={() => setIsOpen(!isOpen)}>
						<span className='sr-only'>Open main menu</span>
						<svg
							className='h-5 w-5'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 17 14'>
							<path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
								  d='M1 1h15M1 7h15M1 13h15' />
						</svg>
					</button>

					<div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
						<ul className='text-center md:text-left text-xl md:text-lg flex flex-col rounded-lg p-4 font-medium rtl:space-x-reverse md:space-x-8 md:mt-0 md:flex-row md:border-0 md:p-0'>
							{menuItems.map((item) => (
								<li key={item.name}
									className={`mt-4 relative ${item.subItems ? 'group dropdown pb-2' : ''}`}>
									<Link href={item.href} target={item.options?.target ?? '_self'}
										  onClick={() => setIsOpen(false)}
										  className={`block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-[#ffa3b5] ${active(item.href) ? 'underline underline-offset-8' : ''}`}>
										{item.name}
									</Link>
									{item.subItems && (
										<div
											className='md:absolute top-8 -left-16 z-10 md:hidden rounded-lg md:bg-white md:shadow dropdown-menu md:group-hover:block'>
											<ul className='flex flex-row text-sm text-gray-700 justify-center'>
												{item.subItems.map((subItem) => (
													<li key={subItem.name}>
														<Link href={subItem.href} onClick={() => setIsOpen(false)}
															  className='block px-4 py-2 hover:bg-[#fbe5e9]'>{subItem.name}</Link>
													</li>
												))}
											</ul>
										</div>
									)}
								</li>
							))}
						</ul>
						<Image
							src='/wordmark-round.svg'
							width={483}
							height={207}
							alt='Hotel Central Logo'
							className={'absolute md:hidden w-1/2 m-auto bottom-[12rem] left-0 right-0'}
							unoptimized
						/>
					</div>
				</div>
			</nav>
		</>
	);
}
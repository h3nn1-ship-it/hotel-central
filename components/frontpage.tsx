import { PageContent } from '../types/pageContent';
import { defineQuery } from 'groq';
import { client, sanityOptions } from '../sanity/client';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { createImageUrlBuilder } from '@sanity/image-url';
import { getImageDimensions, SanityImageSource } from '@sanity/asset-utils';
import Image from 'next/image';

const components = (firstImageKey?: string): PortableTextComponents => ({
	block: {
		normal: ({ children }) => <p>{children}</p>
	},
	types: {
		image: ({ value, renderNode }) => {
			const urlFor = (source: SanityImageSource) => builder.image(source);
			const builder = createImageUrlBuilder(client);
			const { width, height } = getImageDimensions(value);
			return <Image width={width} height={height} src={urlFor(value).width(1200).url()} sizes='528px' alt={value.alt ?? 'Hotel Central'} loading={value._key === firstImageKey ? 'eager' : 'lazy'} className={'self-center'} />;
		}
	}
});

export default async function Frontpage() {
	const CONTENT_QUERY = defineQuery(`*[_type == 'page' && name == 'Frontpage'][0]{headline, content}`);
	const content = await client.fetch<PageContent>(CONTENT_QUERY, {}, sanityOptions);

	return (
		<div
			className='z-10 flex w-10/12 flex-col content-center self-center rounded bg-white p-6 text-center text-black md:max-w-xl'>
			<p className='mb-4 uppercase tracking-wider'>{content?.headline}</p>
			{content && <PortableText value={content.content} components={components([content.content].flat().find((b) => b._type === 'image')?._key)} />}
		</div>
	);
}

import { createClient } from 'next-sanity';

export const sanityOptions = { next: { revalidate: 60 } };

export const client = createClient({
	projectId: '4l6zibbo',
	dataset: 'production',
	apiVersion: '2024-08-11',
	useCdn: false,
});

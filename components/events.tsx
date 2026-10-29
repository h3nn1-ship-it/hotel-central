import { EventContent } from '../types/eventContent';
import { defineQuery } from 'groq';
import { client, sanityOptions } from '../sanity/client';
import EventItem from '@/components/eventItem';

export default async function Events() {
	const EVENT_QUERY = defineQuery(`*[_type == 'event'] | order(date desc) {date, name, location}`);
	const events = await client.fetch<EventContent[]>(EVENT_QUERY, {}, sanityOptions);

	return (
		<>
			{events?.map(({ date, name, location }, index) => (
				<EventItem key={name} index={index} date={date} name={name} location={location} />
			))}
		</>
	);
}
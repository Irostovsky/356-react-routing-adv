import { useLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

function EventDetailPage() {
  const data = useLoaderData();

  const event = data.event;
  return <EventItem event={event} />;
}

export default EventDetailPage;

export async function loader({ params }) {
  const response = await fetch(`http://localhost:8080/events /${params.eventId}`);

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not fetch event." }), { status: 500 });
  }
  return response;
}

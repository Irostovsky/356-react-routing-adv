import { useRouteLoaderData, redirect } from "react-router-dom";
import EventItem from "../components/EventItem";

function EventDetailPage() {
  const data = useRouteLoaderData("event-detail");

  return <EventItem event={data.event} />;
}

export default EventDetailPage;

export async function loader({ params }) {
  const response = await fetch(`http://localhost:8080/events/${params.eventId}`);

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not fetch event." }), { status: 500 });
  }
  return response;
}

export async function action({ params, request }) {
  const response = await fetch(`http://localhost:8080/events/${params.eventId}`, {
    method: request.method,
  });
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not delete event." }), { status: 500 });
  }
  return redirect("/events");
}

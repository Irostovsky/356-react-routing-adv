import { useRouteLoaderData, redirect, Await } from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventDetailPage() {
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>{(loadedEvent) => <EventItem event={loadedEvent} />}</Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>{(loadedEvents) => <EventsList events={loadedEvents} />}</Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;

async function loadEvent(id) {
  const response = await fetch(`http://localhost:8080/events/${id}`);

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not fetch event." }), { status: 500 });
  }

  const data = await response.json();
  return data.event;
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not fetch events." }), { status: 500 });
  }

  const data = await response.json();
  return data.events;
}

export function loader({ params }) {
  return {
    event: loadEvent(params.eventId),
    events: loadEvents(),
  };
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

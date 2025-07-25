import { useRouteLoaderData, redirect } from "react-router-dom";
import EventForm from "../components/EventForm";

function EditEventPage() {
  const data = useRouteLoaderData("event-detail");
  return <EventForm event={data.event} method="patch" />;
}

export default EditEventPage;

export async function action({ request, params }) {
  const data = await request.formData();
  const eventData = {
    title: data.get("title"),
    image: data.get("image"), 
    date: data.get("date"),
    description: data.get("description"),
  };

  const response = await fetch(`http://localhost:8080/events/${params.eventId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not update event." }), { status: 500 });
  }

  return redirect(`/events/${params.eventId}`);
}

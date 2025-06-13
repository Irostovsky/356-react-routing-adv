import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventItem from "../components/EventItem";

function EventDetailPage() {
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await fetch(`http://localhost:8080/events/${params.eventId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch event");
        }
        const data = await response.json();
        setEvent(data.event);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEvent();
  }, [params.eventId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!event) {
    return <p>No event found!</p>;
  }

  return (
    <>
      <EventItem event={event} />
    </>
  );
}

export default EventDetailPage;

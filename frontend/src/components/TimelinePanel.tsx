import { TimelineEvent } from "../types";

interface TimelinePanelProps {
  events: TimelineEvent[];
}

export function TimelinePanel({ events }: TimelinePanelProps) {
  return (
    <section className="timeline-panel" aria-label="戰役時間線">
      <h2>戰役時間線</h2>
      <ol>
        {events.map((eventItem) => (
          <li key={eventItem.id}>
            <time dateTime={eventItem.date}>{eventItem.date}</time>
            <h3>{eventItem.title}</h3>
            <p>{eventItem.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

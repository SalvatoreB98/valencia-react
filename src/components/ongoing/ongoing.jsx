import "./ongoing.css";
export default function Ongoing({ endTime, event }) {
  const orarioFine = endTime.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="ongoing event-status-box mt-3 text-sm text-green-800 bg-green-100 px-3 py-2 rounded-lg inline-block">
      <strong>
        <span>🟢</span> Dovrebbe essere in corso{" "}
      </strong>
      <div>{event.content}</div>
      <div className="italic">fino alle {orarioFine}</div>
    </div>
  );
}

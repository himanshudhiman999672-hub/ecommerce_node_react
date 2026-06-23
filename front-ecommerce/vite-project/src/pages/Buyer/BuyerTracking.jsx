import BuyerShell from "./BuyerShell";

const BuyerTracking = () => {
  return (
    <BuyerShell
      eyebrow="Tracking"
      title="Live tracking"
      description="Use this screen later with WebSocket events like order:status-updated and payment:confirmed."
    >
      <section className="panel">
        <h2>Socket events</h2>
        <ul className="steps">
          <li className="done">Order confirmed</li>
          <li className="done">Packed by seller</li>
          <li>Shipped</li>
          <li>Out for delivery</li>
        </ul>
      </section>
    </BuyerShell>
  );
};

export default BuyerTracking;

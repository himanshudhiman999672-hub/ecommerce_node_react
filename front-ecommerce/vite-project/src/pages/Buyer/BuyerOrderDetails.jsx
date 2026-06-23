import BuyerShell from "./BuyerShell";

const BuyerOrderDetails = () => {
  return (
    <BuyerShell
      eyebrow="Order details"
      title="Order details"
      description="View items, delivery progress, payment status, and support actions for one order."
    >
      <section className="panel">
        <h2>Order summary</h2>
        <div className="order-row">
          <div>
            <strong>Order details unavailable</strong>
            <small>Connect this page to the order details API when ready.</small>
          </div>
        </div>
      </section>
    </BuyerShell>
  );
};

export default BuyerOrderDetails;

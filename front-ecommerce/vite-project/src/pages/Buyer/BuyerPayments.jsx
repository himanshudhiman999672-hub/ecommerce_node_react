import BuyerShell from "./BuyerShell";

const BuyerPayments = () => {
  return (
    <BuyerShell
      eyebrow="Payments"
      title="Payments"
      description="Review payment status, refunds, and invoices for your recent orders."
    >
      <section className="panel">
        <h2>Payment history</h2>
        <div className="order-row">
          <div>
            <strong>No payment records yet</strong>
            <small>Completed checkout payments will appear here.</small>
          </div>
        </div>
      </section>
    </BuyerShell>
  );
};

export default BuyerPayments;

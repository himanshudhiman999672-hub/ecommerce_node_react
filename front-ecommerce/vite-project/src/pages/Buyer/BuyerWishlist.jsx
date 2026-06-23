import BuyerShell from "./BuyerShell";

const BuyerWishlist = () => {
  return (
    <BuyerShell
      eyebrow="Wishlist"
      title="Wishlist"
      description="Keep saved products in one place and move them to cart when you are ready."
    >
      <section className="panel">
        <h2>Saved products</h2>
        <div className="order-row">
          <div>
            <strong>Your wishlist is empty</strong>
            <small>Products you save will show up here.</small>
          </div>
        </div>
      </section>
    </BuyerShell>
  );
};

export default BuyerWishlist;

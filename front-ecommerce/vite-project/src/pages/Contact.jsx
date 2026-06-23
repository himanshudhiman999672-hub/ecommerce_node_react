const Contact = () => {
  return (
    <>
      <section className="band">

        <div className="mx-auto max-w-7xl px-5">

          <p className="text-sm font-black uppercase tracking-normal text-emerald-700">
            Contact
          </p>

          <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">

            <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
              Talk to support
            </h1>

          </div>
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-6 px-5 md:grid-cols-2">

          <form className="panel">

            <input
              placeholder="Name"
            />

            <input
              placeholder="Email"
            />

            <textarea
              placeholder="Message"
            ></textarea>

            <button
              type="submit"
              className="btn-dark mt-3"
            >
              Send message
            </button>

          </form>

          <div className="panel">

            <h2>Support hours</h2>

            <p>
              Monday to Saturday, 9:00 AM to 7:00 PM.
            </p>

            <p className="mt-3">
              Email: support@marketlane.example
            </p>

          </div>

        </div>

      </section>
    </>
  );
};

export default Contact;
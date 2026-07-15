function WhyChooseUs() {
  const features = [
    {
      icon: "🚚",
      title: "Free Delivery",
      desc: "Fast delivery across India on all eligible orders.",
    },
    {
      icon: "🔒",
      title: "Secure Payment",
      desc: "100% safe and secure payment gateway.",
    },
    {
      icon: "↩️",
      title: "Easy Return",
      desc: "7-day hassle-free return and replacement.",
    },
    {
      icon: "🎧",
      title: "24×7 Support",
      desc: "Our support team is always ready to help you.",
    },
  ];

  return (
    <section
      className="py-5"
      style={{
        background: "#111827",
      }}
    >
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="fw-bold text-warning">
            Why Choose ShopEase?
          </h2>

          <p className="text-light">
            We make your shopping experience simple, fast and secure.
          </p>
        </div>

        <div className="row g-4">

          {features.map((item, index) => (
            <div
              className="col-lg-3 col-md-6"
              key={index}
            >
              <div
                className="card border-0 text-center h-100 shadow"
                style={{
                  background: "#1e293b",
                  color: "#fff",
                  borderRadius: "18px",
                  transition: "0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-8px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0)";
                }}
              >
                <div className="card-body p-4">

                  <div
                    style={{
                      fontSize: "55px",
                    }}
                  >
                    {item.icon}
                  </div>

                  <h4 className="mt-3">
                    {item.title}
                  </h4>

                  <p className="text-secondary mt-3">
                    {item.desc}
                  </p>

                </div>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;
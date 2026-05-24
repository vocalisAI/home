import React, { useState } from "react";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      name: "Starter",
      monthlyPrice: 299,
      yearlyPrice: 239,
      minutes: "1,500",
      target: "Solo / New Clinic",
      features: [
        "1,500 included minutes/mo",
        "AI Voice Receptionist",
        "Automated Appointment Booking",
        "EHR Calendar Integration",
        "HIPAA-Compliant Infrastructure",
        "Email & Chat Support",
      ],
    },
    {
      name: "Standard",
      monthlyPrice: 499,
      yearlyPrice: 399,
      minutes: "3,000",
      target: "1-2 Provider Clinic",
      popular: true,
      features: [
        "3,000 included minutes/mo",
        "AI Voice Receptionist",
        "Automated Appointment Booking",
        "EHR Calendar Integration + Auto-Sync",
        "HIPAA-Compliant Infrastructure",
        "Custom Voice Personality Tuning",
        "Priority Support Hotline",
      ],
    },
    {
      name: "Growth",
      monthlyPrice: 899,
      yearlyPrice: 719,
      minutes: "6,000",
      target: "Multi-provider / Large practices",
      features: [
        "6,000 included minutes/mo",
        "AI Voice Receptionist",
        "Automated Appointment Booking",
        "Multi-Location EHR Calendar Mapping",
        "HIPAA-Compliant Infrastructure",
        "Dedicated Voice Model",
        "24/7 Dedicated Support Line",
      ],
    },
  ];

  const isYearly = billingCycle === "yearly";

  return (
    <section
      id="pricing"
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        padding: "5rem 0",
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="text-center mb-3">
          <h2 className="display-5 fw-bold mb-3" style={{ color: "#1e293b" }}>
            Simple, Transparent Pricing
          </h2>
          <p
            className="lead mx-auto mb-0"
            style={{ maxWidth: 820, color: "#64748b" }}
          >
            Every plan includes a custom-built knowledge base trained on your clinic — so Vocalis sounds like it's always been part of your team.
          </p>
        </div>

        {/* Toggle */}
        <div className="d-flex align-items-center justify-content-center mb-5 gap-3">
          <span
            style={{
              fontWeight: 600,
              color: isYearly ? "#94a3b8" : "#1e293b",
              cursor: "pointer",
              transition: "color .3s",
            }}
            onClick={() => setBillingCycle("monthly")}
          >
            Monthly
          </span>

          <button
            type="button"
            aria-label="Toggle billing cycle"
            onClick={() => setBillingCycle(isYearly ? "monthly" : "yearly")}
            style={{
              width: 56,
              height: 30,
              borderRadius: 99,
              border: "none",
              padding: 3,
              cursor: "pointer",
              background: isYearly ? "#38b2ac" : "#cbd5e1",
              transition: "background .35s",
              outline: "none",
            }}
          >
            <span
              style={{
                display: "block",
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "#fff",
                boxShadow: "0 1px 4px rgba(0,0,0,.18)",
                transform: isYearly ? "translateX(26px)" : "translateX(0)",
                transition: "transform .3s cubic-bezier(.34,1.56,.64,1)",
              }}
            />
          </button>

          <span
            style={{
              fontWeight: 600,
              color: isYearly ? "#1e293b" : "#94a3b8",
              cursor: "pointer",
              transition: "color .3s",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
            onClick={() => setBillingCycle("yearly")}
          >
            Yearly
            <span
              style={{
                background: "#38b2ac",
                color: "#fff",
                fontSize: ".68rem",
                fontWeight: 700,
                letterSpacing: ".8px",
                padding: "3px 10px",
                borderRadius: 99,
              }}
            >
              SAVE 20%
            </span>
          </span>
        </div>

        {/* Cards */}
        <div className="row justify-content-center align-items-stretch g-4">
          {plans.map((plan) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const yearlySavings = (plan.monthlyPrice - plan.yearlyPrice) * 12;

            return (
              <div key={plan.name} className="col-lg-4 col-md-6 d-flex">
                <div
                  style={{
                    width: "100%",
                    borderRadius: "1.25rem",
                    border: plan.popular
                      ? "2px solid #38b2ac"
                      : "1px solid #e2e8f0",
                    background: "#ffffff",
                    overflow: "visible",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    zIndex: plan.popular ? 2 : 1,
                    boxShadow: plan.popular
                      ? "0 12px 40px rgba(56,178,172,.15), 0 4px 16px rgba(0,0,0,.06)"
                      : "0 4px 20px rgba(0,0,0,.06)",
                    transition: "transform .3s, box-shadow .3s",
                  }}
                >
                  {plan.popular && (
                    <div
                      style={{
                        position: "absolute",
                        top: -14,
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "linear-gradient(135deg, #38b2ac, #319795)",
                        padding: "5px 20px",
                        borderRadius: 99,
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: ".72rem",
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                        boxShadow: "0 4px 12px rgba(56,178,172,.3)",
                      }}
                    >
                      Most Popular
                    </div>
                  )}

                  <div
                    style={{
                      padding: "2rem 1.75rem",
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                    }}
                  >
                    {/* Name + target */}
                    <h3
                      style={{
                        fontWeight: 700,
                        color: "#1e293b",
                        marginBottom: 4,
                        fontSize: "1.35rem",
                      }}
                    >
                      {plan.name}
                    </h3>
                    <p
                      style={{
                        color: "#94a3b8",
                        fontSize: ".85rem",
                        marginBottom: "1.25rem",
                      }}
                    >
                      {plan.target}
                    </p>

                    {/* Price */}
                    <div style={{ marginBottom: "1.25rem" }}>
                      <span
                        style={{
                          fontSize: "3rem",
                          fontWeight: 800,
                          color: "#1e293b",
                          lineHeight: 1,
                        }}
                      >
                        ${price}
                      </span>
                      <span style={{ color: "#94a3b8", marginLeft: 6 }}>/mo</span>
                      {isYearly && (
                        <div
                          style={{
                            color: "#38b2ac",
                            fontSize: ".82rem",
                            fontWeight: 600,
                            marginTop: 6,
                          }}
                        >
                          Save ${yearlySavings.toLocaleString()}/yr — billed annually
                        </div>
                      )}
                    </div>

                    {/* Divider */}
                    <div
                      style={{
                        height: 1,
                        background: "#f1f5f9",
                        marginBottom: "1.25rem",
                      }}
                    />

                    {/* Features */}
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        flex: 1,
                        marginBottom: "1.5rem",
                      }}
                    >
                      {plan.features.map((f, i) => (
                        <li
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            marginBottom: 10,
                            gap: 10,
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 20 20"
                            fill="#38b2ac"
                            style={{ flexShrink: 0, marginTop: 2 }}
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span
                            style={{
                              color: "#475569",
                              fontSize: ".88rem",
                              lineHeight: 1.4,
                            }}
                          >
                            {f}
                          </span>
                        </li>
                      ))}
                      <li
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 10,
                          marginTop: 4,
                        }}
                      >
                        <span
                          style={{
                            color: "#94a3b8",
                            fontSize: ".82rem",
                            paddingLeft: 26,
                          }}
                        >
                          + $0.12/min overage
                        </span>
                      </li>
                    </ul>

                    {/* CTA */}
                    <a
                      href="#contact"
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "center",
                        padding: "12px 0",
                        borderRadius: 99,
                        fontWeight: 700,
                        fontSize: ".95rem",
                        textDecoration: "none",
                        transition: "all .3s",
                        ...(plan.popular
                          ? {
                              background: "linear-gradient(135deg, #38b2ac, #319795)",
                              color: "#fff",
                              border: "none",
                              boxShadow: "0 6px 20px rgba(56,178,172,.25)",
                            }
                          : {
                              background: "transparent",
                              color: "#38b2ac",
                              border: "2px solid #38b2ac",
                            }),
                      }}
                    >
                      Get Started
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

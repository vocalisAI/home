import React, { useState } from "react";

const FAQ = () => {
  const [openItem, setOpenItem] = useState(null);

  const faqItems = [
    {
      id: 1,
      question: "Will Vocalis replace my staff?",
      answer: "Not at all. Vocalis is designed to enhance your team's capacity, not replace it. Think of it as a virtual assistant that handles repetitive, high-volume tasks — like answering routine questions, managing appointment scheduling, and triaging calls — so your staff can focus on delivering high-quality, in-person care.\n\nBy offloading these time-consuming duties, Vocalis helps reduce burnout, minimize disruptions, and ensure no call goes unanswered — all without adding to your payroll. Clinics using Vocalis consistently report smoother workflows, improved staff morale, and a better overall patient experience."
    },
    {
      id: 2,
      question: "Is Vocalis secure and HIPAA-compliant?",
      answer: "Yes. Vocalis was built with HIPAA compliance at its core. All data is encrypted in transit and at rest, and we don't use any protected health information (PHI) to train our models. Role-based access and detailed audit logs ensure only the right people see the right information. We also offer a downloadable compliance overview for your legal or IT team."
    },
    {
      id: 3,
      question: "What happens if multiple patients call at once?",
      answer: "Vocalis can handle multiple simultaneous calls — something a human receptionist can't. Each caller gets an immediate, personalized experience, even during peak hours. No hold music. No voicemail runaround."
    },
    {
      id: 4,
      question: "Is Vocalis available 24/7?",
      answer: "Yes. Vocalis answers calls day and night, including weekends and holidays. If your front desk is busy, or closed, we're still picking up the phone and helping your patients."
    },
    {
      id: 5,
      question: "Will it integrate with my existing systems?",
      answer: "Yes, Vocalis is built to integrate seamlessly with most major scheduling platforms and electronic health record (EHR) systems through secure, HIPAA-compliant APIs. During onboarding, our team works closely with your clinic to ensure everything connects smoothly — with minimal disruption to your existing workflows. Whether you're using a popular system or a custom setup, we'll tailor the integration to fit your needs."
    },
    {
      id: 6,
      question: "How long does it take to get started?",
      answer: "Most clinics are up and running in less than a week. We offer onboarding support, live testing, and real-time adjustments to make sure everything fits your workflow from day one."
    },
    {
      id: 7,
      question: "Is Vocalis a tax write-off for our practice?",
      answer: "Yes. Vocalis is a fully deductible business expense under IRC § 162(a), which allows businesses to deduct all \"ordinary and necessary\" operating costs. Since Vocalis is billed as a monthly or annual software subscription, the full cost is deducted in the same year you pay for it, meaning no depreciation schedule is needed. Medical and dental practices are among the most-cited beneficiaries of this deduction, and AI tools used for patient communication and clinic operations qualify directly. This means your practice is not just cutting front-desk costs, it is actively reducing its taxable income and keeping more revenue inside the business."
    },
    {
      id: 8,
      question: "Can we deduct Vocalis under Section 179, and how does it help our bottom line?",
      answer: "Yes. If your practice opts for an annual license agreement, Vocalis qualifies as off-the-shelf software under IRC § 179, allowing you to deduct the full cost in Year 1. Under IRC § 168(k), assets placed in service after January 19, 2025 are also eligible for 100% bonus depreciation. Beyond the tax savings, Vocalis reduces the need for additional front-desk staff, lowers missed call rates, and keeps your schedule full. This means every dollar you invest in Vocalis works twice: once by generating more booked appointments, and again by coming back to you as a tax deduction. We recommend consulting your CPA to determine the best deduction method for your practice."
    }
  ];

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-5" style={{background:'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'}}>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 mb-3 fw-bold">Frequently Asked Questions (FAQ)</h2>
          <p className="lead mb-5">Got questions? You're not alone. Here are some of the most common things clinics ask us about Vocalis — and our answers.</p>
        </div>
        
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="accordion" id="faqAccordion">
              {faqItems.map((item) => (
                <div key={item.id} className="accordion-item border-0 mb-3 shadow-sm">
                  <h2 className="accordion-header" id={`heading${item.id}`}>
                    <button
                      className={`accordion-button ${openItem === item.id ? '' : 'collapsed'} fw-semibold`}
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      aria-expanded={openItem === item.id}
                      aria-controls={`collapse${item.id}`}
                      style={{
                        background: openItem === item.id 
                          ? 'linear-gradient(135deg, #667eea, #764ba2)' 
                          : 'white',
                        color: openItem === item.id ? 'white' : '#333',
                        border: 'none',
                        borderRadius: '10px'
                      }}
                    >
                      {item.question}
                    </button>
                  </h2>
                  <div
                    id={`collapse${item.id}`}
                    className={`accordion-collapse collapse ${openItem === item.id ? 'show' : ''}`}
                    aria-labelledby={`heading${item.id}`}
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body p-4" style={{background: 'white', borderRadius: '0 0 10px 10px'}}>
                      <p className="mb-0" style={{whiteSpace: 'pre-line'}}>{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

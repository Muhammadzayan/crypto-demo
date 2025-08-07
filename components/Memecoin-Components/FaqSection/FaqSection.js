
import React, { useEffect } from 'react';

const faqData = [
  {
    question: "What is Meme Coinlye and How Does It Impact Crypto?",
    answer: "Meme Coinlye is a fun, community-driven cryptocurrency designed to blend innovation, value, and meme culture on the blockchain.",
    id: 1,
  },
  {
    question: "What makes meme coinlye unique and how does it work?",
    answer: "Meme CoinLye combines meme culture with utility, offering fast transactions, low fees, and community-driven value on a decentralized blockchain.",
    id: 2,
  },
  {
    question: "How do I store my meme coinlye tokens safely?",
    answer: "Store Meme CoinLye tokens in a secure hardware or software wallet, enable two-factor authentication, and back up your recovery phrase.",
    id: 3,
  },
  {
    question: "How can I buy meme coinlye and begin investing in crypto?",
    answer: "To buy Meme CoinLye, sign up on an exchange, deposit funds, place an order, and store your coins securely. Always research before investing.",
    id: 4,
  },
  {
    question: "Is meme coinlye available globally and accessible to all?",
    answer: "Yes, Meme CoinLye is globally accessible and can be traded on supported exchanges from anywhere.",
    id: 5,
  },
  {
    question: "What’s the future of meme coinlye and its growth?",
    answer: "Meme CoinLye's future looks promising, with growth driven by adoption, community support, and increased use cases in the crypto space.",
    id: 6,
  },
];

const FAQSection = () => {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);
  
  return (
    <section id="id_faq_section" className="faq_section section_space pb-0 position-relative z-2">
      <div className="container">
        <div className="memecoin_heading_block text-center" data-aos="fade-up" data-aos-duration="800">
          <h2 className="heading_text text-uppercase mb-0">FAQ</h2>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <div className="meme_accordion" id="accordion_1">
              {faqData.slice(0, 3).map((faq, index) => (
                <div className="accordion-item" data-aos="fade-up" data-aos-duration="800" data-aos-delay={`${100 * (index + 1)}`} key={faq.id}>
                  <div className="accordion-button collapsed" role="button" data-bs-toggle="collapse" data-bs-target={`#collapse_${faq.id}`} aria-expanded="false" aria-controls={`collapse_${faq.id}`}>
                    <span className="icon">
                      <i className="fa-solid fa-plus"></i>
                    </span>
                    {faq.question}
                  </div>
                  <div id={`collapse_${faq.id}`} className="accordion-collapse collapse" data-bs-parent="#accordion_1">
                    <div className="accordion-body">
                      <p className="mb-0">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-6">
            <div className="meme_accordion" id="accordion_2">
              {faqData.slice(3).map((faq, index) => (
                <div className="accordion-item" data-aos="fade-up" data-aos-duration="800" data-aos-delay={`${100 * (index + 1)}`} key={faq.id}>
                  <div className="accordion-button collapsed" role="button" data-bs-toggle="collapse" data-bs-target={`#collapse_${faq.id}`} aria-expanded="false" aria-controls={`collapse_${faq.id}`}>
                    <span className="icon">
                      <i className="fa-solid fa-plus"></i>
                    </span>
                    {faq.question}
                  </div>
                  <div id={`collapse_${faq.id}`} className="accordion-collapse collapse" data-bs-parent="#accordion_2">
                    <div className="accordion-body">
                      <p className="mb-0">{faq.answer}</p>
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

export default FAQSection;

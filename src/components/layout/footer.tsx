import { NewsletterForm } from "@/components/forms/newsletter-form";

const desktopColumns: [string, string[]][] = [
  ["Contact Us", ["Book Appointment", "Visit Our Stores", "Email Us", "Contact Us", "Schedule a consultation"]],
  ["The Art of Gifting", ["Luxury Gift Wrapping", "Gift Cards", "Private & White-Glove Delivery"]],
  ["Bespoke & Services", ["Custom Jewelry Design", "Private Jewelry Consultations", "Jewelry Restoration & Care"]],
];
const mobileColumns: [string, string[]][] = [
  ["Contact Us", ["Blog", "Lab Grown Diamond Guide", "Moissanite vs. Diamond Guide", "Ring Size Guide"]],
  ["The Art of gifting", ["Book Appointment", "Visit Our Stores", "Email Us", "Contact Us", "Schedule a consultation"]],
  ["bespoke & services", ["Warranty", "Repairs & Returns", "FAQs", "Track Your Order", "Jewelry Insurance"]],
];
const payments = ["visa", "mastercard", "amex", "applepay", "tabby"] as const;

export function Footer() {
  return (
    <footer className="site-footer" id="contact-us">
      <div className="canvas">
      {desktopColumns.map(([title, links]) => (
        <div className="footer-col footer-col--desktop" key={`d-${title}`}>
          <h2>{title}</h2>
          <ul>{links.map((link, index) => <li key={`${link}-${index}`}><a href="#">{link}</a></li>)}</ul>
        </div>
      ))}
      {mobileColumns.map(([title, links]) => (
        <div className="footer-col footer-col--mobile" key={`m-${title}`}>
          <h2>{title}</h2>
          <ul>{links.map((link, index) => <li key={`${link}-${index}`}><a href="#">{link}</a></li>)}</ul>
        </div>
      ))}
      <div className="footer-news">
        <h2>Let’s Keep In Touch</h2>
        <NewsletterForm />
        <div className="payments">
          <h2>Payment Methods</h2>
          {payments.map((name) => (
            <picture key={name}>
              <source media="(max-width: 767px)" srcSet={`/assets/m-payment-${name}.svg`} />
              <img src={`/assets/payment-${name}.svg`} alt={name} />
            </picture>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025, All Rights Reserved - MyJewel</p>
        <a href="#">Terms &amp; Conditions</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Site Map</a>
        <div className="footer-social">
          <picture><source media="(max-width: 767px)" srcSet="/assets/m-footer-facebook.svg" /><img src="/assets/footer-facebook.svg" alt="Facebook" /></picture>
          <picture><source media="(max-width: 767px)" srcSet="/assets/m-footer-instagram.svg" /><img src="/assets/footer-instagram.svg" alt="Instagram" /></picture>
        </div>
      </div>
      </div>
    </footer>
  );
}

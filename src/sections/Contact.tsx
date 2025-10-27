import React from "react";
import "../sections/Contact.css";

export default function Contact() {
  return (
    <section className="contact-section" id="contact">
      <h2>Contact</h2>
      <div className="contact-container">
        <div className="contact-info">
          <p>
            <strong>Phone:</strong>{" "}
            <a href="tel:+17869739242">(786) 973-9242</a>
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:kenshinjuku21@gmail.com">
              kenshinjuku21@gmail.com
            </a>
          </p>
          <p>
            <strong>Address:</strong> 17122 W Dixie Highway,<br />
            North Miami Beach, FL 33160
          </p>
        </div>

        <div className="map-container">
          <iframe
            title="dojo-location"
            width="100%"
            height="250"
            style={{ border: 0, borderRadius: "8px" }}
            loading="lazy"
            allowFullScreen
            src="https://www.google.com/maps?q=17122+W+Dixie+Highway,+North+Miami+Beach,+FL+33160&output=embed"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
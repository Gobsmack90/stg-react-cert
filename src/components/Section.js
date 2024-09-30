import { Link } from "react-router-dom";
import "./Section.css";

const Section = ({ heading, details, url, img }) => {
  return (
    <section className="sectionContainer">
      <Link to={url}>
        <h2 className="sectionHead">{heading}</h2>
      </Link>
      <p>{details}</p>
    </section>
  );
};

export default Section;

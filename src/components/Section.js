import { Link } from "react-router-dom";
import "./Section.css";

const Section = ({ heading, details, url, img, leftSide }) => {
  const sectionImage = (
    <img
      className="sectionImg"
      src={img}
      alt="Chuck Norris"
      width="100"
      height="100"
    />
  );
  return (
    <Link to={url}>
      <section className={leftSide ? "left section" : "right section"}>
        {leftSide && sectionImage}
        <div className="sectionInfo">
          <h2 className="sectionHead">{heading}</h2>
          <p>{details}</p>
        </div>
        {!leftSide && sectionImage}
      </section>
    </Link>
  );
};

export default Section;

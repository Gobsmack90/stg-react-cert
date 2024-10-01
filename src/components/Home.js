import { useAuth } from "./AuthProvider";
import ContentWrapper from "./ContentWrapper";
import { Link } from "react-router-dom";
import "./Home.css";

//create array of objects that contain details needed for sections. heading, details, url, img
const sectionArr = [
  {
    heading: "Categories",
    details: "A list of all joke categories.",
    url: "/categories",
    img: "https://imgur.com/P3dBnWi.jpeg",
  },
  {
    heading: "Search",
    details: "Search for a specific joke.",
    url: "/search",
    img: "https://imgur.com/7rGJS0S.jpeg",
  },
  {
    heading: "Jokes",
    details: "See a funny joke.",
    url: "/jokes",
    img: "https://imgur.com/qPcIHOz.jpeg",
  },
];

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

const Home = () => {
  let auth = useAuth();

  const sectionMap = sectionArr.map((section, i) => {
    const isOdd = (num) => num % 2 === 1;
    return (
      <Section
        key={i}
        heading={section.heading}
        details={section.details}
        url={section.url}
        img={section.img}
        leftSide={isOdd(i)}
      />
    );
  });

  return (
    <ContentWrapper title="Home">
      <div className="home">
        <h1 className="welcomeHome">
          Welcome {auth.user ? auth.user.email + ", " : ""} to Chuck Norris
          Jokes!
        </h1>
        <div className="sections">{sectionMap}</div>
      </div>
    </ContentWrapper>
  );
};

export default Home;

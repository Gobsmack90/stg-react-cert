import { useAuth } from "./AuthProvider";
import ContentWrapper from "./ContentWrapper";
import { Link } from "react-router-dom";
import "./Home.css";
import NorrisThumb, { shuffledNorrisImageIndexes } from "./NorrisThumb";

//create array of objects that contain details needed for sections. heading, details, url, img
const sectionArr = [
  {
    heading: "Categories",
    details: "A list of all joke categories.",
    url: "/categories",
  },
  {
    heading: "Search",
    details: "Search for a specific joke.",
    url: "/search",
  },
  {
    heading: "Jokes",
    details: "See a funny joke.",
    url: "/jokes",
  },
];

const Section = ({ heading, details, url, leftSide, index }) => {
  return (
    <Link to={url}>
      <section className={leftSide ? "left section" : "right section"}>
        {leftSide && <NorrisThumb chosenIndex={index} />}
        <div className="sectionInfo">
          <h2 className="sectionHead">{heading}</h2>
          <p>{details}</p>
        </div>
        {!leftSide && <NorrisThumb chosenIndex={index} />}
      </section>
    </Link>
  );
};

const Home = () => {
  let auth = useAuth();

  let randomIndexArr = shuffledNorrisImageIndexes(3);

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
        index={randomIndexArr[i]}
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
        <div>{sectionMap}</div>
      </div>
    </ContentWrapper>
  );
};

export default Home;

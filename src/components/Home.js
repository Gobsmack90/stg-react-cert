import { useAuth } from "./AuthProvider";
import "./Home.css";
import Section from "./Section";

//create array of objects that contain details needed for sections. heading, details, url, img
const sectionArr = [
  {
    heading: "Categories",
    details: "A list of all joke categories.",
    url: "/categories",
    img: "",
  },
  {
    heading: "Search",
    details: "Search for a specific joke.",
    url: "/search",
    img: "",
  },
  {
    heading: "Jokes",
    details: "See a funny joke.",
    url: "/jokes",
    img: "",
  },
];

const Home = () => {
  let auth = useAuth();

  const sectionMap = sectionArr.map((section, i) => {
    let isOdd = i % 2;
    return (
      <Section
        key={i}
        heading={section.heading}
        details={section.details}
        url={section.url}
        img={section.img}
        leftSide={isOdd}
      />
    );
  });

  return (
    <div className="home">
      <h1 className="welcomeHome">
        Welcome {auth.user ? auth.user.email + ", " : ""} to Chuck Norris Jokes!
      </h1>
      {sectionMap}
    </div>
  );
};

export default Home;

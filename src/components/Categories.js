import React, { useEffect, useState } from "react";
import ContentWrapper from "./ContentWrapper";
import "./Categories.css";
import NorrisThumb, { shuffledNorrisImageIndexes } from "./NorrisThumb";
import JokeModal from "./JokeModal";
import { useSelector } from "react-redux";

const Category = ({ cat, randomIndex, setSelectedCategory }) => {
  return (
    <section className="categoryInfo" onClick={() => setSelectedCategory(cat)}>
      <NorrisThumb chosenIndex={randomIndex} />
      <h2 className="categoryHead">{cat}</h2>
    </section>
  );
};

/* The Utilize Hooks step wants me to convert a class component into a functional component.
Additionally, modern Redux is assuming the use of functional components. So I've converted it early. */
const Categories = () => {
  const categories = useSelector((state) => state.categories);

  const [randomIndexes, setRandomIndexes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  //Get Api when component mounts.
  useEffect(() => {
    if (categories.length) {
      setRandomIndexes(shuffledNorrisImageIndexes(categories.length));
    }
  }, [categories]);

  return (
    <ContentWrapper title="Categories">
      <div className={selectedCategory ? "categoryList blur" : "categoryList"}>
        {categories.map((e, i) => (
          <Category
            cat={e}
            key={i}
            randomIndex={randomIndexes[i]}
            setSelectedCategory={setSelectedCategory}
          />
        ))}
      </div>
      {selectedCategory && (
        <JokeModal
          category={selectedCategory}
          setCategory={setSelectedCategory}
        />
      )}
    </ContentWrapper>
  );
};

export default Categories;

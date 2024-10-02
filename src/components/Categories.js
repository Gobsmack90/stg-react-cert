import React from "react";
import ContentWrapper from "./ContentWrapper";
import "./Categories.css";
import Button from "./Button";
import NorrisThumb, { shuffledNorrisImageIndexes } from "./NorrisThumb";

const Category = ({ cat, randomIndex }) => {
  const showJoke = () => console.log("hit");

  return (
    <section>
      <div className="categoryInfo" onClick={showJoke}>
        <NorrisThumb chosenIndex={randomIndex} />
        <h2 className="categoryHead">{cat}</h2>
      </div>
    </section>
  );
};

class Categories extends React.Component {
  constructor() {
    super();
    this.state = { categories: [], randomIndexes: [] };
  }
  setCategories = (newCategories) => {
    this.setState({ categories: newCategories });
  };

  setRandomIndexes = (newIndexArr) => {
    this.setState({ randomIndexes: newIndexArr });
  };

  //Get Api when component mounts.
  componentDidMount() {
    fetch("https://api.chucknorris.io/jokes/categories")
      .then((response) => response.json())
      .then((json) => {
        this.setRandomIndexes(shuffledNorrisImageIndexes(json.length));
        return this.setCategories(json);
      })
      .catch((error) => console.error(error));
  }

  render() {
    return (
      <ContentWrapper title="Categories">
        <div className="categoryList">
          {this.state.categories.map((e, i) => (
            <Category
              cat={e}
              key={i}
              randomIndex={this.state.randomIndexes[i]}
            />
          ))}
        </div>
      </ContentWrapper>
    );
  }
}

export default Categories;

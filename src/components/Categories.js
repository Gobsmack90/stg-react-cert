import React from "react";
import ContentWrapper from "./ContentWrapper";
import "./Categories.css";
import NorrisThumb, { shuffledNorrisImageIndexes } from "./NorrisThumb";
import JokeModal from "./JokeModal";

const Category = ({ cat, randomIndex, setSelectedCategory }) => {
  return (
    <section className="categoryInfo" onClick={() => setSelectedCategory(cat)}>
      <NorrisThumb chosenIndex={randomIndex} />
      <h2 className="categoryHead">{cat}</h2>
    </section>
  );
};

class Categories extends React.Component {
  constructor() {
    super();
    this.state = { categories: [], randomIndexes: [], selectedCategory: null };
  }
  setCategories = (newCategories) => {
    this.setState({ categories: newCategories });
  };

  setRandomIndexes = (newIndexArr) => {
    this.setState({ randomIndexes: newIndexArr });
  };

  setSelectedCategory = (category) => {
    this.setState({ selectedCategory: category });
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
        <div
          className={
            this.state.selectedCategory ? "categoryList blur" : "categoryList"
          }
        >
          {this.state.categories.map((e, i) => (
            <Category
              cat={e}
              key={i}
              randomIndex={this.state.randomIndexes[i]}
              setSelectedCategory={this.setSelectedCategory}
            />
          ))}
        </div>
        {this.state.selectedCategory && (
          <JokeModal
            category={this.state.selectedCategory}
            setCategory={this.setSelectedCategory}
          />
        )}
      </ContentWrapper>
    );
  }
}

export default Categories;

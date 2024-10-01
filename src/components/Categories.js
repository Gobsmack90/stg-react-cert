import React from "react";
import ContentWrapper from "./ContentWrapper";
import "./Categories.css";

const Category = ({ cat }) => {
  const showJoke = () => console.log("hit");

  return (
    <section>
      <div className="categoryInfo">
        <h2 className="categoryHead">{cat}</h2>
        <button className="showJoke" type="button" onClick={showJoke}>
          Example
        </button>
      </div>
    </section>
  );
};

class Categories extends React.Component {
  constructor() {
    super();
    this.state = { categories: [] };
  }
  setCategories = (newCategories) => {
    this.setState({ categories: newCategories });
  };

  //Get Api when component mounts.
  componentDidMount() {
    fetch("https://api.chucknorris.io/jokes/categories")
      .then((response) => response.json())
      .then((json) => this.setCategories(json))
      .catch((error) => console.error(error));
  }

  render() {
    return (
      <ContentWrapper title="Categories">
        <div className="categoryList">
          {this.state.categories.map((e) => (
            <Category cat={e} />
          ))}
        </div>
      </ContentWrapper>
    );
  }
}

export default Categories;

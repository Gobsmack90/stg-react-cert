import { useSelector } from "react-redux";
import ContentWrapper from "./ContentWrapper";

const Jokes = () => {
  const viewedJokes = useSelector((state) => state.viewedJokes);
  const categories = useSelector((state) => state.categories);

  return (
    <ContentWrapper title="Jokes">
      <div>{categories.length}</div>
      <div>{viewedJokes.length}</div>
      <div>Jokes</div>
    </ContentWrapper>
  );
};

export default Jokes;

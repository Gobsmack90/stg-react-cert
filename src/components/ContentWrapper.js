import "./ContentWrapper.css";

const ContentWrapper = ({ children }) => {
  return (
    <div className="contentContainer">
      <article className="content">{children}</article>
    </div>
  );
};

export default ContentWrapper;

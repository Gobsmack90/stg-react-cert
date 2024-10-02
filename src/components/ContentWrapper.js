import "./ContentWrapper.css";

const ContentWrapper = ({ title, children }) => {
  return (
    <div className="contentContainer">
      <article className="content">
        {title && <h1 className="contentTitle">{title}</h1>}
        <div className="contentBody">{children}</div>
      </article>
    </div>
  );
};

export default ContentWrapper;

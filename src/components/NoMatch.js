import ContentWrapper from "./ContentWrapper";

const NoMatch = () => {
  return (
    <ContentWrapper title="Page not found">
      <div style={{ textAlign: "center" }}>404 good buddy</div>
    </ContentWrapper>
  );
};

export default NoMatch;

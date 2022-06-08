import PuffLoader from "react-spinners/PuffLoader"; //ScaleLoader is p cool

export default function Loading({ loading, color = "white" }) {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "white",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    // SET to absolute in order to not visually move the animations for cards
  };
  return (
    <PuffLoader color={color} loading={loading} css={override} size={150} />
  );
}

import PuffLoader from "react-spinners/PuffLoader"; //ScaleLoader is p cool

export default function Loading({ loading, color = "white" }) {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "white",
  };
  return (
    <PuffLoader color={color} loading={loading} css={override} size={150} />
  );
}

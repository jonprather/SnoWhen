export default function Loading({ loading }) {
  return (
    <div>
      {loading && <p className='subheading'>...Loading</p>}
      {""}
    </div>
  );
}

import UpdateItem from "../components/UpdateItem";

const Sell = ({ query }) => {
  return (
    <div>
      <PleaseSignIn>
        <UpdateItem id={query.id} />
      </PleaseSignIn>
    </div>
  );
};

export default Sell;

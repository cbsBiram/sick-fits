import CreateItem from "../components/CreateItem";
import PleaseSignIn from "./../components/PleaseSignIn";

const Sell = props => {
  return (
    <div>
      <PleaseSignIn>
        <CreateItem></CreateItem>
      </PleaseSignIn>
    </div>
  );
};

export default Sell;

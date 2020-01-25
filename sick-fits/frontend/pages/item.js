import SingleItem from "../components/SingleItem";
import PleaseSignIn from "./../components/PleaseSignIn";

const Item = props => {
  return (
    <div>
      <PleaseSignIn>
        <SingleItem id={props.query.id}></SingleItem>
      </PleaseSignIn>
    </div>
  );
};

export default Item;

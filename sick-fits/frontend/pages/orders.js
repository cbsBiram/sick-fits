import PleaseSignIn from "./../components/PleaseSignIn";
import OrderList from "./../components/OrderList";

const Orders = props => {
  return (
    <div>
      <PleaseSignIn>
        <OrderList id={props.query.id} />
      </PleaseSignIn>
    </div>
  );
};

export default Orders;

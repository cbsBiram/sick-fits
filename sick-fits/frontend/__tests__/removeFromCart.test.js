import { mount } from "enzyme";
import wait from "waait";
import toJSON from "enzyme-to-json";
import { MockedProvider } from "react-apollo/test-utils";
import { ApolloConsumer } from "react-apollo";
import RemoveFromCart, {
  REMOVE_FROM_CART_MUTATION
} from "./../components/RemoveFromCart";
import { CURRENT_USER_QUERY } from "./../components/User";
import { fakeUser, fakeCartItem } from "../lib/testUtils";

global.alert = console.log();

const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem({ id: "abc123" })]
        }
      }
    }
  },
  {
    request: {
      query: REMOVE_FROM_CART_MUTATION,
      variables: { id: fakeCartItem().item.id }
    },
    result: {
      data: {
        removeFromCart: {
          __typename: "CartItem",
          id: fakeCartItem().item.id
        }
      }
    }
  }
];

describe("<RemoveFromCart/>", () => {
  it("renders and matches snap shot", () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <RemoveFromCart id={fakeCartItem().item.id} />
      </MockedProvider>
    );
    expect(toJSON(wrapper.find("button"))).toMatchSnapshot();
  });

  it("removes the item from cart", async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <RemoveFromCart id={fakeCartItem().item.id} />;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
    const res = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(res.data.me.cart).toHaveLength(1);
    expect(res.data.me.cart[0].item.price).toBe(5000);
    wrapper.find("button").simulate("click");
    await wait();
    const res2 = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(res2.data.me.cart).toHaveLength(0);
  });
});

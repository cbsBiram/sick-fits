import { mount } from "enzyme";
import wait from "waait";
import toJSON from "enzyme-to-json";
import { MockedProvider } from "react-apollo/test-utils";
import { ApolloConsumer } from "react-apollo";
import Order, { SINGLE_ORDER_QUERY } from "./../components/Order";
import { fakeUser, fakeOrder } from "../lib/testUtils";

const mocks = [
  {
    request: { query: SINGLE_ORDER_QUERY, variables: { id: fakeOrder().id } },
    result: {
      data: {
        order: { ...fakeOrder() }
      }
    }
  }
];

describe("<Order/>", () => {
  it("renders and matches snapshot", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Order id={fakeOrder().id} />>
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    const order = wrapper.find('[data-test="order"]');
    expect(toJSON(order)).toMatchSnapshot();
  });
});

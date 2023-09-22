import { v4 as uuid, validate } from "uuid";

export default {
  beforeCreate: async (event) => {
    const { data } = event.params;

    if (!data.checkoutId) data.checkoutId = uuid();

    if (!validate(data.checkoutId)) data.checkoutId = uuid();
  }
};

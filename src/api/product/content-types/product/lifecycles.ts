import { v4 as uuid, validate } from "uuid";

export default {
  beforeCreate: async (event) => {
    const { data } = event.params;

    if (!data.productId) data.productId = uuid();

    if (!validate(data.productId)) data.productId = uuid();
  }
};

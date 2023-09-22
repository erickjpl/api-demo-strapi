import { v4 as uuid, validate } from "uuid";

export default {
  beforeCreate: async (event) => {
    const { data } = event.params;

    if (!data.basketId) data.basketId = uuid();

    if (!validate(data.basketId)) data.basketId = uuid();
  }
};

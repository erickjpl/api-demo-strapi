import { v4 as uuid, validate } from "uuid";

export default {
  beforeCreate: async (event) => {
    const { data } = event.params;

    if (!data.warehouseId) data.warehouseId = uuid();

    if (!validate(data.warehouseId)) data.warehouseId = uuid();
  }
};

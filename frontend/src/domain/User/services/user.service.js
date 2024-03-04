import { api } from "../../../shared";

const url = "/api/users";

async function get() {
  return api
    .inventar({
      method: "get",
      url,
    })
    .then((response) => response.data);
}

export const UserService = {
  get,
};

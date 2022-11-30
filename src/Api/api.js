import axios from "axios";
const BASE_URL = "https://6374a94848dfab73a4e4fc2d.mockapi.io/kinder";

export async function getUser(id) {
  try {
    const { data: user } = await axios.get(`${BASE_URL}/${id}`);
    return user;
  } catch (e) {
    return false;
  }
}

export async function updateUser(user) {
  try {
    const { data: updatedUser } = await axios.put(
      `${BASE_URL}/${user.id}`,
      user
    );
    return updatedUser;
  } catch (e) {
    return false;
  }
}

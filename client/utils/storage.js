import * as SecureStore from "expo-secure-store";

export async function saveToken(token) {
  return await SecureStore.setItemAsync("userToken", token);
}

export async function getToken() {
  return await SecureStore.getItemAsync("userToken");
}

export async function removeToken() {
  return await SecureStore.deleteItemAsync("userToken");
}

import * as SecureStore from "expo-secure-store";

const ROLE_KEY = "userRole";

export async function saveUserRole(role) {
  return await SecureStore.setItemAsync(ROLE_KEY, role);
}

export async function getUserRole() {
  return await SecureStore.getItemAsync(ROLE_KEY);
}

export async function removeUserRole() {
  return await SecureStore.deleteItemAsync(ROLE_KEY);
}

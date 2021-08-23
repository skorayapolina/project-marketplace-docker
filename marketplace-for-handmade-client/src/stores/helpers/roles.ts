import RootStore from "../RootStore";

export enum Roles {
  seller = "SELLER",
  buyer = "BUYER",
  admin = "ADMIN"
}

export function getRole(role: Roles) {
  return RootStore.user.roles.includes(role);
}

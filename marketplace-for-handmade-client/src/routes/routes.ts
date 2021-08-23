export const ROUTES = {
  root: "/",

  goods: {
    goods: "/goods/",
    id: "/goods/:id",
  },

  sellers: {
    sellers: "/shops/",
    id: "/shops/:id",
    orders: "user/shop/orders",
  },

  users: {
    users: "/users/",
    login: "/user/login",
    registration: "/user/registration",
    profile: "/users/:id",
  },

  admin: "/admin",
};

import { instance } from "./instance";
import { URLS } from "./urls";
import { TOKEN } from "../stores/UserStore";
import axios from "axios";

export function getUsers() {
  return instance.get(URLS.users);
}

export function getSellers() {
  return instance.get(URLS.sellers);
}

export function getPageGoods(page) {
  return instance.get(URLS.goods + "page/" + page, {
    headers: {
      "auth-token": localStorage.getItem(TOKEN),
    },
  });
}

export function getAllGoods() {
  return instance.get("api/goods", {
    headers: {
      "auth-token": localStorage.getItem(TOKEN),
    },
  });
}

export function getGoodsWithQuery(config) {
  return instance.get("api/goods/query", {
    params: {
      page: config.page,
      category: config.category,
      name: config.name,
    },
    headers: {
      "auth-token": localStorage.getItem(TOKEN),
    },
  });
}

export function postGood(good) {
  return instance.post("api/goods", {
    name: good.name,
    price: good.price,
    idSeller: good.idSeller,
    likes: good.likes,
    description: good.description,
    image: good.image,
    photos: good.photos,
    tags: good.tags,
    category: good.category,
  });
}

export function getUserById(id) {
  return instance.get(URLS.users + id);
}

export function getSellerById(id) {
  return instance.get(URLS.sellers + id);
}

export function getGoodsOfSeller(id) {
  return instance.get(URLS.sellers + id + "/goods");
}

export function getGoodById(id) {
  return instance.get(URLS.goods + id, {
    headers: {
      "auth-token": localStorage.getItem(TOKEN),
    },
  });
}

export function getGoodWithSellerById(id) {
  return instance.get(URLS.goods + id + "/seller", {
    headers: {
      "auth-token": localStorage.getItem(TOKEN),
    },
  });
}

export function getGoodsInBasket(id) {
  return instance.get(URLS.users + id + "/basket", {
    headers: {
      "auth-token": localStorage.getItem(TOKEN),
    },
  });
}

export function postGoodIntoBasket(idBuyer, idGood) {
  return instance.post(URLS.users + idBuyer + "/basket", {
    idGood: idGood,
  });
}

export function deleteGoodFromBasket(idBuyer, idGood) {
  return instance.post(URLS.users + idBuyer + "/basket/delete", {
    idGood: idGood,
  });
}

export function getLikedGoods(id) {
  return instance.get(URLS.users + id + "/liked", {
    headers: {
      "auth-token": localStorage.getItem(TOKEN),
    },
  });
}

export function postGoodIntoLikedGoods(idBuyer, idGood) {
  return instance.post(URLS.users + idBuyer + "/liked", {
    idGood: idGood,
  });
}

export function deleteGoodFromLikedGoods(idBuyer, idGood) {
  return instance.post(URLS.users + idBuyer + "/liked/delete", {
    idGood: idGood,
  });
}

export function updateLikes(idGood, likes) {
  return instance.post(URLS.goods + idGood + "/updateLikes", {
    likes: likes,
  });
}

export function getShopByUserId(idUser) {
  return instance.get(URLS.users + idUser + "/shop", {
    headers: {
      "auth-token": localStorage.getItem(TOKEN),
    },
  });
}

export function updateUserRole(idUser, role) {
  return instance.post(URLS.users + idUser, {
    roles: role,
  });
}

export function updateGood(idGood, good) {
  return instance.post(URLS.goods + idGood, {
    name: good.name,
    description: good.description,
    price: good.price,
    category: good.category,
  });
}

export function postOrder(idUser, idGood, idSeller) {
  return instance.post(URLS.users + idUser + "/orders", {
    idGood: idGood,
    idSeller: idSeller,
  });
}

export function getUserOrders(idUser) {
  return instance.get(URLS.users + idUser + "/orders");
}

export function getSellerOrders(idSeller) {
  return instance.get(URLS.sellers + idSeller + "/orders");
}

export function updateOrderState(idOrder) {
  return instance.post(URLS.sellers + "orders/" + idOrder);
}

export function deleteOrders(idOrder) {
  return instance.post("api/orders/" + idOrder);
}

export function postShop(seller) {
  return instance.post("api/sellers", {
    name: seller.name,
    idUser: seller.idUser,
    description: seller.description,
    logo: seller.logo,
    services: seller.services,
  });
}

export function deleteUserById(idUser) {
  return instance.delete(URLS.users + idUser + "/delete");
}

export function getGoodsByName(name, page) {
  return instance.get(URLS.goods + name + "/" + page);
}

export async function uploadImages(files) {
  const filesArray: string[] = Array.from(files);
  const fileURLS: string[] = [];
  const uploaders = filesArray.map((file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "zefqx6js");

    return axios
        .post(
            "https://api.cloudinary.com/v1_1/cloudqawsed/image/upload",
            data,
            {
              headers: { "X-Requested-With": "XMLHttpRequest" },
            }
        )
        .then((response) => {
          const data = response.data;
          fileURLS.push(data.secure_url);
        });
  });

  await axios.all(uploaders);
  return fileURLS;
}

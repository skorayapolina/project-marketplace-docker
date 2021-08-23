enum GoodsCategories {
  art = "ART",
  accessories = "ACCESSORIES",
  homeware = "HOMEWARE",
  toys = "TOYS",
}

interface IGood {
  _id: string;
  name: string;
  price: number;
  idSeller: string;
  description?: string;
  likes: number;
  image: string;
  status?: string;
  idOrder?: string;
  category?: string;
  photos?: string[];
  tags?: string[];
}

interface ISeller {
  _id: string;
  services: string[];
  name: string;
  description: string;
  logo: string;
  idUser: string
}

interface IUser {
  _id: string;
  basket: string[];
  email: string,
  likedGoods: string[],
  name: string,
  orders?: any,
  password: string,
  roles: string[]
}


// @ts-ignore
export { IGood, ISeller, GoodsCategories, IUser };

export type Flower = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

export const flowers: Flower[] = [
  {
    id: 1,
    name: "Розы",
    price: 950,
    category: "Букеты",
    image: "https://zarum.ru/uploads/posts/2019-10/1572466184_f0d54fd0-9a9d-4e59-97fc-f818246057df.jpeg"
  },
  {
    id: 2,
    name: "Тюльпаны",
    price: 750,
    category: "Букеты",
    image: "https://dostavka-tsvety.ru/wp-content/uploads/2019/12/6ebfedecc5af64d3b8a7f026685820fa.png"
  },
  {
    id: 3,
    name: "Подписка на месяц",
    price: 2200,
    category: "Подписка",
    image: "https://cveti32.ru/wp-content/uploads/2021/08/dorogie-cvety-960x640.jpg"
  },
  {
    id: 4,
    name: "Пионы",
    price: 1100,
    category: "Букеты",
    image: "https://cdn-gdiej.nitrocdn.com/DTBNMWgybIWrwPviUsfZxnqoeaXtnoIO/assets/images/optimized/rev-8698971/dostavka-cvetovspb.ru/wp-content/uploads/2020/07/f09f929c-valerie-19_5eff415a01cbb-500x500.jpeg"
  },
  {
    id: 5,
    name: "Гортензия",
    price: 1400,
    category: "Букеты",
    image: "https://magicalflower.ru/image/catalog/hydrangea/21mix/dsc_2596.jpg"
  },
  {
    id: 6,
    name: "Гвоздики",
    price: 600,
    category: "Букеты",
    image: "https://camellia-market.com.ua/image/cache/catalog/17.12.24/photo_2024-12-17_13-44-49%286%29-auto_width_1333.jpg"
  },
  {
    id: 7,
    name: "Подписка на 3 месяца",
    price: 7000,
    category: "Подписка",
    image: "https://cveti32.ru/wp-content/uploads/2021/08/dorogie-cvety-960x640.jpg"
  }
];
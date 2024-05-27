const bobsBg = [
  "https://i.postimg.cc/xC0qggr2/christmas-inside-resto-01.png",
  "https://i.postimg.cc/KY7RnwHf/grand-re-opening-01.png",
  "https://i.postimg.cc/8Cg7fNts/Inside-Restaurant-01.png",
  "https://i.postimg.cc/XNt7JH3L/bob-Street.jpg",
  "https://i.postimg.cc/xTHjbv12/Bob-Shop.jpg",
  "https://i.postimg.cc/xjX19Drq/bobHouse.jpg",
];

const rmBg = [
  "https://i.postimg.cc/MKGJWgTn/heart-portal.png",
  "https://i.postimg.cc/pX1bykhq/Normal-portal.png",
  "https://i.postimg.cc/fWChQMw4/spaceship.png",
  "https://i.postimg.cc/t4ScqfGC/rmGarage.jpg",
  "https://i.postimg.cc/dt9XX3WC/rm-Livingroom.jpg",
  "https://i.postimg.cc/135TZSTj/rmSeat.jpg",
];

const vectorbg = [
  "https://i.postimg.cc/gJ963zbS/vectorbg-1.jpg",
  "https://i.postimg.cc/4dzH5DJJ/vectorbg-2.jpg",
  "https://i.postimg.cc/yxjgq0gt/vectorbg-3.jpg",
  "https://i.postimg.cc/FzNdnTR0/vectorbg-4.jpg",
  "https://i.postimg.cc/9XYqqH8b/vectorbg-5.jpg",
  "https://i.postimg.cc/bvStGGWS/vectorbg-6.jpg",
];

const bobsSample = [
  "https://i.postimg.cc/rsGCBDdX/bobs1.png",
  "https://i.postimg.cc/c4ZcQBjs/bobs2.png",
  "https://i.postimg.cc/ZRdLL74q/bob3.png",
  "https://i.postimg.cc/RCwR6Dgs/bobs4.png",
  "https://i.postimg.cc/fyQfqcRf/bobs5.png",
];

const rmSample = [
  "https://i.postimg.cc/nLmty7LT/rm1.png",
  "https://i.postimg.cc/xCr985ZW/rm10.png",
  "https://i.postimg.cc/wjZp4F97/rm2.png",
  "https://i.postimg.cc/3JL7mY6j/rm3.png",
  "https://i.postimg.cc/jSLThB0p/rm4.png",
  "https://i.postimg.cc/SNQknJZN/rm5.png",
  "https://i.postimg.cc/T2JT2rJ4/rm6.png",
  "https://i.postimg.cc/SRkq7skd/rm7.png",
  "https://i.postimg.cc/B6x4KD9t/rm8.png",
  "https://i.postimg.cc/3N1hLTwT/rm9.png",
];

const vectorSample = [
  "https://i.postimg.cc/NGSZcFWz/vector1.png",
  "https://i.postimg.cc/m29J2R42/vector2.png",
  "https://i.postimg.cc/ryK73xY4/vector3.png",
];

const picture_style = ["full_body", "half_body", "shoulders_up"];
const number_of_heads = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const categories = [
  {
    category: "bobs_burger",
    sample: bobsSample,
    backgrounds: bobsBg,
    picture_style: picture_style,
    art_style: "bobs_burger",
    number_of_heads: number_of_heads,
  },
  {
    category: "rick_and_morty",
    sample: rmSample,
    backgrounds: rmBg,
    picture_style: picture_style,
    art_style: "rick_and_morty",
    number_of_heads: number_of_heads,
  },
  {
    category: "vector",
    sample: vectorSample,
    backgrounds: vectorbg,
    picture_style: picture_style,
    art_style: "vector",
    number_of_heads: number_of_heads,
  },
];

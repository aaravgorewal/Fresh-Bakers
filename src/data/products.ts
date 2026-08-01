import { ProductItem, Category } from '../types';

export interface CategoryInfo {
  name: Category;
  image: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    name: 'Cakes',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNL70v8HzlrJCg1EYxfqVSof3XnXIQ7qOjyn1OgAI9LoWjnQjDoReDoNrv0lEV_KbpUa7PsbJACoCo_TjmRWp1-ba8kTq3lhJP8O4kyZHsS5Fpr7eN_nUoDPljW7Zd9KH_A9lAlHURq18EStuhzyrXSesXGTqhYDE3rc9O-jr-MnbthPs_jLk-bN3VveII4uNmCFLXRJLCcJTpRr22MIzzawtZBNZdSa4z4COWFQ3hw4l8FRkTNg1Hnw'
  },
  {
    name: 'Pastries',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoJjGHkLajnlvGbkkGfEQGc8oVRv7OLxtswU8VF7v7Cu3vyOe4Tz-UV0sV09IDSpJoZntTVBvV5ClMQzXXGRZpPnVrGIGKF6TWVC6HMFowtzwDiq4q4koyTsiTUd30yBOz9dX1OkkujZBrZPy_N0KgdhR2aIrAfX8LGpuqJtl4HActHwJtHaIYOfIqyLe2mhj3jDj9KtD1svE4ihBTStbJFclB1PrBas_tdiUk77JUg9UqKz-Z-GZt_w'
  },
  {
    name: 'Breads',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvG0YpfGuIDIhlPMlQPxF1BMlL4AgniDbBJELDrOcddXmplAIPoavB5D3DqaDw3a8SB4c3SjutGdBIhkiDGEGG8OpfqbMEto9oOW3TfF4cuLZkfdlladXcNpraVDlrVkHAuvD5jruC0LiSmb9TZi4eKSOwnOuBbduIQxTdhf4cQRuVOQLNkZY_QRHWIV_K3RBmcT8CmSZPJ6SSAfzckK1poY7rksWSda2eofOlaDHsVMMyKZHVI1mcWg'
  },
  {
    name: 'Cookies & Biscuits',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlQbJaTjSz2XKo056hm9hYg-54BlIb9nY6MBlvnztXMtFvSIZ-2Fj_giXnNDGXHO7G16PWBzXHIzRFIdQKZ-P_zSIIxN1wYcecPQQXe7EY0HixcTto3Whx6meOIpjnDaQuQHYOrBJbN9p2O_HjnJpuUj57OSw4b91pDkcrbYaKqH_2Fui89YzIKMWvBNn6EbXQUCcjNFCqKq9KYxXD5m2iPevibFTeTsbl3MkfaI_1566RNl3jwmlzjw'
  },
  {
    name: 'Snacks & Puffs',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPmaWROL2-g7TiwC91RHV_IZe0Nd_CLzkbWroZ2H68_Vlh_Kui5tLFAhiTIjmK9V_5IdCk60ZBi1kouhIlomPYRcfQwWW1c-v6nU5jzug_8Qr3H_oeC30wgZrW2-YUaAfxO6qseW_79OWZPTNkjub73igX_yKr5-0_qlrGIJQ7DnrfAwDqTI82nxxi7CQLPxsFRIxMxv6HDcvqIglShe2xRpR9_jTQ3K-KftRliwUHZI2t9L-EhVIi2Q'
  },
  {
    name: 'Custom Orders',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYsds9gO4-ou-y-KTDz0idyn0DPWfaMhozFeRoJdnFEEX-U13C6uBslnwmTuweVvOI5d7yga78SyozydTfCO3AiFPTgvfwF6HV4sVQtAWFXLUdaFNgSfBPkr3ouukvljsXGEKSrNc6qElDd0kCKmPMPorTIYX3bqeOmVyAJxqW0B2lRV3BGpKJNiPAjinB-nFmb87w5gjApW-9eAUtwAzwALzI9u6wPGPFhwaS6TLQT_sa5gnG58oUCA'
  },
  {
    name: 'Seasonal Specials',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAs_93jzIsTzEc2hlIyfX6qAsSfxAb5LaYLxF5RIJaKSz6II5tn13QRkL240VasQ0mM-fd-d2ayC2-dtL7sRjH6WQdMxZqoZ6JaguEG7Vn-N6tZtRsdvv1qUGRMOTbsMJc7abhHllYXtTp4PlUtBKQmmhkKHAqle75jOc1zNswTSuK4nTq3X-QW1sTkQiOGat9CHbQwYfT6v1nP909Aoxawrv4e172aInf4Dg1gtA9XbdSLSFh9Cb3Ixw'
  }
];

export const PRODUCTS: ProductItem[] = [
  {
    id: 'classic-sourdough',
    name: 'The Classic Sourdough',
    category: 'Breads',
    price: 8.5,
    description: 'Wild yeast, long fermentation, and traditional stone-ground flour with a crisp blistered crust.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDul2LQs2RG_9n7r3zLnleXJxS0v3iAxlSim0mTOpfBf6_CevWWYAQN6ecQiJesN7OcCq0lqOe6YfVnCAHOooJ0O876EwFe09PT8zYk34cnlpYuCkYL_YlLqgUzdn5E2KW23DZt3BIFlq70B13_vg4Q7ngeR2HrDLOadq3Lc7XgKiBCX1M_6hYH9jWSpHpy0HTREiR11T1LyqNb8iWVXGj5dms0hIlEbTM-jfEQf9TMfu6Bi9OBYN3oBQ',
    available: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDul2LQs2RG_9n7r3zLnleXJxS0v3iAxlSim0mTOpfBf6_CevWWYAQN6ecQiJesN7OcCq0lqOe6YfVnCAHOooJ0O876EwFe09PT8zYk34cnlpYuCkYL_YlLqgUzdn5E2KW23DZt3BIFlq70B13_vg4Q7ngeR2HrDLOadq3Lc7XgKiBCX1M_6hYH9jWSpHpy0HTREiR11T1LyqNb8iWVXGj5dms0hIlEbTM-jfEQf9TMfu6Bi9OBYN3oBQ',
    priceNum: 8.5,
    imageAlt: 'Sourdough loaf sliced open showing airy crumb structure',
    fermentationHours: 36,
    ingredients: ['Stone-Ground Organic Wheat', 'Filtered Water', 'Sea Salt', '50-Year Heritage Starter'],
    isSignature: true
  },
  {
    id: 'almond-croissant',
    name: 'Almond Croissant',
    category: 'Pastries',
    price: 6.5,
    description: 'Twice-baked butter pastry filled with rich house-made frangipane and dusted with toasted almonds.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjLrMTbtR3ndAksAsZZTvX9hWK27SbjrsN_4l8sUq0_ThyERXEd3NYubnGUNQhZVjxtOA3fUKTdSJp869OpG0z8ZylpDf5-H8sP9nKJtTCXuwHlyiCaN1F7YgDx8gf60hBUa73j9BOZeg62FfKT-2xNqPyH3pZOJ-ysuJzkvb_VtEZWux5yyh16fmMhNlPbYDNBE9Q8s1VsVPh_v3fvUcw4N6vARl4-P2Uinv8Y1JiUz1rceTqrlaJHQ',
    available: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjLrMTbtR3ndAksAsZZTvX9hWK27SbjrsN_4l8sUq0_ThyERXEd3NYubnGUNQhZVjxtOA3fUKTdSJp869OpG0z8ZylpDf5-H8sP9nKJtTCXuwHlyiCaN1F7YgDx8gf60hBUa73j9BOZeg62FfKT-2xNqPyH3pZOJ-ysuJzkvb_VtEZWux5yyh16fmMhNlPbYDNBE9Q8s1VsVPh_v3fvUcw4N6vARl4-P2Uinv8Y1JiUz1rceTqrlaJHQ',
    priceNum: 6.5,
    imageAlt: 'Artisanal almond croissant dusted with powdered sugar',
    ingredients: ['French Cultured Butter', 'Pastry Flour', 'Almond Frangipane', 'Powdered Sugar', 'Toasted Almond Flakes'],
    isSignature: true
  },
  {
    id: 'honey-brioche',
    name: 'Honey Brioche',
    category: 'Breads',
    price: 7.0,
    description: 'A tender, buttery loaf enriched with local wildflower honey and egg wash glaze.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCLUma4HBt-ez0U6bDckFnApOBLg7KO3mEMDVZ5FsGgoOKZ6DkvpaqMJhe5B96IeEiQqd4FJNzt_svGuVW_MDMfQ-5bnPW2U_iUk_86FcbTUEP2XHkeF_p49zrJrV2uto6WhyEYLf5uTrtmrJMqE9U8mMLBN0NnWieVGmeuVlbBkDTC_YTWDxGrcJHl1UOJuibVjCaHdopk5FV6bsaZinubFZmjvMqI0O6czVQSgKRpqteLwgCr0Phcw',
    available: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCLUma4HBt-ez0U6bDckFnApOBLg7KO3mEMDVZ5FsGgoOKZ6DkvpaqMJhe5B96IeEiQqd4FJNzt_svGuVW_MDMfQ-5bnPW2U_iUk_86FcbTUEP2XHkeF_p49zrJrV2uto6WhyEYLf5uTrtmrJMqE9U8mMLBN0NnWieVGmeuVlbBkDTC_YTWDxGrcJHl1UOJuibVjCaHdopk5FV6bsaZinubFZmjvMqI0O6czVQSgKRpqteLwgCr0Phcw',
    priceNum: 7.0,
    imageAlt: 'Golden braided brioche loaf on cooling rack',
    ingredients: ['Wildflower Honey', 'High-Fat Butter', 'Farm Eggs', 'Enriched Wheat Flour', 'Milk'],
    isSignature: true
  },
  {
    id: 'pain-au-chocolat',
    name: 'Pain au Chocolat',
    category: 'Pastries',
    price: 6.0,
    description: 'Layered sourdough pastry with 70% dark Belgian chocolate batons.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjhB3V87xNze4P4z3Q1cco-aRRra8-W1LwNPbjSWSo_0PRhdeXBduIY9JN4mhdJdYt_srtg-ZoMzvv6MyLBxciIMLpEhzDo_z45EAmjYLQ3HJopTLI2T3vf3SlbajveQslH3UcBofSkmErIuumfGqYcRrunXOrMrwMi78h8F6DGSJkaAU0qUnW3P0TwKkejLko07zABOtz9wEOh88FGMPt3xYkgP7hOyXVdSC7ktTVdyFAYJPHEt4P_Q',
    available: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjhB3V87xNze4P4z3Q1cco-aRRra8-W1LwNPbjSWSo_0PRhdeXBduIY9JN4mhdJdYt_srtg-ZoMzvv6MyLBxciIMLpEhzDo_z45EAmjYLQ3HJopTLI2T3vf3SlbajveQslH3UcBofSkmErIuumfGqYcRrunXOrMrwMi78h8F6DGSJkaAU0qUnW3P0TwKkejLko07zABOtz9wEOh88FGMPt3xYkgP7hOyXVdSC7ktTVdyFAYJPHEt4P_Q',
    priceNum: 6.0,
    imageAlt: 'Flaky Pain au Chocolat with dark chocolate center',
    ingredients: ['70% Dark Belgian Chocolate', 'French Cultured Butter', 'Organic Wheat Flour', 'Sea Salt'],
    isSignature: true
  },
  {
    id: 'traditional-baguette',
    name: 'Traditional Baguette',
    category: 'Breads',
    price: 4.5,
    description: 'Classic Parisian style with a thin, crispy crust and airy honeycomb interior.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfun0VHGjAK63rKMcvGPLwxQJsDX_0xHQyy4iLiDIPAijnkgVzpvlxPvVWgBk3TReOwOIbFevkXDnmXhGto55uEAQ5MThseaKRUO5zhx6CvfPEKAemLIUKcc0Eina1zFPEzwivRQo8bcs03igdQn6ELCJe4g6k3Or6Do5Ni-cGu91ugYfBysG3FxCCRmedhIEU0B32EdXuWI7LDk6-Lqm9Ki-tDXJvmTayWa4F4Wrps6_hIJP6i6s20g',
    available: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfun0VHGjAK63rKMcvGPLwxQJsDX_0xHQyy4iLiDIPAijnkgVzpvlxPvVWgBk3TReOwOIbFevkXDnmXhGto55uEAQ5MThseaKRUO5zhx6CvfPEKAemLIUKcc0Eina1zFPEzwivRQo8bcs03igdQn6ELCJe4g6k3Or6Do5Ni-cGu91ugYfBysG3FxCCRmedhIEU0B32EdXuWI7LDk6-Lqm9Ki-tDXJvmTayWa4F4Wrps6_hIJP6i6s20g',
    priceNum: 4.5,
    imageAlt: 'Golden French baguette on parchment paper',
    fermentationHours: 24,
    ingredients: ['T65 French Wheat Flour', 'Water', 'Sea Salt', 'Wild Yeast']
  },
  {
    id: 'classic-croissant',
    name: 'Classic Croissant',
    category: 'Pastries',
    price: 5.5,
    description: 'Hand-laminated over three days with premium high-fat cultured butter.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBDRFs1IWGO8cX-0jzwbK7bVrrMzXrFSdwVG2CgDRmgvOvvbC-DYYu3a5YUf7fpdHK7wnZWk7XFNo_LrP7uRC3Zcfr1Ywzhg3xjIhn2t-7SuQUfRsP5HoJ7l8GhgH7MDCQYuVyTyyrl0bkBCdJUMkGki7cNXK5tzFwpaLXvBkCkNB1bq_905drVPQ-0Unz_kXgwEP85kFB_CYIcyjBgVmPy938d6g9Pq8NPeME1Nwc6iCJEqIkd2u-cg',
    available: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBDRFs1IWGO8cX-0jzwbK7bVrrMzXrFSdwVG2CgDRmgvOvvbC-DYYu3a5YUf7fpdHK7wnZWk7XFNo_LrP7uRC3Zcfr1Ywzhg3xjIhn2t-7SuQUfRsP5HoJ7l8GhgH7MDCQYuVyTyyrl0bkBCdJUMkGki7cNXK5tzFwpaLXvBkCkNB1bq_905drVPQ-0Unz_kXgwEP85kFB_CYIcyjBgVmPy938d6g9Pq8NPeME1Nwc6iCJEqIkd2u-cg',
    priceNum: 5.5,
    imageAlt: 'Single flaky golden butter croissant',
    ingredients: ['84% Fat Cultured Butter', 'T55 Flour', 'Cane Sugar', 'Sea Salt']
  },
  {
    id: 'sea-salt-chocolate',
    name: 'Sea Salt Chocolate Cookie',
    category: 'Cookies & Biscuits',
    price: 4.0,
    description: 'Brown butter base with 72% dark chocolate chunks and Maldon sea salt flakes.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgpY9DTemMh8LH6ILISmFRRoSGPA9Cj9iE1jNRhLD_LD9P-KBJmtE6Uoj1BCcDWA1_Y3bXjRIDhnOgLTy9Smp_fhrFGBD4p0yID5wS8N6Xq9N9FbaOUoEqKQjs_Vr6zVFIhzeUgRXNoRXjCHCsnjToBZLUTG9s_t8lHK48azuy2yM7lhFxiOh94rXVgXkPasR7CHcsXuqTlVpay3Hmn5d4Wwv3QShU51PGm88CEzjWfBJ84Ihommz3eQ',
    available: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgpY9DTemMh8LH6ILISmFRRoSGPA9Cj9iE1jNRhLD_LD9P-KBJmtE6Uoj1BCcDWA1_Y3bXjRIDhnOgLTy9Smp_fhrFGBD4p0yID5wS8N6Xq9N9FbaOUoEqKQjs_Vr6zVFIhzeUgRXNoRXjCHCsnjToBZLUTG9s_t8lHK48azuy2yM7lhFxiOh94rXVgXkPasR7CHcsXuqTlVpay3Hmn5d4Wwv3QShU51PGm88CEzjWfBJ84Ihommz3eQ',
    priceNum: 4.0,
    imageAlt: 'Chocolate chunk cookie topped with Maldon sea salt',
    ingredients: ['Brown Butter', '72% Valrhona Dark Chocolate', 'Maldon Flaky Sea Salt', 'Brown Sugar', 'Pastry Flour']
  },
  {
    id: 'pistachio-shortbread',
    name: 'Pistachio Shortbread',
    category: 'Cookies & Biscuits',
    price: 3.5,
    description: 'Tender, melt-in-mouth shortbread with roasted Iranian pistachios.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFe1tZk6QJu0oSSprRh_veIPSnNiOuQrl4kOLQbn3kfkZBZ-rSqp1ZLwDSc-r5d47I0R9cT05evEVSaTIez16Qbtv_gibVDhV9aQGFUNbMTwhMzCAQnzx77QuhvPlDYildDP5T-UCmmyEl7z4r2ftVrY7qPrBjc8KwQXrA4uBfifPaY3nmoNHPvSfALOvf_UZXCmGY_peajickylk5yBFQ_pHBfIKWBB8jjDfmz-SV8Xk3KtT1g9jAow',
    available: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFe1tZk6QJu0oSSprRh_veIPSnNiOuQrl4kOLQbn3kfkZBZ-rSqp1ZLwDSc-r5d47I0R9cT05evEVSaTIez16Qbtv_gibVDhV9aQGFUNbMTwhMzCAQnzx77QuhvPlDYildDP5T-UCmmyEl7z4r2ftVrY7qPrBjc8KwQXrA4uBfifPaY3nmoNHPvSfALOvf_UZXCmGY_peajickylk5yBFQ_pHBfIKWBB8jjDfmz-SV8Xk3KtT1g9jAow',
    priceNum: 3.5,
    imageAlt: 'Pistachio shortbread rectangles in ceramic bowl',
    ingredients: ['Iranian Pistachios', 'Sweet Cream Butter', 'Pure Vanilla Bean', 'Powdered Sugar']
  },
  {
    id: 'seeded-dark-rye',
    name: 'Seeded Dark Rye',
    category: 'Breads',
    price: 9.0,
    description: 'Dense, nutrient-rich sourdough rye with toasted sunflower and flax seeds.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHxq-Ul_ayDrsewOYcmQ3YEUnaH9U34WGV8IBDBZReqgDGXayDvikoHvy0H_ReHs-M-c-EHj18bviyxahHk0vMCXCzzAHFFCjM5IFYrcuymU5JQ1YX3I8H8GTWp_EMWW72ZlnwLsQZmwybDBqiXf87kPiYSRBVt9u0cEfLHrMAGCWSY6175G8slCAW256XKNSD_o0DUeUZcfxHakHRJ6yHawSAomer1-n-nG9XXs7AuFOJLruZSj2KdA',
    available: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHxq-Ul_ayDrsewOYcmQ3YEUnaH9U34WGV8IBDBZReqgDGXayDvikoHvy0H_ReHs-M-c-EHj18bviyxahHk0vMCXCzzAHFFCjM5IFYrcuymU5JQ1YX3I8H8GTWp_EMWW72ZlnwLsQZmwybDBqiXf87kPiYSRBVt9u0cEfLHrMAGCWSY6175G8slCAW256XKNSD_o0DUeUZcfxHakHRJ6yHawSAomer1-n-nG9XXs7AuFOJLruZSj2KdA',
    priceNum: 9.0,
    imageAlt: 'Seeded dark rye bread sliced on linen',
    fermentationHours: 48,
    ingredients: ['Whole Grain Dark Rye Flour', 'Toasted Sunflower Seeds', 'Brown Flaxseeds', 'Rye Starter', 'Sea Salt']
  },
  {
    id: 'seasonal-fruit-danish',
    name: 'Seasonal Fruit Danish',
    category: 'Pastries',
    price: 6.5,
    description: 'Fresh seasonal fruit and vanilla bean diplomat cream on flaky puff pastry.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZfA59QpVzgkeJ8daoo7pp_nVxKyTjkdPFIkFW6lsR-7p5aefqkXhxwlZSmqeJWxXZ8wz7dfkLPFat_C4CqLF_VggYD5s-XcxLzVHTMhdl8beq_N9NDk7Aqx3HxStxWYPXVNXdCXcrPvaKG0EIPGAmfRLWvcwU1530TA6HaPKJdKMiPWEEiuNsl3tWxybvTN3nW8yaJPaWgBVmM0jLif6B2MqhZcH6G7-nccHCwK0__ai1DNfa86PrwQ',
    available: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZfA59QpVzgkeJ8daoo7pp_nVxKyTjkdPFIkFW6lsR-7p5aefqkXhxwlZSmqeJWxXZ8wz7dfkLPFat_C4CqLF_VggYD5s-XcxLzVHTMhdl8beq_N9NDk7Aqx3HxStxWYPXVNXdCXcrPvaKG0EIPGAmfRLWvcwU1530TA6HaPKJdKMiPWEEiuNsl3tWxybvTN3nW8yaJPaWgBVmM0jLif6B2MqhZcH6G7-nccHCwK0__ai1DNfa86PrwQ',
    priceNum: 6.5,
    imageAlt: 'Fruit danish topped with cherries and diplomat cream',
    ingredients: ['Fresh Seasonal Cherries', 'Vanilla Bean Custard', 'Laminated Butter Pastry', 'Apricot Glaze']
  },
  {
    id: 'berry-mascarpone-cake',
    name: 'Berry Mascarpone Cake',
    category: 'Cakes',
    price: 42.0,
    description: 'Fluffy vanilla sponge layered with wild berry compote, mascarpone frost, and fresh floral garnishes.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNL70v8HzlrJCg1EYxfqVSof3XnXIQ7qOjyn1OgAI9LoWjnQjDoReDoNrv0lEV_KbpUa7PsbJACoCo_TjmRWp1-ba8kTq3lhJP8O4kyZHsS5Fpr7eN_nUoDPljW7Zd9KH_A9lAlHURq18EStuhzyrXSesXGTqhYDE3rc9O-jr-MnbthPs_jLk-bN3VveII4uNmCFLXRJLCcJTpRr22MIzzawtZBNZdSa4z4COWFQ3hw4l8FRkTNg1Hnw',
    available: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNL70v8HzlrJCg1EYxfqVSof3XnXIQ7qOjyn1OgAI9LoWjnQjDoReDoNrv0lEV_KbpUa7PsbJACoCo_TjmRWp1-ba8kTq3lhJP8O4kyZHsS5Fpr7eN_nUoDPljW7Zd9KH_A9lAlHURq18EStuhzyrXSesXGTqhYDE3rc9O-jr-MnbthPs_jLk-bN3VveII4uNmCFLXRJLCcJTpRr22MIzzawtZBNZdSa4z4COWFQ3hw4l8FRkTNg1Hnw',
    priceNum: 42.0,
    imageAlt: 'Artisanal cake topped with berries and edible flowers',
    ingredients: ['Madagascar Vanilla', 'Fresh Berries', 'Italian Mascarpone', 'Organic Flour', 'Eggs']
  },
  {
    id: 'savory-cheese-puff',
    name: 'Savory Gruyère Puff',
    category: 'Snacks & Puffs',
    price: 4.5,
    description: 'Golden puff pastry lattice stuffed with aged Gruyère cheese, thymes, and slow-caramelised shallots.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPmaWROL2-g7TiwC91RHV_IZe0Nd_CLzkbWroZ2H68_Vlh_Kui5tLFAhiTIjmK9V_5IdCk60ZBi1kouhIlomPYRcfQwWW1c-v6nU5jzug_8Qr3H_oeC30wgZrW2-YUaAfxO6qseW_79OWZPTNkjub73igX_yKr5-0_qlrGIJQ7DnrfAwDqTI82nxxi7CQLPxsFRIxMxv6HDcvqIglShe2xRpR9_jTQ3K-KftRliwUHZI2t9L-EhVIi2Q',
    available: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPmaWROL2-g7TiwC91RHV_IZe0Nd_CLzkbWroZ2H68_Vlh_Kui5tLFAhiTIjmK9V_5IdCk60ZBi1kouhIlomPYRcfQwWW1c-v6nU5jzug_8Qr3H_oeC30wgZrW2-YUaAfxO6qseW_79OWZPTNkjub73igX_yKr5-0_qlrGIJQ7DnrfAwDqTI82nxxi7CQLPxsFRIxMxv6HDcvqIglShe2xRpR9_jTQ3K-KftRliwUHZI2t9L-EhVIi2Q',
    priceNum: 4.5,
    imageAlt: 'Golden savory cheese puff pastry',
    ingredients: ['Aged Swiss Gruyère', 'Caramelised Shallots', 'Fresh Thyme', 'Puff Pastry']
  }
];

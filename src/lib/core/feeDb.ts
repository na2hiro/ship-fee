import type { SizeConstraints, WeightConstraints } from "./constraints";
import { stringifyWeight } from "./utils";

export type FeeDefinition = {
  name: string;
  detailsUrl?: string;
  price: number;
  constraints: {
    size?: SizeConstraints;
    weight?: WeightConstraints;
  };
};

type FeeCategory = {
  name: string;
  detailsUrl?: string;
  fees: FeeDefinition[];
};

const yuuYuuMercari: FeeCategory = {
  name: "ゆうゆうメルカリ便",
  detailsUrl: "https://static.jp.mercari.com/yuyu-mercari",
  fees: [
    {
      name: "ゆうパケット",
      detailsUrl: "https://www.post.japanpost.jp/service/yu_packet/index.html",
      price: 230,
      constraints: {
        size: {
          edgesMax: [34, null, 3],
          edgesSumMax: 60,
        },
        weight: {
          max: 1000,
        },
      },
    },
    {
      name: "ゆうパケットポスト(専用箱)",
      detailsUrl:
        "https://www.post.japanpost.jp/service/yu_packetpost/index.html",
      price: 215 + 65,
      constraints: {
        size: {
          // Size which you can submit to post box
          edgesMax: [32, 22.8, 3],
        },
        weight: {
          max: 2000,
        },
      },
    },
    {
      name: "ゆうパケットポスト(シール)",
      detailsUrl:
        "https://www.post.japanpost.jp/service/yu_packetpost/index.html",
      price: 215 + 5,
      constraints: {
        size: {
          // Size which you can submit to post box
          edgesMax: [34, null, 4],
          edgesMin: [14, 9, null],
          edgesSumMax: 60,
        },
        weight: {
          max: 2000,
        },
      },
    },
    {
      name: "ゆうパケットプラス",
      detailsUrl:
        "https://www.post.japanpost.jp/service/yu_packetplus/index.html",
      price: 455 + 65,
      constraints: {
        size: {
          edgesMax: [24, 17, 7],
        },
        weight: {
          max: 2000,
        },
      },
    },
    {
      name: "ゆうパック(60)",
      detailsUrl: "https://www.post.japanpost.jp/service/you_pack/",
      price: 770,
      constraints: {
        size: {
          edgesSumMax: 60,
        },
        weight: {
          max: 25000,
        },
      },
    },
    {
      name: "ゆうパック(80)",
      detailsUrl: "https://www.post.japanpost.jp/service/you_pack/",
      price: 870,
      constraints: {
        size: {
          edgesSumMax: 80,
        },
        weight: {
          max: 25000,
        },
      },
    },
    {
      name: "ゆうパック(100)",
      detailsUrl: "https://www.post.japanpost.jp/service/you_pack/",
      price: 1070,
      constraints: {
        size: {
          edgesSumMax: 100,
        },
        weight: {
          max: 25000,
        },
      },
    },
  ],
};

const rakuRakuMercari: FeeCategory = {
  name: "らくらくメルカリ便",
  detailsUrl: "https://static.jp.mercari.com/rakuraku-mercari",
  fees: [
    {
      name: "ネコポス",
      detailsUrl:
        "https://business.kuronekoyamato.co.jp/service/lineup/nekoposu/",
      price: 210,
      constraints: {
        size: {
          edgesMax: [31.2, 22.8, 2.5],
          edgesMin: [23, 11.5, null],
        },
        weight: {
          max: 1000,
        },
      },
    },
    {
      name: "宅急便コンパクト(専用BOX)",
      detailsUrl:
        "https://www.kuronekoyamato.co.jp/ytc/customer/send/services/compact/",
      price: 450 + 75,
      constraints: {
        size: {
          edgesMax: [25, 20, 5],
        },
        weight: {
          max: 1000,
        },
      },
    },
    {
      name: "宅急便コンパクト(薄型専用BOX)",
      detailsUrl:
        "https://www.kuronekoyamato.co.jp/ytc/customer/send/services/compact/",
      price: 450 + 75,
      constraints: {
        size: {
          edgesMax: [34, 24.8, 3], // TODO this is envelope
        },
        weight: {
          max: 1000,
        },
      },
    },
    ...[
      [60, 750, 2000],
      [80, 850, 5000],
      [100, 1050, 10000],
      [120, 1200, 15000],
      [140, 1450, 20000],
      [160, 1700, 25000],
    ].map(([size, price, gram]) => ({
      name: `宅急便(${size}サイズ)`,
      detailsUrl:
        "https://www.kuronekoyamato.co.jp/ytc/customer/send/services/takkyubin/",
      price,
      constraints: {
        size: {
          edgesSumMax: size,
        },
        weight: {
          max: gram,
        },
      },
    })),
  ],
};

const regularPost: FeeCategory = {
  name: "普通郵便",
  detailsUrl: "https://www.post.japanpost.jp/send/fee/kokunai/one_two.html",
  fees: [
    {
      name: "ミニレター",
      detailsUrl: "https://www.post.japanpost.jp/question/601.html",
      price: 63,
      constraints: {
        size: {
          edgesMax: [16.4, 9.2, 1],
        },
        weight: { max: 25 },
      },
    },
    ...[
      [25, 84],
      [50, 94],
    ].map(([gram, yen]) => {
      const fee: FeeDefinition = {
        name: `定形郵便(${stringifyWeight(gram)})`,
        detailsUrl:
          "https://www.post.japanpost.jp/send/fee/kokunai/one_two.html",
        price: yen,
        constraints: {
          size: {
            edgesMax: [23.5, 12, 1],
            edgesMin: [14, 9, null],
          } as SizeConstraints,
          weight: { max: gram },
        },
      };
      return fee;
    }),
    ...[
      [50, 120],
      [100, 140],
      [150, 210],
      [250, 250],
      [500, 390],
      [1000, 580],
    ].map(
      ([gram, yen]) =>
        ({
          name: `定形外規格内郵便(${stringifyWeight(gram)})`,
          detailsUrl:
            "https://www.post.japanpost.jp/send/fee/kokunai/one_two.html",
          price: yen,
          constraints: {
            size: {
              edgesMax: [23.5, 12, 1],
              edgesMin: [14, 9, null],
            },
            weight: { max: gram },
          },
        } as FeeDefinition)
    ),
    ...[
      [50, 200],
      [100, 220],
      [150, 300],
      [250, 350],
      [500, 510],
      [1000, 710],
      [2000, 1040],
      [4000, 1350],
    ].map(
      ([gram, yen]) =>
        ({
          name: `定形外規格外郵便(${stringifyWeight(gram)})`,
          detailsUrl:
            "https://www.post.japanpost.jp/send/fee/kokunai/one_two.html",
          price: yen,
          constraints: {
            size: {
              edgesMax: [60, null, null],
              edgesSumMax: 90,
            },
            weight: { max: gram },
          },
        } as FeeDefinition)
    ),
    {
      name: "レターパックライト",
      detailsUrl: "https://www.post.japanpost.jp/service/letterpack/",
      price: 370,
      constraints: {
        size: {
          edgesMax: [34, 24.8, 3],
        },
        weight: { max: 4000 },
      },
    },
    {
      name: "レターパックプラス",
      detailsUrl: "https://www.post.japanpost.jp/service/letterpack/",
      price: 520,
      constraints: {
        size: {
          distortableEnvelope: [34, 24.8],
        },
        weight: { max: 4000 },
      },
    },
    {
      name: "スマートレター",
      detailsUrl: "https://www.post.japanpost.jp/service/smartletter/",
      price: 180,
      constraints: {
        size: {
          edgesMax: [25, 17, 2],
        },
        weight: { max: 1000 },
      },
    },
  ],
};

const feeCategories = [yuuYuuMercari, rakuRakuMercari, regularPost];
export default feeCategories;

export const fees = feeCategories
  .flatMap((cat) => cat.fees)
  .sort((a, b) => a.price - b.price);

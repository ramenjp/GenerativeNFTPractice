import { createObjectCsvWriter } from "csv-writer";

// フォルダ名配下のファイル名取得
// [TODO: 自動化]
const Accessories = ["bat", "GoldChain"];
const Background = ["Champagne", "LightGray"];
const Clothes = ["AstronautSuit", "Karate"];
const Expression = ["Angry", "Neutral"];
const Eyes = ["Angry", "Excited"];
const Headgear = ["3dGlasses", "Halo"];
const Skin = ["Abstract", "Damascus"];

let index = 0;
const csvWriter = createObjectCsvWriter({
  path: "./metadata.csv",
  header: [
    "id",
    "name",
    "description",
    "external_url",
    "Background",
    "Skin",
    "Clothes",
    "Expression",
    "Eyes",
    "Headgear",
    "Accessories",
  ],
  append: true,
});

Accessories.map((accessorie, i) => {
  Background.map((background) => {
    Clothes.map((cloth) => {
      Expression.map((expression) => {
        Eyes.map((eye) => {
          Headgear.map((headgear) => {
            Skin.map(async (skin) => {
              index++;
              console.log("index :", index);
              let data = [
                {
                  id: index,
                  name: `Practice#000${index}`,
                  description: "This is Practice pj",
                  external_url:
                    "https://github.com/ramenjp/GenerativeNFTPractice",
                  Background: background,
                  Skin: skin,
                  Clothes: cloth,
                  Expression: expression,
                  Eyes: eye,
                  Headgear: headgear,
                  Accessories: accessorie,
                },
              ];
              await csvWriter.writeRecords(data);
            });
          });
        });
      });
    });
  });
});

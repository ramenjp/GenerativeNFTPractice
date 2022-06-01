"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const sync_1 = require("csv-parse/sync");
const sharp = require("sharp");
const traitConfig = require("./config.json");
const data = fs.readFileSync("metadata.csv");
const records = (0, sync_1.parse)(data, {
    encoding: "utf8",
    columns: true,
});
const isRecords = (records) => {
    if (!records) {
        return false;
    }
    else if (!Array.isArray(records)) {
        return false;
    }
    for (const rec of records) {
        if (!(rec instanceof Object)) {
            return false;
        }
    }
    return true;
};
function traitMatch(rec) {
    if (!rec["id"]) {
        console.log(rec);
        throw new Error("CSV need id field");
    }
    let trait = {
        id: rec["id"],
        attributes: {},
    };
    for (let [key, value] of Object.entries(rec)) {
        if (traitConfig.traits.find((v) => v.name === key)) {
            trait.attributes[key] = value;
        }
    }
    return trait;
}
function toTraitData(records) {
    let traits = [];
    const traitList = traitConfig.traits;
    for (const rec of records) {
        traits.push(traitMatch(rec));
    }
    return traits;
}
function main(records) {
    if (!isRecords(records)) {
        throw new Error("records type is invalid");
    }
    if (!fs.existsSync(traitConfig.output_dir)) {
        fs.mkdirSync(traitConfig.output_dir);
    }
    const traits = toTraitData(records);
    const num = traits.length;
    for (const trait of traits) {
        compositeImage(trait, String(num).length);
    }
}
async function compositeImage(trait, zeroPaddingLength) {
    let attributes = Object.entries(trait.attributes)
        .map(([key, value]) => ({ key, value }))
        .sort(fnSort);
    const first_trait = attributes.shift();
    let rest_trait = [];
    if (first_trait === undefined)
        throw new Error("First Trait is undefined");
    const id = parseInt(trait.id);
    if (id > traitConfig.max_image_generate) {
        return;
    }
    for (const atr of attributes) {
        if (atr.value !== "None") {
            const trait_path = traitConfig.assset_dir + atr.key + "/" + atr.value + ".png";
            if (!fs.existsSync(trait_path))
                console.log(trait_path + " is not exsit");
            rest_trait.push({ input: trait_path });
        }
    }
    try {
        const first_trait_path = traitConfig.assset_dir +
            first_trait.key +
            "/" +
            first_trait.value +
            ".png";
        if (!fs.existsSync(first_trait_path))
            console.log("First trait path is null. " + first_trait_path);
        const image = sharp(first_trait_path);
        image.composite(rest_trait);
        const file_name = zeroPadding(trait.id, zeroPaddingLength) + ".png";
        image
            .toFile(traitConfig.output_dir + file_name)
            .then(function (newFileInfo) {
            console.log("image created. " + file_name);
        })
            .catch(function (err) {
            console.log("Error occured ", err);
            console.log("trait", trait);
        });
    }
    catch (err) {
        console.log("catched exception", err);
    }
}
main(records);
function fnSort(a, b) {
    return (traitConfig.traits.find((v) => v.name === a.key).order -
        traitConfig.traits.find((v) => v.name === b.key).order);
}
function zeroPadding(num, len) {
    return (Array(len).join("0") + num).slice(-len);
}
//# sourceMappingURL=index.js.map
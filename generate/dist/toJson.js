"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sync_1 = require("csv-parse/sync");
const fs = require("fs");
const config = require("./config.json");
const commander_1 = require("commander");
commander_1.program.option("-p, --pack");
commander_1.program.option("-i, --indent", "output json add indent");
commander_1.program.parse();
const options = commander_1.program.opts();
const indent_number = options["indent"] ? 2 : undefined;
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
function main(options) {
    const data = fs.readFileSync(config.csv_file_name);
    const records = (0, sync_1.parse)(data, {
        columns: true,
    });
    if (!isRecords(records)) {
        throw new Error("records type is invalid");
    }
    if (!fs.existsSync(config.json_dir)) {
        fs.mkdirSync(config.json_dir);
    }
    if (options["pack"]) {
        const metadata = JSON.stringify(records.map((rec) => convertMetaData(rec)), null, indent_number);
        fs.writeFileSync(config.json_dir + "packed.json", metadata);
    }
    else {
        for (const rec of records) {
            const metadata = JSON.stringify(convertMetaData(rec), null, indent_number);
            fs.writeFileSync(config.json_dir + rec["id"] + ".json", metadata);
        }
    }
}
function convertMetaData(rec) {
    if (!rec["name"] || !rec["description"])
        throw new Error("name or description is null");
    let metadata = {
        name: rec["name"],
        description: rec["description"],
        external_url: rec["external_url"],
        image: rec["image"],
        background_color: rec["background_color"],
        attributes: [],
    };
    for (const att of config.traits) {
        metadata.attributes.push({
            trait_type: att.name.charAt(0).toUpperCase() + att.name.slice(1),
            value: rec[att.name],
        });
    }
    return metadata;
}
main(options);
//# sourceMappingURL=toJson.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sharp = require("sharp");
const traitConfig = require("./config.json");
const fs = require("fs");
const commander_1 = require("commander");
const program = new commander_1.Command().addOption(new commander_1.Option('-i, --increment <number>', 'Thumbnail File increment number').default(0, 'zero'));
const options = program.parse().opts();
const dirFiles = fs.readdirSync(traitConfig.output_dir);
function main(dirFiles) {
    if (!fs.existsSync(traitConfig.thumbnail_dir)) {
        fs.mkdirSync(traitConfig.thumbnail_dir);
    }
    console.log("Start from " + options['increment']);
    for (let i = options['increment']; i < dirFiles.length; i++) {
        const filename = dirFiles[i];
        if (!filename) {
            console.log("dirFiles " + i + " is null");
            continue;
        }
        makeThumbnail(filename);
    }
}
async function makeThumbnail(file) {
    await sharp(traitConfig.output_dir + file)
        .resize(traitConfig.thumbnail)
        .toFile(traitConfig.thumbnail_dir + file);
    console.log("thumbnail created;" + file);
}
main(dirFiles);
//# sourceMappingURL=thumbnail.js.map
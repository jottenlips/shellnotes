#!/usr/bin/env node

const fs = require('fs');
const os = require("os");
const execSync = require('child_process').execSync;

const today = new Date();
const date = ("0" + today.getDate()).slice(-2);
const month = ("0" + (today.getMonth() + 1)).slice(-2);
const year = today.getFullYear();
const shellnotesFolder = `${os.homedir()}/.shellnotes`
const todaysFile = `shellnotes-${month}-${date}-${year}.md`
const todaysPath = `${shellnotesFolder}/${todaysFile}`
const args = process.argv.slice(2);

if (args.length === 0 || args[0] === '--help') {
    console.log(`\n🐢\n\nType shellnotes and the message you want to append to your daily note.\n\n--today to open ${todaysFile} \n\n--all to open all notes \n\n--help to see this message again`)
    console.log('\n\nex: $ shellnotes Something important that happened today!\n')
    return
}

let openCommand = ''
switch (process.platform) {
    case 'darwin':
        openCommand = 'open';
        break;
    case 'win32':
        openCommand = 'explore';
        break;
    default:
        openCommand = 'xdg-open';
        break;
}

if (args[0] === '--all') {
    return execSync(`${openCommand} "${shellnotesFolder}"`);
}

if (args[0] === '--today') {
    return execSync(`${openCommand} "${todaysPath}"`);
}

fs.mkdir(shellnotesFolder, { recursive: true }, (err) => {
    if (err) throw err;
});

const note = `\n\n${args.join(' ')}`

fs.appendFile(todaysPath, note, () => {
    console.log(`Updated Shell notes for ${todaysFile} 🐢`)
})
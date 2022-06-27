#!/usr/bin/env node

const fs = require('fs');
const os = require("os");
const execSync = require('child_process').execSync;

const today = new Date();
const date = ("0" + today.getDate()).slice(-2);
const month = ("0" + (today.getMonth() + 1)).slice(-2);
const year = today.getFullYear();
const shellnotesFolder = `${os.homedir()}/.shellnotes`
const todaysFile = `${year}-${month}-${date}.md`
const todaysPath = `${shellnotesFolder}/${todaysFile}`
const args = process.argv.slice(2);

if (args.length === 0 || args[0] === '--help') {
    console.log(`\n🐢\n\nType shellnotes or note and the message you want to append to your daily note.\n\n--edit to open ${todaysFile} \n\n--today to view ${todaysFile}\n\n--yesterday to see yesterday's note \n\n--all to open all notes \n\n--help to see this message again`)
    console.log('\n\nexample usage:\n\n$ shellnotes Turtles are tight!\n\n$ shellnotes --today\n\nTurtles are tight!\n\n')
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

if (args[0] === '--edit') {
    return execSync(`${openCommand} "${todaysPath}"`);
}

if (args[0] === '--today') {
    return fs.readFile(todaysPath, 'utf8', (err, note) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(note);
    });
}

if (args[0] === '--yesterday') {
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    const date = ("0" + yesterday.getDate()).slice(-2);
    const month = ("0" + (yesterday.getMonth() + 1)).slice(-2);
    const year = yesterday.getFullYear();
    const yesterdayFile = `${year}-${month}-${date}.md`
    const yesterdayPath = `${shellnotesFolder}/${yesterdayFile}`
    return fs.readFile(yesterdayPath, 'utf8', (err, note) => {
        if (err) {
            console.log(`Could not find a shellnote for ${yesterdayFile} 🐢`);
            return;
        }
        console.log(note);
    });
}

fs.mkdir(shellnotesFolder, { recursive: true }, (err) => {
    if (err) throw err;
});

const note = `${args.join(' ')}\n\n`

fs.appendFile(todaysPath, note, () => {
    console.log(`Updated Shell notes for ${todaysFile} 🐢`)
})
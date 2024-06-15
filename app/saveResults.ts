"use server"

import {appendFile, stat} from "fs/promises";

/**
 * Exports survey js data to a CSV file. Extremely specific to the current form questions for this codebase, not really flexible.
 * @param {*} data user's entries
 */
export default async function sendDataToCsv(data: {"insert-facts": [{fact:string}], discorduser: string, "last-words": string}){
    // First figure out if the file exists
    try{
        await stat('./results.csv');
    }
    catch(e){
        console.log("File doesn't exist, making template...");
        appendFile('./results.csv', 'name, facts, last-words');
    }

    // Go through all entries and configure the CSV
    console.log('Saving entry from ', data.discorduser);

    const finalText = ['"' + data.discorduser + '"'];

    const facts = [];
    for(const item of data['insert-facts']) facts.push('"' + item.fact + '"');

    finalText.push(JSON.stringify(facts).replaceAll(',', '_'));
    finalText.push('"' + data["last-words"] + '"');

    appendFile('./results.csv', '\n' + finalText.join(', '));
}
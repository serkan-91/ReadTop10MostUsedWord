import { WordJsonModel } from "./Models/WordJsonModel";
import { WordWithCount } from "./Models/wordWithCount";
import { RequestParameters, httpsClientService } from "./Services/httpClientService";
import { promisify } from "util";
import * as fs from "fs";

const readFileAsync = promisify(fs.readFile);

async function main() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const wordsFromApiArray: string[] = [];
    let top10word: WordWithCount[] = [];
    const path = 'C:\\Users\\Serkan\\Desktop\\TheWordWithTheMostExample2\\ApiWords2.txt';

    const requestParameter: RequestParameters = {
        fullEndPoint: 'https://raw.githubusercontent.com/bilalozdemir/tr-word-list/master/files/words.json',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const client = new httpsClientService();

    const response = await client.get<WordJsonModel[]>({ requestParameter });

    response.forEach(({ word }) => {
        if (word.length > 4 && !wordsFromApiArray.includes(word)) {
            wordsFromApiArray.push(word);

        }
    });

    try {
        const data = await readFileAsync(path, 'utf8');

        wordsFromApiArray.forEach((Apiword: string) => {
            let wordCount: number = 0;

            const words = data.split('\n');

            words.forEach((word) => {
                if (Apiword === word) {
                    wordCount += 1;
                }
            });

            top10word.push({ Word: Apiword, Count: wordCount });
        });

        // Kelime say�s�na g�re azalan s�rayla s�rala
       top10word= top10word.sort((a, b) => b.Count - a.Count).slice(0,10);

        console.log(top10word);

    } catch (err) {
        console.error('Dosya okuma hatas�: ' + err.message);
    }

    rl.question('Uygulama sonland�. ��kmak i�in Enter tu�una bas�n...', () => {
        rl.close();
    });
}

main();

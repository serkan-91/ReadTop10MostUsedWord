import { count } from "console";
import { WordJsonModel } from "./Models/WordJsonModel";
import { WordWithCount } from "./Models/wordWithCount";
import { RequestParameters, httpsClientService } from "./Services/httpClientService";
async function main() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const fs = require('fs');

    const path = 'C:\\Users\\Serkan\\Desktop\\TheWordWithTheMostExample2\\ApiWords.txt';
 
    const requestParameter: RequestParameters = {
        fullEndPoint: 'https://raw.githubusercontent.com/bilalozdemir/tr-word-list/master/files/words.json',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const wordsFromApiArray = [];

    var client = new httpsClientService();

    var response = await client.get<WordJsonModel[]>({ requestParameter });


    response.forEach((item) => {
        wordsFromApiArray.push(item.word)
    });

    var top10word: WordWithCount[] = [];


        // Dosyay� okuma i�lemi
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                console.error('Dosya okuma hatas�: ' + err.message);
                return;
            }

            wordsFromApiArray.forEach((Apiword: string) => {

                let wordCount: number = 0;
            // Dosya i�eri�ini sat�rlara b�lelim
            const words = data.split('\n');



            // Her sat�rdaki kelimeye eri�im
            words.forEach((word) => {
                if (Apiword === word) {
                    wordCount += 1
                }

            });
                top10word.push({ Word: Apiword, Count: wordCount })
            });
        });
    
    top10word = top10word.sort((a, b) => b.Count - a.Count);
    top10word = top10word.slice(0, 10);
    console.log(top10word);

    rl.question('Uygulama sonland�. ��kmak i�in Enter tu�una bas�n...', () => {
        rl.close();
    });
} 
main();
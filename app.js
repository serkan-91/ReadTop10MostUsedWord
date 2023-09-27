"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpClientService_1 = require("./Services/httpClientService");
const util_1 = require("util");
const fs = require("fs");
const readFileAsync = (0, util_1.promisify)(fs.readFile);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        const wordsFromApiArray = [];
        let top10word = [];
        const path = 'C:\\Users\\Serkan\\Desktop\\TheWordWithTheMostExample2\\ApiWords2.txt';
        const requestParameter = {
            fullEndPoint: 'https://raw.githubusercontent.com/bilalozdemir/tr-word-list/master/files/words.json',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const client = new httpClientService_1.httpsClientService();
        const response = yield client.get({ requestParameter });
        response.forEach(({ word }) => {
            if (word.length > 4 && !wordsFromApiArray.includes(word)) {
                wordsFromApiArray.push(word);
            }
        });
        try {
            const data = yield readFileAsync(path, 'utf8');
            wordsFromApiArray.forEach((Apiword) => {
                let wordCount = 0;
                const words = data.split('\n');
                words.forEach((word) => {
                    if (Apiword === word) {
                        wordCount += 1;
                    }
                });
                top10word.push({ Word: Apiword, Count: wordCount });
            });
            // Kelime say�s�na g�re azalan s�rayla s�rala
            top10word = top10word.sort((a, b) => b.Count - a.Count).slice(0, 10);
            console.log(top10word);
        }
        catch (err) {
            console.error('Dosya okuma hatas�: ' + err.message);
        }
        rl.question('Uygulama sonland�. ��kmak i�in Enter tu�una bas�n...', () => {
            rl.close();
        });
    });
}
main();
//# sourceMappingURL=app.js.map
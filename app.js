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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        const fs = require('fs');
        const path = 'C:\\Users\\Serkan\\Desktop\\TheWordWithTheMostExample2\\ApiWords.txt';
        const requestParameter = {
            fullEndPoint: 'https://raw.githubusercontent.com/bilalozdemir/tr-word-list/master/files/words.json',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const wordsFromApiArray = [];
        var client = new httpClientService_1.httpsClientService();
        var response = yield client.get({ requestParameter });
        response.forEach((item) => {
            wordsFromApiArray.push(item.word);
        });
        var top10word = [];
        // Dosyay� okuma i�lemi
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                console.error('Dosya okuma hatas�: ' + err.message);
                return;
            }
            wordsFromApiArray.forEach((Apiword) => {
                let wordCount = 0;
                // Dosya i�eri�ini sat�rlara b�lelim
                const words = data.split('\n');
                // Her sat�rdaki kelimeye eri�im
                words.forEach((word) => {
                    if (Apiword === word) {
                        wordCount += 1;
                    }
                });
                top10word.push({ Word: Apiword, Count: wordCount });
            });
        });
        top10word = top10word.sort((a, b) => b.Count - a.Count);
        top10word = top10word.slice(0, 10);
        console.log(top10word);
        rl.question('Uygulama sonland�. ��kmak i�in Enter tu�una bas�n...', () => {
            rl.close();
        });
    });
}
main();
//# sourceMappingURL=app.js.map
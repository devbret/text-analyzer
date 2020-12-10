function main() {
    //Primary program variables.
    const userTextInput = document.querySelector(`#userTextInput`);
    const submitButton = document.querySelector(`#submitButton`);
    const output = document.querySelector(`#output`);
    const secondaryOutput = document.querySelector(`#secondaryOutput`);
    const commonLetters = document.querySelector(`#commonLetters`);
    const singleWords = document.querySelector(`#singleWords`);
    const twoWordPhrases = document.querySelector(`#twoWordPhrases`);
    //Make the exclusion of these words an opt-in option, not mandatory.
    let excludedWords = [`the`,`be`,`of`,`and`,`a`,`to`,`in`,`he`,`have`,`it`,`that`,`for`,`they`,`i`,`with`,`as`,`not`,`on`,`she`,`at`,`by`,`this`,`we`,`you`,`do`,`but`,`from`,`or`,`which`,`one`,`would`,`all`,`will`,`there`,`say`,`who`,`make`,`when`,`can`,`more`,`if`,`no`,`man`,`out`,`other`,`so`,`what`,`time`,`up`,`go`,`about`,`than`,`into`,`could`,`state`,`only`,`new`,`year`,`some`,`take`,`come`,`these`,`know`,`see`,`use`,`get`,`like`,`then`,`first`,`any`,`work`,`now`,`may`,`such`,`give`,`over`,`think`,`most`,`even`,`find`,`day`,`also`,`after`,`way`,`many`,`must`,`look`,`before`,`great`,`back`,`through`,`long`,`where`,`much`,`should`,`well`,`people`,`down`,`own`,`just`,`his`,`was`,`had`,`him`,`an`,`were`,`its`,`is`,`me`,`your`,`got`,`been`,`here`,`them`,`my`,`youre`,`their`,`are`,`dont`,`took`,`im`,`her`,`how`,`thats`,`himself`,`said`,`hed`,`else`,`am`,`yet`,`our`,`did`,`very`,`every`,`shall`,`saw`,`those`,`whom`,`has`,`thus`,`us`,`went`,`upon`,`herself`,`oh`,`la`,`el`,`ever`,`cant`,`ie`,`mr`,`miss`,`mrs`,`ms`,`having`,`came`,`yeah`,`mean`,`too`,`theyre`,`youve`,`ive`,`didnt`];
    const vowels = [`a`,`e`,`i`,`o`,`u`];
    const punctuation = [`.`,`,`,`?`,`!`,`:`,`;`,`-`,`_`,`'`,`"`,`(`,`)`,`]`,`[`,`/`,`@`,`#`,`$`,`%`,`^`,`&`,`*`,`=`,`\\`,`|`,`{`,`}`,`<`,`>`,"`",`~`];
    submitButton.addEventListener(`click`, function(){
        //Making sure the user has input at least one character value before running the application.
        if (userTextInput.value.length > 0) {
            const d0 = new Date();
            output.innerHTML = ``;
            commonLetters.innerHTML = ``;
            singleWords.innerHTML = ``;
            twoWordPhrases.innerHTML = ``;
            //Calculating the number of sentences.
            let totalSentences = userTextInput.value.split(`. `).length;
            //Preparing the data for use.
            const predata = userTextInput.value.split(` `);
            const filteredData = predata.filter(z => z !== ``);
            //Making sure all of the characters being considered are English letters.
            let totalPunctuation = 0;
            let totalLetters = [];
            const data = filteredData.reduce(function(t,ind){
                const temp = ind.split(``);
                let holder = [];
                for (let i = 0; i < temp.length; i++) {
                    const innerLetter = temp[i].toLowerCase();
                    if (innerLetter.charCodeAt(0) >= 97 && innerLetter.charCodeAt(0) <= 122) {
                        holder.push(innerLetter);
                        if (totalLetters.some(l => l.word === innerLetter)) {
                            const index = totalLetters.findIndex(x => x.word === innerLetter);
                            ++totalLetters[index].times;
                        } else {
                            totalLetters.push({word:innerLetter,times:1});
                        }
                    }
                    if (punctuation.some(p => p === innerLetter)) {
                        totalPunctuation++;
                    }
                }
                const answer = holder.join(``);
                if (answer !== `` && answer !== ` ` && excludedWords.every(e => answer !== e)) {
                    t.push(answer);
                }
                return t;
            },[]);
            let totalChars = 0;
            let totalVowels = 0;
            let totalConsonants = 0;
            //Unique individual words.
            const uniqueWords = data.reduce(function(t,i){
                if (t.every(z => z.word !== i)) {
                    t.push({word:i,times:1});
                } else {
                    const index = t.findIndex(x => x.word === i);
                    ++t[index].times;
                }
                
                totalChars += i.length;
                for (let z = 0; z < i.length; z++) {
                    if (vowels.some(v => v === i[z])) {
                        totalVowels++;
                    } else {
                        totalConsonants++;
                    }
                }
                return t;
            },[]);
            //Unique two word phrases
            const uniqueTwoWordPhrases = data.reduce(function(t,e,index,arr){
                if (t.every(z => z.word !== `${arr[index]} ${arr[index + 1]}`)) {
                    t.push({word:`${arr[index]} ${arr[index + 1]}`,times:1});
                } else {
                    const indy = t.findIndex(x => x.word === `${arr[index]} ${arr[index + 1]}`);
                    ++t[indy].times;
                }
                return t;
            },[]);
            //Sorting the individual letters so that the highest is at the front.
            const sortedUniqueLetters = totalLetters.sort(function(a,b){
                if (a.times > b.times) {
                    return -1;
                } else if (b.times > a.times) {
                    return 1;
                } else {
                    return 0;
                }
            });
            //Sorting the individual words so that the highest is at the front.
            const sortedUniqueWords = uniqueWords.sort(function(a,b){
                if (a.times > b.times) {
                    return -1;
                } else if (b.times > a.times) {
                    return 1;
                } else {
                    return 0;
                }
            });
            //Sorting the two word phrases so that the highest is at the front.
            const sortedTwoWordPhrases = uniqueTwoWordPhrases.sort(function(a,b){
                if (a.times > b.times) {
                    return -1;
                } else if (b.times > a.times) {
                    return 1;
                } else {
                    return 0;
                }
            });
            //Displaying the results.
            const d6 = new Date();
            const totalTime = ((d6.getTime() - d0.getTime()) / 1000).toFixed(2);
            output.innerHTML += `Your submitted text contains ${totalSentences} sentences, ${totalChars} characters, ${data.length} total words and ${uniqueWords.length} unique words. With an average of ${(data.length / totalSentences).toFixed(2)} words and ${(totalPunctuation / totalSentences).toFixed(2)} punctuation marks per sentence, as well as ${(totalChars / data.length).toFixed(2)} letters per word; each including ${(totalVowels / data.length).toFixed(2)} vowels and ${(totalConsonants / data.length).toFixed(2)} consonants. And took ${totalTime} seconds to be evaluated.`;
            secondaryOutput.innerHTML = `The estimated reading time for your text is ${(data.length / 225).toFixed(2)} minutes, while the estimated speaking time is ${(data.length / 150).toFixed(2)} minutes.`;
            for (let i = 0; i < sortedUniqueLetters.length; i++) {
                commonLetters.innerHTML += `${sortedUniqueLetters[i].word}, `;
            }
            for (let i = 0; i < 50; i++) {
                singleWords.innerHTML += `${sortedUniqueWords[i].word}, `;
            }
            for (let i = 0; i < 50; i++) {
                twoWordPhrases.innerHTML += `${sortedTwoWordPhrases[i].word}, `;
            }
        }
    });
}
main();

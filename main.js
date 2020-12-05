function main() {
    //Primary program variables.
    const userTextInput = document.querySelector(`#userTextInput`);
    const submitButton = document.querySelector(`#submitButton`);
    const output = document.querySelector(`#output`);
    const singleWords = document.querySelector(`#singleWords`);
    const twoWordPhrases = document.querySelector(`#twoWordPhrases`);
    let excludedWords = [`the`,`be`,`of`,`and`,`a`,`to`,`in`,`he`,`have`,`it`,`that`,`for`,`they`,`i`,`with`,`as`,`not`,`on`,`she`,`at`,`by`,`this`,`we`,`you`,`do`,`but`,`from`,`or`,`which`,`one`,`would`,`all`,`will`,`there`,`say`,`who`,`make`,`when`,`can`,`more`,`if`,`no`,`man`,`out`,`other`,`so`,`what`,`time`,`up`,`go`,`about`,`than`,`into`,`could`,`state`,`only`,`new`,`year`,`some`,`take`,`come`,`these`,`know`,`see`,`use`,`get`,`like`,`then`,`first`,`any`,`work`,`now`,`may`,`such`,`give`,`over`,`think`,`most`,`even`,`find`,`day`,`also`,`after`,`way`,`many`,`must`,`look`,`before`,`great`,`back`,`through`,`long`,`where`,`much`,`should`,`well`,`people`,`down`,`own`,`just`,`his`,`was`,`had`,`him`,`an`,`were`,`its`,`is`,`me`,`your`,`got`,`been`,`here`,`them`,`my`,`youre`,`their`,`are`,`dont`,`took`,`im`,`her`,`how`,`thats`,`himself`,`said`,`hed`,`else`,`am`,`yet`,`our`,`did`,`very`,`every`,`shall`,`saw`,`those`,`whom`,`has`,`thus`,`us`,`went`,`upon`,`herself`,`oh`,`la`,`el`,`ever`,`cant`,`ie`];
    submitButton.addEventListener(`click`, function(){
        //Making sure the user has input at least one character value before running the application.
        if (userTextInput.value.length > 0) {
            output.innerHTML = ``;
            singleWords.innerHTML = ``;
            twoWordPhrases.innerHTML = ``;
            const predata = userTextInput.value.split(` `);
            const filteredData = predata.filter(z => z !== ``);
            //Making sure all of the characters being considered are English letters.
            const data = filteredData.reduce(function(t,ind){
                const temp = ind.split(``);
                let holder = [];
                for (let i = 0; i < temp.length; i++) {
                    const innerLetter = temp[i].toLowerCase();
                    if (innerLetter.charCodeAt(0) >= 97 && innerLetter.charCodeAt(0) <= 122) {
                        holder.push(innerLetter);
                    }
                }
                const answer = holder.join(``);
                if (answer !== `` && answer !== ` ` && excludedWords.every(e => answer !== e)) {
                    t.push(answer);
                }
                return t;
            },[]);
            let totalChars = 0;
            //Unique individual words.
            const uniqueWords = data.reduce(function(t,i){
                if (t.every(z => z.word !== i)) {
                    t.push({word:i,times:1});
                } else {
                    const index = t.findIndex(x => x.word === i);
                    ++t[index].times;
                }
                
                totalChars += i.length;
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
            output.innerHTML = `Your submitted text contained ${totalChars} total characters, ${data.length} total words and ${uniqueWords.length} unique words.`;
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

let parent = document.querySelector('.continer');
async function dictionaryapi(word) {
    let length_synonyms = 0;
    let length_atnoyms = 0;
    try {
        let data = fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        let response1 = await data;
        let prom = response1.json();
        let output = await prom;
        length_synonyms = (output[0].meanings[0].synonyms).length;
        length_atnoyms = (output[0].meanings[0].antonyms).length;
        //search word
        let word_div = document.querySelector('.word');
        let word_data = document.createElement('h4');
        word_data.classList.add('h5_word');
        word_data.innerText = output[0].word;
        word_div.append(word_data);
        //audio
        let audio_d_get = document.querySelector('.audio');
        let audio_tag = document.createElement('audio');
        audio_tag.classList.add('audio_word');
        audio_tag.setAttribute('src', `${output[0].phonetics[0].audio}`);
        audio_tag.setAttribute('controls', "");
        audio_d_get.append(audio_tag);

        for (let i of output[0].meanings) {

            let speech = document.querySelector('.partOfSpeech');
            let partOfSpeech_data = document.createElement('p');
            partOfSpeech_data.classList.add('speech_p_tag');
            partOfSpeech_data.innerText = `Part Of Speech: ${i.partOfSpeech}`;
            speech.append(partOfSpeech_data);
            let def = document.querySelector('.partOfSpeech');
            let def_p = document.createElement('p');
            def_p.classList.add('Definition')
            def_p.innerText = "Definition:";
            def.append(def_p);

            for (let j of i.definitions) {
                let define = document.querySelector('.partOfSpeech');
                let defin_data = document.createElement('ul');
                defin_data.innerHTML = ` <li class="defin-li">${j.definition}</li>`;
                define.append(defin_data);
            }
            for (let antonyms1 of i.antonyms) {
                let atms = document.querySelector('.antonyms');
                let antonyms_word = document.createElement('ul');
                antonyms_word.classList.add('ul_autonoyms');
                antonyms_word.innerHTML = `<li> ${antonyms1}</li>`;
                atms.append(antonyms_word);

            }

            for (let synonyms1 of i.synonyms) {
                let syms = document.querySelector('.synonyms');
                let synonyms_word = document.createElement('ul');
                synonyms_word.classList.add('ul_synonyms')
                synonyms_word.innerHTML = `<li>${synonyms1}</li>`
                syms.append(synonyms_word);
            }
        }
        if (length_synonyms > 0) {
            let syn = document.querySelector('.synonyms');
            let synonyms_p = document.createElement('p');
            synonyms_p.classList.add('synonyms_p')
            synonyms_p.innerText = "Synonoyms";
            syn.insertAdjacentElement("afterbegin", synonyms_p);
        }
        if (length_atnoyms > 0) {
            let ant = document.querySelector('.antonyms');
            let ant_p = document.createElement('p');
            ant_p.classList.add('ant_p')
            ant_p.innerText = "Antonyms";
            ant.insertAdjacentElement("afterbegin", ant_p)
        }
    }
    catch (error) {
        alert(error)

    }

}


let count = 0;
//create div
function create_div() {
    let parent = document.querySelector('.continer');
    let d0 = document.createElement('div');
    d0.classList.add('word');
    parent.append(d0)
    let d_audio = document.createElement('div');
    d_audio.classList.add('audio');
    parent.append(d_audio);
    let d1 = document.createElement('div');
    d1.classList.add('partOfSpeech');
    parent.append(d1);

    let d2 = document.createElement('div');
    d2.classList.add('antonyms');
    parent.append(d2);

    let d3 = document.createElement('div');
    d3.classList.add('synonyms');
    parent.append(d3);
}
//remove div
function remove_div() {
    let syn = document.querySelector('.synonyms');
    syn.remove();
    let ant = document.querySelector('.antonyms');
    ant.remove();
    let define = document.querySelector('.partOfSpeech');
    define.remove();
    let word_div = document.querySelector('.word');
    word_div.remove();
    let audio_d_get = document.querySelector('.audio');
    audio_d_get.remove();
}
//open time one word showing
if (count == 0) {
    create_div()
    dictionaryapi("world");
}
//button to search
let btn = document.querySelector('.btn_search');
btn.addEventListener('click', (e) => {
    count++;
    if (count > 0) {
        remove_div()
    }
    create_div()
    let button_value = document.querySelector('#search_value').value;
    dictionaryapi(button_value);


})
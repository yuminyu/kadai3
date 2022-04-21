//日記クラス
class Nikki{
    constructor(date,title,honbun,gazou){
        this.date=date;
        this.title=title;
        this.honbun=honbun;
        this.gazou=gazou.replace(":","").replace("fakepath","").replace("C","").replace("\\","").replace("\\","");
        console.log("日記クラスを作成した");
    }
}

//日記クラスを要素とする配列
let Nikki_array = [];

//日記を作る
function makeNikki(date,title,honbun,gazou){
    Nikki_array.push(new Nikki(date,title,honbun,gazou));
    console.log("日記を作成しました");
    console.log(`日付：${Nikki_array[Nikki_array.length-1].date}`);
    console.log(`タイトル：${Nikki_array[Nikki_array.length-1].title}`);
    console.log(`本文：${Nikki_array[Nikki_array.length-1].honbun}`);
    console.log(`${Nikki_array[Nikki_array.length-1].gazou}`);
}

//日記全読み
function lookThroughNikki(){
    if(Nikki_array.length === 0){
        return $('.zoon-ue').after('<div class="balloon_l"><div class="faceicon"><img src="Alexa.jpeg" alt="" ></div><p class="says">日記はありません</p></div>');
    }
    
    for(let i = 0;i<Nikki_array.length;i++){
        $('.zoon-ue').after(`
        <div class="Nikki_content_zoon">
        <div class="Nikki_content">
             <div class="Nikki_content_texts">
                 <p class="Nikki_content_title">${Nikki_array[i].title}</p>
                 <p class="Nikki_content_date">${Nikki_array[i].date}</p>
                 <p class="Nikki_content_page">ページ${i+1}</p>
             </div>
             <img class="Nikki_content_gazou" src="${Nikki_array[i].gazou}" alt="" >
             <p class="Nikki_content_honbun">${Nikki_array[i].honbun}</p>   
         </div>
        </div>
         `);
    }
}

//日記を削除
function deleteNikki(index){
    if(Nikki_array.length===0){
        return $('.zoon-ue').after('<div class="balloon_l"><div class="faceicon"><img src="Alexa.jpeg" alt="" ></div><p class="says">日記はありません</p></div>'); 
    }
    Nikki_array.splice(index-1,1);
}

//ライトボタン押したら
$("#write").click(function () {
    if($("#date").val()==="" || $("#title").val()==="" || $("#honbun").val()===""||$("#gazou").val()===""){
        return $('.zoon-ue').after('<div class="balloon_l"><div class="faceicon"><img src="Alexa.jpeg" alt="" ></div><p class="says">日付、タイトル、本文、がぞう、全部入れてね</p></div>');
    }
    nikki_date = $("#date").val();
    nikki_title = $("#title").val(); 
    honbun_dummy = $("#honbun").val();
    honbun_dummy2 = honbun_dummy.split('\\n');
    nikki_honbun = honbun_dummy2.join('<br>');
    nikki_gazou = $("#gazou").val();
    
    makeNikki(nikki_date,nikki_title,nikki_honbun,nikki_gazou);

    $('.zoon-ue').after('<div class="balloon_l"><div class="faceicon"><img src="Alexa.jpeg" alt="" ></div><p class="says">日記を作成しました。</p></div>');
    
});

//リードボタン押したら
$("#read").click(function(){
    lookThroughNikki();
});

//ページ指定で日記を削除
$("#delete").click(function(){
    if($("#delete-input").val()===""){
        return $('.zoon-ue').after('<div class="balloon_l"><div class="faceicon"><img src="Alexa.jpeg" alt="" ></div><p class="says">数字を入れてね</p></div>');
    }
    deleteNikki($("#delete-input").val());
    $('.zoon-ue').after('<div class="balloon_l"><div class="faceicon"><img src="Alexa.jpeg" alt="" ></div><p class="says">項番'+$("#delete-input").val()+'を削除しました</p></div>');
});

//日記をローカルストレージに保存
$("#local-hozon").click(function(){
    if(Nikki_array.length===0){
        return $('.zoon-ue').after('<div class="balloon_l"><div class="faceicon"><img src="Alexa.jpeg" alt="" ></div><p class="says">ローカルに日記はありません</p></div>'); 
    }
    if (window.localStorage) {
        let jsonNikki = JSON.stringify(Nikki_array, undefined, 1);
        localStorage.setItem('日記配列', jsonNikki);
    }
});

//ローカルストレージの日記を取得
$("#local-yobidasi").click(function(){
    if (window.localStorage) {
        if(localStorage.getItem('日記配列')=== null){
            return $('.zoon-ue').after('<div class="balloon_l"><div class="faceicon"><img src="Alexa.jpeg" alt="" ></div><p class="says">ローカルに日記はありません</p></div>'); 
         }
        let json = localStorage.getItem('日記配列');
        Nikki_array = JSON.parse(json);
    }
});

//ローカルストレージの日記を削除
$("#local-delete").click(function(){
    if (window.localStorage) {
        localStorage.removeItem('日記配列');
    }
});

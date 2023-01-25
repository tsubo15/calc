let numBox = document.getElementById('num-box');
// 計算結果
let rtn = 0;
let rtn2 = 0;
// 計算する数字
let num1 = 0;
let num2 = 0;
// 計算結果を一時保管
let num3 = 0;
// 計算記号
let operate = '';
let percent = '';
let root = '';
let posiNega = '';
// メモリ記号
let memory = '';
let mrc = '';
// mrcのカウント
let mrcCount = 0;
// +/-のカウント
let pnCount = 0;
// メモリ用の計算結果一時保管
let mNum1 = 0;
let mNum2 = 0;
// フラグ
let numBoxRst = false;


// 計算記号の取得
function kigou(kigou){
    // num1とnum2が入っていたら、先に計算。その結果をnum1にする。
    if(num1 != 0 && num2 != 0){
        calculate();
            num1 = rtn;
    }

    operate = kigou;
    // 記号を取得したらフラグをtrueにする
    numBoxRst = true;
}

// 数字を一つ消す
function back (){
    if(operate == ''){
        num1 = Number(numBox.value.slice(0, -1));
        numBox.value = numBox.value.substring(0, numBox.value.length-1);
        console.log(num1);
    }
    else if(operate != '' || rtn == 0){
        num2 = Number(numBox.value.slice(0, -1));
        numBox.value = numBox.value.substring(0, numBox.value.length-1);
        console.log(num2);
    }
}


// 正負の記号を入れ替える
function posiOrNega(posiNegaKey){
    posiNega = posiNegaKey

    if(operate == ''){
        num1 = -num1;
        numBox.value = num1;
    }
    else if(operate != '' || rtn == 0){
        num2 = -num2;
        numBox.value = num2;
    }
    else{
        numBox.value = -numBox.value;
    }

}

// 数字を取得
function btnValue(addnum){

    // フラグがtrueの時に実行する
    if(numBoxRst){
        numBox.value = '';
        // numBoxを消したらフラグをfalseに戻しておく
        numBoxRst = false;
    }

    // もしoperateが空なら、num1に数値を入れる
    if(operate == ''){
        // num1を取得
        num1 = Number(numBox.value += addnum);
    }
    else if(operate != '' || rtn == 0){
        // num2を取得
        // 二桁以上にならない。なぜ？ => 記号を押したらボックスないの表示を消していたことが原因、フラグを活用して解消
        num2 = Number(numBox.value += addnum);
    }

}



function calculate(){
    // 計算する（四則演算）
    switch(operate){
        case '+':
            rtn = num1 + num2;
            break;
        case '-':
            rtn = num1 - num2;
            break;
        case '*':
            rtn = num1 * num2;
            break;
        case '/':
            rtn = num1 / num2;
            break;
    }

    // 計算結果を表示
    numBox.value = rtn;

    return rtn;
}

// メモリ計算
function memoryKey(memoryKey){
    memory = memoryKey;

    // M+,M-が押されたらrtnをmNum1に保存
    switch(memory){
        case 'm+':
            // 別の場所に格納しながら計算する
            calculate();
            if(mNum1 != 0){
                mNum2 = mNum1 + rtn;
                mNum1 = mNum2;
            }
            else{
                mNum1 = rtn;
            }
            
            break;
        case 'm-':
            calculate();
            if(mNum1 != 0){
                mNum2 = mNum1 - rtn;
                mNum1 = mNum2;
            }
            else{
                mNum1 = rtn;
            }
            break;
    }
    num1 = 0;
    num2 = 0;
    operate = '';
    numBoxRst = true;

}

function mrcKey(memoryKey){
    mrc = memoryKey;

    // mrcの押された回数をカウント
    if(mrc == 'mrc'){
        mrcCount += 1;
    }

    if(mrcCount == 1){
        numBox.value = mNum2;
    }
    else if(mrcCount <= 2){
        ac();
        // rtn2がnumBoxに表示されるため、関数acのあと非表示にする
        rtn = '';
    }

    return rtn;
}

// %の計算
function percentage(percentKey){
    percent = percentKey;

    switch(operate){
        // 割増
        case '+':
            num3 = num1 * num2/100;
            num2 = num3;
            break;
        // 割引
        case '-':
            num3 = num1 * num2/100;
            num2 = num3;
            break;
        // 割合
        case '*':
            rtn = num1 * num2/100;
            break;
    }

    numBox.value = rtn;

    return rtn;
}

// √の計算
function squareRoot(rootKey){
    root = rootKey;

    if(operate != '' && rtn == 0){
        // num2にルートをつけたとき
        num3 = Math.sqrt(num2);
        num2 = num3;
        numBox.value = num2;
    }
    else if(num1 !== 0 || operate == ''){
        // num1にルートをつけたとき
        num3 = Math.sqrt(num1);
        num1 = num3;
        numBox.value = num1;
    }

}

// ACを押すとbox内が空になる、変数も初期化したい
function ac(clear){
    numBox.value = clear;
    // 計算結果
    rtn = 0;
    rtn2 = 0;
    // 計算する数字
    num1 = 0;
    num2 = 0;
    num3 = 0;
    mNum1 = 0;
    mNum2 = 0;
    // 計算記号
    operate = '';
    percent = '';
    memory = '';
    mrcCount = 0;
    pnCount = 0;
}

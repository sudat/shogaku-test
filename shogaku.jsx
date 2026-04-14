import React, { useState } from "react";

export const TOTAL = 10;
const CHOICE_COLORS = ["#FF7B6B","#5BB8F5","#6BD680","#FFD166"];
const SHADOW_COLORS  = ["#CC5A4A","#3A8FC7","#4AAD60","#CCA840"];

// kun: {s: stem (answer), o: okurigana (appended to kanji in question)}
// kun: null → no kun reading taught at this grade

// ── Grade 1 (80 字) ────────────────────────────────────────────────
const G1 = [
  {k:"一",on:"いち",   kun:{s:"ひとつ",  o:""}},
  {k:"右",on:"う",     kun:{s:"みぎ",    o:""}},
  {k:"雨",on:"う",     kun:{s:"あめ",    o:""}},
  {k:"円",on:"えん",   kun:{s:"まる",    o:"い"}},
  {k:"王",on:"おう",   kun:null},
  {k:"音",on:"おん",   kun:{s:"おと",    o:""}},
  {k:"下",on:"か",     kun:{s:"した",    o:""}},
  {k:"火",on:"か",     kun:{s:"ひ",      o:""}},
  {k:"花",on:"か",     kun:{s:"はな",    o:""}},
  {k:"貝",on:null,     kun:{s:"かい",    o:""}},
  {k:"学",on:"がく",   kun:{s:"まな",    o:"ぶ"}},
  {k:"気",on:"き",     kun:null},
  {k:"九",on:"きゅう", kun:{s:"ここのつ",o:""}},
  {k:"休",on:"きゅう", kun:{s:"やす",    o:"む"}},
  {k:"玉",on:"ぎょく", kun:{s:"たま",    o:""}},
  {k:"金",on:"きん",   kun:{s:"かね",    o:""}},
  {k:"空",on:"くう",   kun:{s:"そら",    o:""}},
  {k:"月",on:"げつ",   kun:{s:"つき",    o:""}},
  {k:"犬",on:"けん",   kun:{s:"いぬ",    o:""}},
  {k:"見",on:"けん",   kun:{s:"み",      o:"る"}},
  {k:"五",on:"ご",     kun:{s:"いつつ",  o:""}},
  {k:"口",on:"こう",   kun:{s:"くち",    o:""}},
  {k:"校",on:"こう",   kun:null},
  {k:"左",on:"さ",     kun:{s:"ひだり",  o:""}},
  {k:"三",on:"さん",   kun:{s:"みっつ",  o:""}},
  {k:"山",on:"さん",   kun:{s:"やま",    o:""}},
  {k:"子",on:"し",     kun:{s:"こ",      o:""}},
  {k:"四",on:"し",     kun:{s:"よっつ",  o:""}},
  {k:"糸",on:"し",     kun:{s:"いと",    o:""}},
  {k:"字",on:"じ",     kun:null},
  {k:"耳",on:"じ",     kun:{s:"みみ",    o:""}},
  {k:"七",on:"しち",   kun:{s:"ななつ",  o:""}},
  {k:"車",on:"しゃ",   kun:{s:"くるま",  o:""}},
  {k:"手",on:"しゅ",   kun:{s:"て",      o:""}},
  {k:"十",on:"じゅう", kun:{s:"とお",    o:""}},
  {k:"出",on:"しゅつ", kun:{s:"で",      o:"る"}},
  {k:"女",on:"じょ",   kun:{s:"おんな",  o:""}},
  {k:"小",on:"しょう", kun:{s:"ちい",    o:"さい"}},
  {k:"上",on:"じょう", kun:{s:"うえ",    o:""}},
  {k:"森",on:"しん",   kun:{s:"もり",    o:""}},
  {k:"人",on:"じん",   kun:{s:"ひと",    o:""}},
  {k:"水",on:"すい",   kun:{s:"みず",    o:""}},
  {k:"正",on:"せい",   kun:{s:"ただ",    o:"しい"}},
  {k:"生",on:"せい",   kun:{s:"なま",    o:""}},
  {k:"青",on:"せい",   kun:{s:"あお",    o:"い"}},
  {k:"夕",on:"せき",   kun:{s:"ゆう",    o:""}},
  {k:"石",on:"せき",   kun:{s:"いし",    o:""}},
  {k:"赤",on:"せき",   kun:{s:"あか",    o:"い"}},
  {k:"千",on:"せん",   kun:null},
  {k:"川",on:null,     kun:{s:"かわ",    o:""}},
  {k:"先",on:"せん",   kun:{s:"さき",    o:""}},
  {k:"早",on:"そう",   kun:{s:"はや",    o:"い"}},
  {k:"草",on:"そう",   kun:{s:"くさ",    o:""}},
  {k:"足",on:"そく",   kun:{s:"あし",    o:""}},
  {k:"村",on:"そん",   kun:{s:"むら",    o:""}},
  {k:"大",on:"だい",   kun:{s:"おお",    o:"きい"}},
  {k:"男",on:"だん",   kun:{s:"おとこ",  o:""}},
  {k:"竹",on:"ちく",   kun:{s:"たけ",    o:""}},
  {k:"中",on:"ちゅう", kun:{s:"なか",    o:""}},
  {k:"虫",on:"ちゅう", kun:{s:"むし",    o:""}},
  {k:"町",on:"ちょう", kun:{s:"まち",    o:""}},
  {k:"天",on:"てん",   kun:{s:"あま",    o:""}},
  {k:"田",on:"でん",   kun:{s:"た",      o:""}},
  {k:"土",on:"ど",     kun:{s:"つち",    o:""}},
  {k:"二",on:"に",     kun:{s:"ふたつ",  o:""}},
  {k:"日",on:"にち",   kun:{s:"ひ",      o:""}},
  {k:"入",on:"にゅう", kun:{s:"はい",    o:"る"}},
  {k:"年",on:"ねん",   kun:{s:"とし",    o:""}},
  {k:"白",on:"はく",   kun:{s:"しろ",    o:"い"}},
  {k:"八",on:"はち",   kun:{s:"やっつ",  o:""}},
  {k:"百",on:"ひゃく", kun:null},
  {k:"文",on:"ぶん",   kun:{s:"ふみ",    o:""}},
  {k:"木",on:"もく",   kun:{s:"き",      o:""}},
  {k:"本",on:"ほん",   kun:{s:"もと",    o:""}},
  {k:"名",on:"めい",   kun:{s:"な",      o:""}},
  {k:"目",on:"もく",   kun:{s:"め",      o:""}},
  {k:"立",on:"りつ",   kun:{s:"た",      o:"つ"}},
  {k:"力",on:"りょく", kun:{s:"ちから",  o:""}},
  {k:"林",on:"りん",   kun:{s:"はやし",  o:""}},
  {k:"六",on:"ろく",   kun:{s:"むっつ",  o:""}},
];

// ── Grade 2 (160 字) ───────────────────────────────────────────────
const G2 = [
  {k:"引",on:"いん",   kun:{s:"ひ",      o:"く"}},
  {k:"羽",on:"う",     kun:{s:"はね",    o:""}},
  {k:"雲",on:"うん",   kun:{s:"くも",    o:""}},
  {k:"園",on:"えん",   kun:{s:"その",    o:""}},
  {k:"遠",on:"えん",   kun:{s:"とお",    o:"い"}},
  {k:"何",on:"か",     kun:{s:"なに",    o:""}},
  {k:"科",on:"か",     kun:null},
  {k:"夏",on:"か",     kun:{s:"なつ",    o:""}},
  {k:"家",on:"か",     kun:{s:"いえ",    o:""}},
  {k:"歌",on:"か",     kun:{s:"うた",    o:"う"}},
  {k:"画",on:"が",     kun:null},
  {k:"回",on:"かい",   kun:{s:"まわ",    o:"る"}},
  {k:"会",on:"かい",   kun:{s:"あ",      o:"う"}},
  {k:"海",on:"かい",   kun:{s:"うみ",    o:""}},
  {k:"絵",on:"かい",   kun:{s:"え",      o:""}},
  {k:"外",on:"がい",   kun:{s:"そと",    o:""}},
  {k:"角",on:"かく",   kun:{s:"かど",    o:""}},
  {k:"楽",on:"がく",   kun:{s:"たの",    o:"しい"}},
  {k:"活",on:"かつ",   kun:null},
  {k:"間",on:"かん",   kun:{s:"あいだ",  o:""}},
  {k:"丸",on:"がん",   kun:{s:"まる",    o:"い"}},
  {k:"岩",on:"がん",   kun:{s:"いわ",    o:""}},
  {k:"顔",on:"がん",   kun:{s:"かお",    o:""}},
  {k:"汽",on:"き",     kun:null},
  {k:"記",on:"き",     kun:{s:"しる",    o:"す"}},
  {k:"帰",on:"き",     kun:{s:"かえ",    o:"る"}},
  {k:"弓",on:"きゅう", kun:{s:"ゆみ",    o:""}},
  {k:"牛",on:"ぎゅう", kun:{s:"うし",    o:""}},
  {k:"魚",on:"ぎょ",   kun:{s:"さかな",  o:""}},
  {k:"京",on:"きょう", kun:null},
  {k:"強",on:"きょう", kun:{s:"つよ",    o:"い"}},
  {k:"教",on:"きょう", kun:{s:"おし",    o:"える"}},
  {k:"近",on:"きん",   kun:{s:"ちか",    o:"い"}},
  {k:"兄",on:"けい",   kun:{s:"あに",    o:""}},
  {k:"形",on:"けい",   kun:{s:"かたち",  o:""}},
  {k:"計",on:"けい",   kun:{s:"はか",    o:"る"}},
  {k:"元",on:"げん",   kun:{s:"もと",    o:""}},
  {k:"言",on:"げん",   kun:{s:"い",      o:"う"}},
  {k:"原",on:"げん",   kun:{s:"はら",    o:""}},
  {k:"戸",on:"こ",     kun:{s:"と",      o:""}},
  {k:"古",on:"こ",     kun:{s:"ふる",    o:"い"}},
  {k:"午",on:"ご",     kun:null},
  {k:"後",on:"ご",     kun:{s:"うしろ",  o:""}},
  {k:"語",on:"ご",     kun:{s:"かた",    o:"る"}},
  {k:"工",on:"こう",   kun:null},
  {k:"公",on:"こう",   kun:{s:"おおやけ",o:""}},
  {k:"広",on:"こう",   kun:{s:"ひろ",    o:"い"}},
  {k:"交",on:"こう",   kun:{s:"まじ",    o:"わる"}},
  {k:"光",on:"こう",   kun:{s:"ひか",    o:"る"}},
  {k:"考",on:"こう",   kun:{s:"かんが",  o:"える"}},
  {k:"行",on:"こう",   kun:{s:"い",      o:"く"}},
  {k:"高",on:"こう",   kun:{s:"たか",    o:"い"}},
  {k:"黄",on:"おう",   kun:{s:"き",      o:""}},
  {k:"合",on:"ごう",   kun:{s:"あ",      o:"う"}},
  {k:"谷",on:"こく",   kun:{s:"たに",    o:""}},
  {k:"国",on:"こく",   kun:{s:"くに",    o:""}},
  {k:"黒",on:"こく",   kun:{s:"くろ",    o:"い"}},
  {k:"今",on:"こん",   kun:{s:"いま",    o:""}},
  {k:"才",on:"さい",   kun:null},
  {k:"細",on:"さい",   kun:{s:"ほそ",    o:"い"}},
  {k:"作",on:"さく",   kun:{s:"つく",    o:"る"}},
  {k:"算",on:"さん",   kun:null},
  {k:"止",on:"し",     kun:{s:"と",      o:"まる"}},
  {k:"市",on:"し",     kun:{s:"いち",    o:""}},
  {k:"矢",on:"し",     kun:{s:"や",      o:""}},
  {k:"姉",on:"し",     kun:{s:"あね",    o:""}},
  {k:"思",on:"し",     kun:{s:"おも",    o:"う"}},
  {k:"紙",on:"し",     kun:{s:"かみ",    o:""}},
  {k:"寺",on:"じ",     kun:{s:"てら",    o:""}},
  {k:"自",on:"じ",     kun:null},
  {k:"時",on:"じ",     kun:{s:"とき",    o:""}},
  {k:"室",on:"しつ",   kun:null},
  {k:"社",on:"しゃ",   kun:{s:"やしろ",  o:""}},
  {k:"弱",on:"じゃく", kun:{s:"よわ",    o:"い"}},
  {k:"首",on:"しゅ",   kun:{s:"くび",    o:""}},
  {k:"秋",on:"しゅう", kun:{s:"あき",    o:""}},
  {k:"週",on:"しゅう", kun:null},
  {k:"春",on:"しゅん", kun:{s:"はる",    o:""}},
  {k:"書",on:"しょ",   kun:{s:"か",      o:"く"}},
  {k:"少",on:"しょう", kun:{s:"すこ",    o:"し"}},
  {k:"場",on:"じょう", kun:{s:"ば",      o:""}},
  {k:"色",on:"しょく", kun:{s:"いろ",    o:""}},
  {k:"食",on:"しょく", kun:{s:"た",      o:"べる"}},
  {k:"心",on:"しん",   kun:{s:"こころ",  o:""}},
  {k:"新",on:"しん",   kun:{s:"あたら",  o:"しい"}},
  {k:"親",on:"しん",   kun:{s:"おや",    o:""}},
  {k:"図",on:"ず",     kun:null},
  {k:"数",on:"すう",   kun:{s:"かず",    o:""}},
  {k:"西",on:"せい",   kun:{s:"にし",    o:""}},
  {k:"声",on:"せい",   kun:{s:"こえ",    o:""}},
  {k:"星",on:"せい",   kun:{s:"ほし",    o:""}},
  {k:"晴",on:"せい",   kun:{s:"は",      o:"れる"}},
  {k:"切",on:"せつ",   kun:{s:"き",      o:"る"}},
  {k:"雪",on:"せつ",   kun:{s:"ゆき",    o:""}},
  {k:"船",on:"せん",   kun:{s:"ふね",    o:""}},
  {k:"線",on:"せん",   kun:null},
  {k:"前",on:"ぜん",   kun:{s:"まえ",    o:""}},
  {k:"組",on:"そ",     kun:{s:"く",      o:"む"}},
  {k:"走",on:"そう",   kun:{s:"はし",    o:"る"}},
  {k:"多",on:"た",     kun:{s:"おお",    o:"い"}},
  {k:"太",on:"たい",   kun:{s:"ふと",    o:"い"}},
  {k:"体",on:"たい",   kun:{s:"からだ",  o:""}},
  {k:"台",on:"だい",   kun:null},
  {k:"地",on:"ち",     kun:null},
  {k:"池",on:"ち",     kun:{s:"いけ",    o:""}},
  {k:"知",on:"ち",     kun:{s:"し",      o:"る"}},
  {k:"茶",on:"ちゃ",   kun:null},
  {k:"昼",on:"ちゅう", kun:{s:"ひる",    o:""}},
  {k:"長",on:"ちょう", kun:{s:"なが",    o:"い"}},
  {k:"鳥",on:"ちょう", kun:{s:"とり",    o:""}},
  {k:"朝",on:"ちょう", kun:{s:"あさ",    o:""}},
  {k:"直",on:"ちょく", kun:{s:"なお",    o:"す"}},
  {k:"通",on:"つう",   kun:{s:"とお",    o:"る"}},
  {k:"弟",on:"てい",   kun:{s:"おとうと",o:""}},
  {k:"店",on:"てん",   kun:{s:"みせ",    o:""}},
  {k:"点",on:"てん",   kun:null},
  {k:"電",on:"でん",   kun:null},
  {k:"刀",on:"とう",   kun:{s:"かたな",  o:""}},
  {k:"冬",on:"とう",   kun:{s:"ふゆ",    o:""}},
  {k:"当",on:"とう",   kun:{s:"あ",      o:"たる"}},
  {k:"東",on:"とう",   kun:{s:"ひがし",  o:""}},
  {k:"答",on:"とう",   kun:{s:"こた",    o:"える"}},
  {k:"頭",on:"とう",   kun:{s:"あたま",  o:""}},
  {k:"同",on:"どう",   kun:{s:"おな",    o:"じ"}},
  {k:"道",on:"どう",   kun:{s:"みち",    o:""}},
  {k:"読",on:"どく",   kun:{s:"よ",      o:"む"}},
  {k:"内",on:"ない",   kun:{s:"うち",    o:""}},
  {k:"南",on:"なん",   kun:{s:"みなみ",  o:""}},
  {k:"肉",on:"にく",   kun:null},
  {k:"馬",on:"ば",     kun:{s:"うま",    o:""}},
  {k:"売",on:"ばい",   kun:{s:"う",      o:"る"}},
  {k:"買",on:"ばい",   kun:{s:"か",      o:"う"}},
  {k:"麦",on:"ばく",   kun:{s:"むぎ",    o:""}},
  {k:"半",on:"はん",   kun:{s:"なか",    o:"ば"}},
  {k:"番",on:"ばん",   kun:null},
  {k:"父",on:"ふ",     kun:{s:"ちち",    o:""}},
  {k:"風",on:"ふう",   kun:{s:"かぜ",    o:""}},
  {k:"分",on:"ぶん",   kun:{s:"わ",      o:"かる"}},
  {k:"聞",on:"ぶん",   kun:{s:"き",      o:"く"}},
  {k:"米",on:"べい",   kun:{s:"こめ",    o:""}},
  {k:"歩",on:"ほ",     kun:{s:"ある",    o:"く"}},
  {k:"母",on:"ぼ",     kun:{s:"はは",    o:""}},
  {k:"方",on:"ほう",   kun:{s:"かた",    o:""}},
  {k:"北",on:"ほく",   kun:{s:"きた",    o:""}},
  {k:"毎",on:"まい",   kun:null},
  {k:"妹",on:"まい",   kun:{s:"いもうと",o:""}},
  {k:"万",on:"まん",   kun:null},
  {k:"明",on:"めい",   kun:{s:"あか",    o:"るい"}},
  {k:"鳴",on:"めい",   kun:{s:"な",      o:"く"}},
  {k:"毛",on:"もう",   kun:{s:"け",      o:""}},
  {k:"門",on:"もん",   kun:{s:"かど",    o:""}},
  {k:"夜",on:"や",     kun:{s:"よる",    o:""}},
  {k:"野",on:"や",     kun:{s:"の",      o:""}},
  {k:"友",on:"ゆう",   kun:{s:"とも",    o:""}},
  {k:"用",on:"よう",   kun:null},
  {k:"曜",on:"よう",   kun:null},
  {k:"来",on:"らい",   kun:{s:"く",      o:"る"}},
  {k:"里",on:"り",     kun:{s:"さと",    o:""}},
  {k:"理",on:"り",     kun:null},
  {k:"話",on:"わ",     kun:{s:"はな",    o:"す"}},
];

// ── Grade 3 (200 字) ───────────────────────────────────────────────
const G3 = [
  {k:"悪",on:"あく",   kun:{s:"わる",    o:"い"}},
  {k:"安",on:"あん",   kun:{s:"やす",    o:"い"}},
  {k:"暗",on:"あん",   kun:{s:"くら",    o:"い"}},
  {k:"医",on:"い",     kun:null},
  {k:"委",on:"い",     kun:null},
  {k:"意",on:"い",     kun:null},
  {k:"育",on:"いく",   kun:{s:"そだ",    o:"てる"}},
  {k:"員",on:"いん",   kun:null},
  {k:"院",on:"いん",   kun:null},
  {k:"飲",on:"いん",   kun:{s:"の",      o:"む"}},
  {k:"運",on:"うん",   kun:{s:"はこ",    o:"ぶ"}},
  {k:"泳",on:"えい",   kun:{s:"およ",    o:"ぐ"}},
  {k:"駅",on:"えき",   kun:null},
  {k:"央",on:"おう",   kun:null},
  {k:"横",on:"おう",   kun:{s:"よこ",    o:""}},
  {k:"屋",on:"おく",   kun:{s:"や",      o:""}},
  {k:"温",on:"おん",   kun:{s:"あたた",  o:"かい"}},
  {k:"化",on:"か",     kun:{s:"ば",      o:"ける"}},
  {k:"荷",on:"か",     kun:{s:"に",      o:""}},
  {k:"界",on:"かい",   kun:null},
  {k:"開",on:"かい",   kun:{s:"あ",      o:"く"}},
  {k:"階",on:"かい",   kun:null},
  {k:"寒",on:"かん",   kun:{s:"さむ",    o:"い"}},
  {k:"感",on:"かん",   kun:null},
  {k:"漢",on:"かん",   kun:null},
  {k:"館",on:"かん",   kun:{s:"やかた",  o:""}},
  {k:"岸",on:"がん",   kun:{s:"きし",    o:""}},
  {k:"起",on:"き",     kun:{s:"お",      o:"きる"}},
  {k:"期",on:"き",     kun:null},
  {k:"客",on:"きゃく", kun:null},
  {k:"究",on:"きゅう", kun:{s:"きわ",    o:"める"}},
  {k:"急",on:"きゅう", kun:{s:"いそ",    o:"ぐ"}},
  {k:"級",on:"きゅう", kun:null},
  {k:"宮",on:"きゅう", kun:{s:"みや",    o:""}},
  {k:"球",on:"きゅう", kun:{s:"たま",    o:""}},
  {k:"去",on:"きょ",   kun:{s:"さ",      o:"る"}},
  {k:"橋",on:"きょう", kun:{s:"はし",    o:""}},
  {k:"業",on:"ぎょう", kun:{s:"わざ",    o:""}},
  {k:"曲",on:"きょく", kun:{s:"ま",      o:"げる"}},
  {k:"局",on:"きょく", kun:null},
  {k:"銀",on:"ぎん",   kun:null},
  {k:"区",on:"く",     kun:null},
  {k:"苦",on:"く",     kun:{s:"くる",    o:"しい"}},
  {k:"具",on:"ぐ",     kun:null},
  {k:"君",on:"くん",   kun:{s:"きみ",    o:""}},
  {k:"係",on:"けい",   kun:{s:"かか",    o:"る"}},
  {k:"軽",on:"けい",   kun:{s:"かる",    o:"い"}},
  {k:"血",on:"けつ",   kun:{s:"ち",      o:""}},
  {k:"決",on:"けつ",   kun:{s:"き",      o:"める"}},
  {k:"研",on:"けん",   kun:{s:"と",      o:"ぐ"}},
  {k:"県",on:"けん",   kun:null},
  {k:"庫",on:"こ",     kun:null},
  {k:"湖",on:"こ",     kun:{s:"みずうみ",o:""}},
  {k:"向",on:"こう",   kun:{s:"む",      o:"く"}},
  {k:"幸",on:"こう",   kun:{s:"しあわ",  o:"せ"}},
  {k:"港",on:"こう",   kun:{s:"みなと",  o:""}},
  {k:"号",on:"ごう",   kun:null},
  {k:"根",on:"こん",   kun:{s:"ね",      o:""}},
  {k:"祭",on:"さい",   kun:{s:"まつ",    o:"り"}},
  {k:"皿",on:null,     kun:{s:"さら",    o:""}},
  {k:"仕",on:"し",     kun:{s:"つか",    o:"える"}},
  {k:"死",on:"し",     kun:null},
  {k:"使",on:"し",     kun:{s:"つか",    o:"う"}},
  {k:"始",on:"し",     kun:{s:"はじ",    o:"める"}},
  {k:"指",on:"し",     kun:{s:"ゆび",    o:""}},
  {k:"歯",on:"し",     kun:{s:"は",      o:""}},
  {k:"詩",on:"し",     kun:null},
  {k:"次",on:"じ",     kun:{s:"つ",      o:"ぐ"}},
  {k:"事",on:"じ",     kun:{s:"こと",    o:""}},
  {k:"持",on:"じ",     kun:{s:"も",      o:"つ"}},
  {k:"式",on:"しき",   kun:null},
  {k:"実",on:"じつ",   kun:{s:"み",      o:""}},
  {k:"写",on:"しゃ",   kun:{s:"うつ",    o:"す"}},
  {k:"者",on:"しゃ",   kun:{s:"もの",    o:""}},
  {k:"主",on:"しゅ",   kun:{s:"ぬし",    o:""}},
  {k:"守",on:"しゅ",   kun:{s:"まも",    o:"る"}},
  {k:"取",on:"しゅ",   kun:{s:"と",      o:"る"}},
  {k:"酒",on:"しゅ",   kun:{s:"さけ",    o:""}},
  {k:"受",on:"じゅ",   kun:{s:"う",      o:"ける"}},
  {k:"州",on:"しゅう", kun:{s:"す",      o:""}},
  {k:"拾",on:"じゅう", kun:{s:"ひろ",    o:"う"}},
  {k:"終",on:"しゅう", kun:{s:"お",      o:"わる"}},
  {k:"習",on:"しゅう", kun:{s:"なら",    o:"う"}},
  {k:"集",on:"しゅう", kun:{s:"あつ",    o:"まる"}},
  {k:"住",on:"じゅう", kun:{s:"す",      o:"む"}},
  {k:"重",on:"じゅう", kun:{s:"おも",    o:"い"}},
  {k:"宿",on:"しゅく", kun:{s:"やど",    o:""}},
  {k:"所",on:"しょ",   kun:{s:"ところ",  o:""}},
  {k:"暑",on:"しょ",   kun:{s:"あつ",    o:"い"}},
  {k:"助",on:"じょ",   kun:{s:"たす",    o:"ける"}},
  {k:"昭",on:"しょう", kun:null},
  {k:"消",on:"しょう", kun:{s:"き",      o:"える"}},
  {k:"商",on:"しょう", kun:null},
  {k:"章",on:"しょう", kun:null},
  {k:"勝",on:"しょう", kun:{s:"か",      o:"つ"}},
  {k:"乗",on:"じょう", kun:{s:"の",      o:"る"}},
  {k:"植",on:"しょく", kun:{s:"う",      o:"える"}},
  {k:"申",on:"しん",   kun:{s:"もう",    o:"す"}},
  {k:"身",on:"しん",   kun:{s:"み",      o:""}},
  {k:"神",on:"しん",   kun:{s:"かみ",    o:""}},
  {k:"真",on:"しん",   kun:{s:"ま",      o:""}},
  {k:"深",on:"しん",   kun:{s:"ふか",    o:"い"}},
  {k:"進",on:"しん",   kun:{s:"すす",    o:"む"}},
  {k:"世",on:"せい",   kun:{s:"よ",      o:""}},
  {k:"整",on:"せい",   kun:{s:"ととの",  o:"える"}},
  {k:"昔",on:"せき",   kun:{s:"むかし",  o:""}},
  {k:"全",on:"ぜん",   kun:{s:"まった",  o:"く"}},
  {k:"相",on:"そう",   kun:{s:"あい",    o:""}},
  {k:"送",on:"そう",   kun:{s:"おく",    o:"る"}},
  {k:"想",on:"そう",   kun:null},
  {k:"息",on:"そく",   kun:{s:"いき",    o:""}},
  {k:"速",on:"そく",   kun:{s:"はや",    o:"い"}},
  {k:"族",on:"ぞく",   kun:null},
  {k:"他",on:"た",     kun:{s:"ほか",    o:""}},
  {k:"打",on:"だ",     kun:{s:"う",      o:"つ"}},
  {k:"対",on:"たい",   kun:null},
  {k:"待",on:"たい",   kun:{s:"ま",      o:"つ"}},
  {k:"代",on:"だい",   kun:{s:"か",      o:"わる"}},
  {k:"第",on:"だい",   kun:null},
  {k:"題",on:"だい",   kun:null},
  {k:"炭",on:"たん",   kun:{s:"すみ",    o:""}},
  {k:"短",on:"たん",   kun:{s:"みじか",  o:"い"}},
  {k:"談",on:"だん",   kun:null},
  {k:"着",on:"ちゃく", kun:{s:"き",      o:"る"}},
  {k:"注",on:"ちゅう", kun:{s:"そそ",    o:"ぐ"}},
  {k:"柱",on:"ちゅう", kun:{s:"はしら",  o:""}},
  {k:"丁",on:"ちょう", kun:null},
  {k:"帳",on:"ちょう", kun:null},
  {k:"調",on:"ちょう", kun:{s:"しら",    o:"べる"}},
  {k:"追",on:"つい",   kun:{s:"お",      o:"う"}},
  {k:"定",on:"てい",   kun:{s:"さだ",    o:"める"}},
  {k:"庭",on:"てい",   kun:{s:"にわ",    o:""}},
  {k:"笛",on:null,     kun:{s:"ふえ",    o:""}},
  {k:"鉄",on:"てつ",   kun:null},
  {k:"転",on:"てん",   kun:{s:"ころ",    o:"がる"}},
  {k:"都",on:"と",     kun:{s:"みやこ",  o:""}},
  {k:"度",on:"ど",     kun:{s:"たび",    o:""}},
  {k:"投",on:"とう",   kun:{s:"な",      o:"げる"}},
  {k:"豆",on:"とう",   kun:{s:"まめ",    o:""}},
  {k:"島",on:"とう",   kun:{s:"しま",    o:""}},
  {k:"湯",on:"とう",   kun:{s:"ゆ",      o:""}},
  {k:"登",on:"とう",   kun:{s:"のぼ",    o:"る"}},
  {k:"等",on:"とう",   kun:{s:"ひと",    o:"しい"}},
  {k:"動",on:"どう",   kun:{s:"うご",    o:"く"}},
  {k:"童",on:"どう",   kun:{s:"わらべ",  o:""}},
  {k:"農",on:"のう",   kun:null},
  {k:"波",on:"は",     kun:{s:"なみ",    o:""}},
  {k:"配",on:"はい",   kun:{s:"くば",    o:"る"}},
  {k:"倍",on:"ばい",   kun:null},
  {k:"箱",on:null,     kun:{s:"はこ",    o:""}},
  {k:"畑",on:null,     kun:{s:"はたけ",  o:""}},
  {k:"発",on:"はつ",   kun:null},
  {k:"反",on:"はん",   kun:{s:"そ",      o:"る"}},
  {k:"坂",on:null,     kun:{s:"さか",    o:""}},
  {k:"板",on:"はん",   kun:{s:"いた",    o:""}},
  {k:"皮",on:"ひ",     kun:{s:"かわ",    o:""}},
  {k:"悲",on:"ひ",     kun:{s:"かな",    o:"しい"}},
  {k:"美",on:"び",     kun:{s:"うつく",  o:"しい"}},
  {k:"鼻",on:"び",     kun:{s:"はな",    o:""}},
  {k:"筆",on:"ひつ",   kun:{s:"ふで",    o:""}},
  {k:"氷",on:"ひょう", kun:{s:"こおり",  o:""}},
  {k:"表",on:"ひょう", kun:{s:"おもて",  o:""}},
  {k:"秒",on:"びょう", kun:null},
  {k:"病",on:"びょう", kun:{s:"や",      o:"む"}},
  {k:"品",on:"ひん",   kun:{s:"しな",    o:""}},
  {k:"負",on:"ふ",     kun:{s:"ま",      o:"ける"}},
  {k:"部",on:"ぶ",     kun:null},
  {k:"服",on:"ふく",   kun:null},
  {k:"福",on:"ふく",   kun:null},
  {k:"物",on:"ぶつ",   kun:{s:"もの",    o:""}},
  {k:"平",on:"へい",   kun:{s:"たいら",  o:""}},
  {k:"返",on:"へん",   kun:{s:"かえ",    o:"す"}},
  {k:"勉",on:"べん",   kun:null},
  {k:"放",on:"ほう",   kun:{s:"はな",    o:"す"}},
  {k:"味",on:"み",     kun:{s:"あじ",    o:""}},
  {k:"命",on:"めい",   kun:{s:"いのち",  o:""}},
  {k:"面",on:"めん",   kun:{s:"おもて",  o:""}},
  {k:"問",on:"もん",   kun:{s:"と",      o:"う"}},
  {k:"役",on:"やく",   kun:null},
  {k:"薬",on:"やく",   kun:{s:"くすり",  o:""}},
  {k:"由",on:"ゆ",     kun:{s:"よし",    o:""}},
  {k:"油",on:"ゆ",     kun:{s:"あぶら",  o:""}},
  {k:"有",on:"ゆう",   kun:{s:"あ",      o:"る"}},
  {k:"遊",on:"ゆう",   kun:{s:"あそ",    o:"ぶ"}},
  {k:"予",on:"よ",     kun:null},
  {k:"羊",on:"よう",   kun:{s:"ひつじ",  o:""}},
  {k:"洋",on:"よう",   kun:null},
  {k:"葉",on:"よう",   kun:{s:"は",      o:""}},
  {k:"陽",on:"よう",   kun:null},
  {k:"様",on:"よう",   kun:{s:"さま",    o:""}},
  {k:"落",on:"らく",   kun:{s:"お",      o:"ちる"}},
  {k:"流",on:"りゅう", kun:{s:"なが",    o:"れる"}},
  {k:"旅",on:"りょ",   kun:{s:"たび",    o:""}},
  {k:"両",on:"りょう", kun:null},
  {k:"緑",on:"りょく", kun:{s:"みどり",  o:""}},
  {k:"礼",on:"れい",   kun:null},
  {k:"列",on:"れつ",   kun:null},
  {k:"練",on:"れん",   kun:{s:"ね",      o:"る"}},
  {k:"路",on:"ろ",     kun:{s:"じ",      o:""}},
  {k:"和",on:"わ",     kun:{s:"やわ",    o:"らぐ"}},
];

export const GRADE_DATA  = { 1: G1, 2: G2, 3: G3 };
export const GRADE_LABEL = { 1: "小学１年生", 2: "小学２年生", 3: "小学３年生" };

// ── Utilities ──────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function makeQuestions(data, mode) {
  const pool = [];
  for (const e of data) {
    if (mode !== "kun" && e.on)
      pool.push({ k: e.k, reading: e.on, displayK: e.k, type: "おんよみ" });
    if (mode !== "on" && e.kun)
      pool.push({ k: e.k, reading: e.kun.s, displayK: e.k + e.kun.o, type: "くんよみ" });
  }
  const shuffled = shuffle(pool);
  const used = new Set();
  const selected = [];
  for (const item of shuffled) {
    if (!used.has(item.k) && selected.length < TOTAL) {
      used.add(item.k);
      selected.push(item);
    }
  }
  return selected.map(item => {
    const uniqueDist = [...new Set(
      pool.filter(p => p.type === item.type && p.reading !== item.reading).map(p => p.reading)
    )];
    const choices = shuffle([item.reading, ...shuffle(uniqueDist).slice(0, 3)]);
    return { ...item, choices };
  });
}

// ── CSS ────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Kaisei+Decol:wght@400;700&family=Kosugi+Maru&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

.kq-app{
  min-height:100vh;
  background:linear-gradient(150deg,#FFF8ED 0%,#FFE8CC 45%,#FFD6D6 100%);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:20px;font-family:'Kosugi Maru','Hiragino Kaku Gothic ProN',sans-serif;
}

/* ── START ── */
.kq-logo{font-size:44px;display:block;text-align:center;margin-bottom:4px;animation:kqBounce 2.2s ease-in-out infinite;}
@keyframes kqBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}

.kq-title{
  font-family:'Kaisei Decol','Hiragino Mincho ProN',serif;
  font-size:clamp(24px,6.5vw,38px);color:#4A2C1A;text-align:center;margin-bottom:3px;
}
.kq-titleLine{display:block;}
.kq-titleNames{font-size:clamp(20px,5.4vw,31px);margin-bottom:2px;}
.kq-name-akari{color:#FF7B6B;}
.kq-name-toshiharu{color:#34B89A;}
.kq-sub{font-size:12px;color:#A07060;text-align:center;margin-bottom:22px;letter-spacing:.06em;}

.kq-grade-row{
  display:flex;gap:6px;padding:4px;
  background:rgba(0,0,0,.06);border-radius:14px;
  margin-bottom:18px;width:100%;max-width:300px;
}
.kq-grade-btn{
  flex:1;padding:10px 4px;border-radius:11px;border:none;cursor:pointer;
  font-family:'Kosugi Maru',sans-serif;font-size:13px;font-weight:700;
  color:#9B7060;background:transparent;transition:all .2s;
}
.kq-grade-btn.active{background:white;color:#FF7B6B;box-shadow:0 2px 8px rgba(0,0,0,.1);}

.kq-modes{display:flex;flex-direction:column;gap:10px;width:100%;max-width:300px;}
.kq-modeBtn{
  display:flex;align-items:center;gap:14px;padding:14px 18px;
  border-radius:16px;border:none;cursor:pointer;
  font-family:'Kosugi Maru',sans-serif;font-size:16px;font-weight:700;color:white;
  box-shadow:0 5px 0 rgba(0,0,0,.18);transition:transform .1s,box-shadow .1s;
}
.kq-modeBtn:active{transform:translateY(4px);box-shadow:0 1px 0 rgba(0,0,0,.18);}
.kq-modeBtn-on  {background:linear-gradient(135deg,#FF7B6B,#FF5E4E);}
.kq-modeBtn-both{background:linear-gradient(135deg,#A855F7,#8B3FE0);}
.kq-modeBtn-kun {background:linear-gradient(135deg,#34B89A,#20967D);}
.kq-modeEmoji{font-size:22px;}
.kq-modeName{font-size:16px;}
.kq-modeSub{font-size:11px;opacity:.82;font-weight:400;margin-top:1px;}

/* ── QUIZ ── */
.kq-card{
  background:white;border-radius:26px;padding:22px 20px 26px;
  width:100%;max-width:370px;
  box-shadow:0 10px 34px rgba(200,120,80,.14);
  animation:kqSlide .26s ease;
}
@keyframes kqSlide{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}

.kq-progress{display:flex;align-items:center;gap:5px;justify-content:center;margin-bottom:14px;}
.kq-dot{height:9px;border-radius:5px;transition:all .3s;}
.kq-dot-done   {width:9px; background:#34B89A;}
.kq-dot-current{width:20px;background:#FF7B6B;}
.kq-dot-future {width:9px; background:#EAE0D8;}

.kq-qmeta{text-align:center;font-size:11px;color:#B09080;margin-bottom:2px;letter-spacing:.05em;}
.kq-type {text-align:center;font-size:14px;color:#7A4A30;margin-bottom:4px;font-weight:700;}

.kq-kanji{
  text-align:center;
  font-family:'Kaisei Decol','Hiragino Mincho ProN',serif;
  line-height:1.05;color:#2C1A0E;
  margin:6px 0 22px;user-select:none;
  transition:font-size .2s;
}

.kq-choices{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.kq-choice{
  position:relative;padding:14px 8px;border-radius:14px;border:none;cursor:pointer;
  font-family:'Kosugi Maru',sans-serif;font-size:clamp(13px,3.6vw,17px);
  font-weight:700;color:white;transition:transform .1s,box-shadow .1s,opacity .2s;
  overflow:hidden;
}
.kq-choice:not(:disabled):active{transform:translateY(3px);}
.kq-choice:disabled{cursor:default;}
.kq-choice.kq-reveal{animation:kqPop .35s ease;}
.kq-choice.kq-wrong {opacity:.42;animation:kqShake .3s ease;}
.kq-choice.kq-dim   {opacity:.48;}
@keyframes kqPop  {0%{transform:scale(1)}40%{transform:scale(1.09)}100%{transform:scale(1)}}
@keyframes kqShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
.kq-icon{position:absolute;top:4px;right:7px;font-size:12px;}

/* ── RESULT ── */
.kq-result{
  background:white;border-radius:26px;padding:32px 26px 28px;
  width:100%;max-width:330px;text-align:center;
  box-shadow:0 10px 34px rgba(200,120,80,.14);animation:kqSlide .32s ease;
}
.kq-resultTitle{font-family:'Kaisei Decol',serif;font-size:24px;color:#4A2C1A;margin-bottom:16px;}
.kq-stars{font-size:42px;letter-spacing:5px;margin-bottom:12px;display:block;animation:kqStars .5s ease;}
@keyframes kqStars{from{transform:scale(.4);opacity:0}70%{transform:scale(1.15)}to{transform:scale(1);opacity:1}}
.kq-scoreBig{font-size:54px;font-weight:700;color:#FF7B6B;line-height:1;margin-bottom:2px;}
.kq-scoreSub{font-size:14px;color:#A07060;margin-bottom:8px;}
.kq-resultMsg{font-size:19px;color:#4A2C1A;margin-bottom:24px;}
.kq-retryBtn{
  width:100%;background:#FF7B6B;color:white;border:none;border-radius:14px;padding:15px;
  font-family:'Kosugi Maru',sans-serif;font-size:17px;font-weight:700;cursor:pointer;
  box-shadow:0 5px 0 #D95B4A;transition:transform .1s,box-shadow .1s;margin-bottom:9px;display:block;
}
.kq-retryBtn:active{transform:translateY(3px);box-shadow:0 2px 0 #D95B4A;}
.kq-backBtn{
  width:100%;background:transparent;color:#A07060;border:2px solid #EAE0D8;
  border-radius:11px;padding:9px;font-family:'Kosugi Maru',sans-serif;font-size:13px;
  cursor:pointer;display:block;
}
`;

// ── Component ──────────────────────────────────────────────────────
export default function KanjiQuiz() {
  const [grade,    setGrade]    = useState(1);
  const [screen,   setScreen]   = useState("start");
  const [mode,     setMode]     = useState(null);
  const [questions, setQs]      = useState([]);
  const [current,  setCurrent]  = useState(0);
  const [selected, setSelected] = useState(null);
  const [score,    setScore]    = useState(0);
  const [animKey,  setAnimKey]  = useState(0);

  const startQuiz = (m) => {
    setMode(m);
    setQs(makeQuestions(GRADE_DATA[grade], m));
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setScreen("quiz");
    setAnimKey(k => k + 1);
  };

  const handleChoice = (choice) => {
    if (selected !== null) return;
    setSelected(choice);
    if (choice === questions[current].reading) setScore(s => s + 1);
    setTimeout(() => {
      if (current + 1 >= TOTAL) {
        setScreen("result");
      } else {
        setCurrent(c => c + 1);
        setSelected(null);
        setAnimKey(k => k + 1);
      }
    }, 1300);
  };

  const q = questions[current];
  const stars = score >= 9 ? "⭐⭐⭐" : score >= 6 ? "⭐⭐" : "⭐";
  const msg   = score === 10 ? "かんぺき！100てん！🎉"
              : score >=  9  ? "すごい！あとすこし！"
              : score >=  6  ? "よくできました！"
              :                "もっとがんばろう！";

  // Responsive font size based on question display length
  const kanjiFs = (s) => s.length <= 1 ? "clamp(78px,21vw,106px)"
                        : s.length === 2 ? "clamp(58px,15vw,76px)"
                        : "clamp(40px,10.5vw,54px)";

  return (
    <>
      <style>{CSS}</style>
      <div className="kq-app">

        {/* ── START ── */}
        {screen === "start" && (
          <div style={{width:"100%",maxWidth:300}}>
            <span className="kq-logo">📖</span>
            <div className="kq-title">
              <span className="kq-titleLine kq-titleNames">
                <span className="kq-name-akari">あかり</span>
                <span>と</span>
                <span className="kq-name-toshiharu">としはる</span>
                <span>の</span>
              </span>
              <span className="kq-titleLine">かんじテスト</span>
            </div>
            <div className="kq-sub">学年をえらんでスタート！</div>

            {/* Grade tabs */}
            <div className="kq-grade-row">
              {[1,2,3].map(g => (
                <button key={g}
                  className={`kq-grade-btn${grade===g?" active":""}`}
                  onClick={() => setGrade(g)}
                >
                  {g}年生
                </button>
              ))}
            </div>

            {/* Mode buttons */}
            <div className="kq-modes">
              {[
                {id:"on",   label:"おんよみ",        sub:"音読みだけ",     cls:"kq-modeBtn-on",   e:"🔵"},
                {id:"both", label:"おんくんミックス", sub:"音読み＋訓読み", cls:"kq-modeBtn-both", e:"🔄"},
                {id:"kun",  label:"くんよみ",         sub:"訓読みだけ",     cls:"kq-modeBtn-kun",  e:"🟢"},
              ].map(m => (
                <button key={m.id} className={`kq-modeBtn ${m.cls}`} onClick={() => startQuiz(m.id)}>
                  <span className="kq-modeEmoji">{m.e}</span>
                  <div>
                    <div className="kq-modeName">{m.label}</div>
                    <div className="kq-modeSub">{m.sub}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── QUIZ ── */}
        {screen === "quiz" && q && (
          <div className="kq-card" key={animKey}>
            <div className="kq-progress">
              {Array.from({length: TOTAL}, (_, i) => (
                <div key={i} className={`kq-dot ${
                  i < current ? "kq-dot-done" : i === current ? "kq-dot-current" : "kq-dot-future"
                }`} />
              ))}
            </div>
            <div className="kq-qmeta">{GRADE_LABEL[grade]}・{current+1} / {TOTAL} もん</div>
            <div className="kq-type">この漢字の{q.type}は？</div>
            <div className="kq-kanji" style={{fontSize: kanjiFs(q.displayK)}}>
              {q.displayK}
            </div>
            <div className="kq-choices">
              {q.choices.map((c, i) => {
                let extra = "";
                if (selected !== null) {
                  if (c === q.reading)           extra = "kq-reveal";
                  else if (c === selected)       extra = "kq-wrong";
                  else                           extra = "kq-dim";
                }
                return (
                  <button key={c+i}
                    className={`kq-choice ${extra}`}
                    style={{background:CHOICE_COLORS[i], boxShadow:`0 5px 0 ${SHADOW_COLORS[i]}`}}
                    onClick={() => handleChoice(c)}
                    disabled={selected !== null}
                  >
                    {selected !== null && c === q.reading          && <span className="kq-icon">✅</span>}
                    {selected !== null && c === selected && c !== q.reading && <span className="kq-icon">❌</span>}
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── RESULT ── */}
        {screen === "result" && (
          <div className="kq-result">
            <div className="kq-resultTitle">{GRADE_LABEL[grade]}・けっか</div>
            <span className="kq-stars">{stars}</span>
            <div className="kq-scoreBig">{score} / {TOTAL}</div>
            <div className="kq-scoreSub">もんせいかい</div>
            <div className="kq-resultMsg">{msg}</div>
            <button className="kq-retryBtn" onClick={() => startQuiz(mode)}>もういちど！</button>
            <button className="kq-backBtn"  onClick={() => setScreen("start")}>モードをえらぶ</button>
          </div>
        )}

      </div>
    </>
  );
}

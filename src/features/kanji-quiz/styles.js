export const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Kaisei+Decol:wght@400;700&family=Kosugi+Maru&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

.kq-app{
  min-height:100vh;
  min-height:100dvh;
  background:linear-gradient(150deg,#FFF8ED 0%,#FFE8CC 45%,#FFD6D6 100%);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:20px;font-family:'Kosugi Maru','Hiragino Kaku Gothic ProN',sans-serif;
}

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

.kq-modes{display:flex;flex-direction:row;gap:10px;width:100%;max-width:300px;}
.kq-modeBtn{
  display:flex;align-items:center;gap:14px;padding:14px 18px;
  border-radius:16px;border:none;cursor:pointer;
  font-family:'Kosugi Maru',sans-serif;font-size:16px;font-weight:700;color:white;
  box-shadow:0 5px 0 rgba(0,0,0,.18);transition:transform .1s,box-shadow .1s;
  flex:1;
}
.kq-modeBtn:active{transform:translateY(4px);box-shadow:0 1px 0 rgba(0,0,0,.18);}
.kq-modeBtn-reading{background:linear-gradient(135deg,#A855F7,#8B3FE0);}
.kq-modeBtn-writing{background:linear-gradient(135deg,#34B89A,#20967D);}
.kq-modeEmoji{font-size:22px;}
.kq-modeName{font-size:16px;}
.kq-modeSub{font-size:11px;opacity:.82;font-weight:400;margin-top:1px;}

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
.kq-history{
  background:rgba(160,112,96,.06);border-radius:10px;padding:10px 14px;
  margin-bottom:18px;text-align:center;
}
.kq-historyLabel{font-size:11px;color:#B09080;margin-bottom:6px;letter-spacing:.04em;}
.kq-historyList{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;}
.kq-historyScore{
  font-size:14px;font-weight:700;color:#A07060;
  background:white;border-radius:6px;padding:2px 8px;
}
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

// https://www.uglifyjs.net/

const e=require("readline-sync");const o=`Let's knock a nail into this computer!\n\n* Each player takes a turn to hit the nail once.
* A player can hit the nail in one of three ways: gently, firmly, hard.\n* Depending on the force used, the nail will be driven more or less deeply into the Terminal.\n* The player who knocks the nail all the way in is the winner.\n\nAre you ready?\n`;const t="If you want to start, type Y. If you want me to start, press any other key. ";const n="The nail is ";const l=" units long.";const a="\nDo you want to play again?\n(Type Y for Yes, N for No): ";const r="Your turn. How hard do you plan to hit?";const s=["gently","firmly","hard"];const i=" hit the nail ";const c=" win!";const h=["I","You"];const y="Thanks for a good game!";
const O={guide: false};const p=3;const f=p+1;let g=true;let u=0;let d=120;let w,k,m,I,Y,A,B;console.clear();console.log(o);let M=e.keyInYN(t,O);let T=!M;while(g){Y=12+Math.floor(Math.random()*f);A=Y;w=n+A+l;m=false;while(A>0){if(!m){k="-"+"=".repeat(A-1)+"|"}else{k="=".repeat(A)+"|"}B="[1A[K".repeat(d);console.log(B);console.log(k,w);if(M){u=e.keyInSelect(s,r);if(u<0){console.log(y);process.exit()}w=" ".repeat(Y-A+u+1)+"You"+i+s[u]+".";u+=1;d=8}else{if(A<f){u=A}else{u=A%f;if(!u){u=Math.floor(Math.random()*p)+1}}w=" ".repeat(Y-A+u)+"I"+i+s[u-1]+".";d=0}if(u===0){console.log(y);process.exit()}A-=u;I=h[M+0];M=!M;m=true}if(!M){B="[1A[K".repeat(8);console.log(B)}w=M?"\n":"";w+="| "+" ".repeat(Y)+I+i+s[u-1]+".\n";console.log(w);console.log(I+c);M=T;T=!T;d=22;g=e.keyInYNStrict(a,O);if(!g){console.log(y)}}
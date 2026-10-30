import assert from 'node:assert/strict';
import {createGame,swap,hammer,reshuffle,legalMoves,findMatches,restore,MODES,DIFFICULTIES,recordResult} from './engine.mjs';
import {zh,en} from './i18n.mjs';
assert.deepEqual(Object.keys(zh).sort(),Object.keys(en).sort());
let rounds=0,wins=0;
for(const d of Object.keys(DIFFICULTIES))for(const mode of MODES)for(let seed=100;seed<150;seed++){const s=createGame(d,seed,{mode});assert.ok(restore(s));assert.ok(legalMoves(s).length);}
for(const d of Object.keys(DIFFICULTIES))for(const mode of MODES)for(let seed=1;seed<=5;seed++){
 let s=createGame(d,seed,{mode});assert.ok(restore(s));assert.equal(findMatches(s).all.length,0);assert.ok(legalMoves(s).length);const before=JSON.stringify(s);const invalid=swap(s,0,s.size*s.size-1);assert.equal(invalid.valid,false);assert.equal(JSON.stringify(s),before);
 for(let i=0;i<DIFFICULTIES[d].moves&&s.phase==='playing';i++){const choices=legalMoves(s);assert.ok(choices.length);let best=null;for(const [a,b] of choices){const r=swap(s,a,b);assert.equal(r.valid,true);let gain=r.state.score-s.score;for(let j=0;j<s.goals.length;j++){const g=s.goals[j],metric=x=>g.kind==='fruit'?x.collected[g.color]:g.kind==='ice'?x.clearedIce:g.kind==='crate'?x.clearedCrates:g.kind==='basket'?x.collectedBaskets:g.kind==='special'?x.activated:x.score;gain+=Math.min(g.target-metric(s),metric(r.state)-metric(s))*80;}if(!best||gain>best.gain)best={...r,gain};}s=best.state;assert.ok(restore(s),`${d} ${mode} seed${seed} move${i}`);assert.equal(findMatches(s).all.length,0);}
 assert.notEqual(s.phase,'playing');assert.ok(s.score>=0);if(s.phase==='won')wins++;rounds++;const records=recordResult({},s,'2026-10-30');assert.equal(recordResult(records,{...s,score:0},'2026-10-30')['2026-10-30'][d],s.score);
}
let s=createGame('easy',111);let r=reshuffle(s,true);assert.equal(r.state.moves,s.moves);assert.equal(r.state.shuffles,s.shuffles-1);assert.deepEqual(r.state.goals,s.goals);assert.ok(restore(r.state));r=hammer(s,s.board.findIndex(t=>t?.kind==='fruit'));assert.equal(r.state.moves,s.moves);assert.equal(r.state.hammers,s.hammers-1);assert.ok(restore(r.state));
const make=()=>{const b=createGame('easy',700,{mode:'collect',shape:'square'});for(let p=0;p<b.board.length;p++)b.board[p]={kind:'fruit',color:(p%7+Math.floor(p/7)*2)%5,special:null,id:p+1};b.serial=49;b.goals=[{kind:'score',target:999999}];return b;};
for(const pair of [['row','col'],['bomb','bomb'],['rainbow','bomb'],['rainbow','rainbow']]){const b=make();b.board[16].special=pair[0];b.board[17].special=pair[1];const out=swap(b,16,17);assert.ok(out.valid);assert.ok(out.state.activated>=2);assert.equal(out.state.moves,b.moves-1);assert.ok(restore(out.state));}
for(const length of [4,5]){const b=make();for(let x=1;x<=length;x++)b.board[2*7+x].color=0;b.board[2*7+3].color=1;b.board[3*7+3].color=0;const out=swap(b,2*7+3,3*7+3);assert.ok(out.valid);assert.ok(out.frames.some(f=>f.created?.some(c=>length===5?c.kind==='rainbow':c.kind==='row')));}
const damaged=make();damaged.board[0].color=999;assert.equal(restore(damaged),null);
console.log(`${rounds} deterministic full games validated; ${wins} wins with goal-aware play. Moves, persistence, combinations, boosters, specials and bilingual content passed.`);

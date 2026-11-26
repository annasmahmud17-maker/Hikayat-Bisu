export const palette={
 background:'#07140f',hero:{boy:{cloth:'#2a3270',shade:'#1c2252',rim:'#9aa6ee',outline:'#0d1030'},girlA:{cloth:'#1f7a5c',shade:'#14513d',rim:'#9be3c4',outline:'#0b2a20'},girlB:{cloth:'#1f7a5c',shade:'#14513d',rim:'#9be3c4',outline:'#0b2a20'}},
 skin:['#d09865','#b8754e','#9b5f3e','#e5b18b'],hair:'#1d1a2e',gold:'#e0a93b',goldShade:'#b07d1f',blade:'#dfe4f0',parchment:'#ece7d6',inkText:'#1a1f4a',button:'#2a3270',buttonText:'#f4e3a1',disabled:'#8a8f9e',kata:'#f4e3a1',correct:'#7fe0a0',ember:'#ff6b4a',white:'#ffffff',enemy:'#727d88',bayang:'#14102a',dim:'#000000',blank:'#f4f1e6',silence:'#05050a',tendrils:'#14102a',
 camp:{far:'#1a1410',mid:'#2e2118',near:'#0d0a07',light:'#ff9f43',accent:'#e0a93b',glow:'#ffd9a0'},
 rimba:{far:'#12382c',mid:'#1d5a44',near:'#07140f',light:'#d6f0a8',accent:'#7fe0a0',glow:'#f1f7d2'},
 gua:{far:'#1e1210',mid:'#4a2c1c',near:'#0c0706',light:'#ffb347',accent:'#b8322a',glow:'#ffe2a8'},
 bukit:{far:'#3a3f4d',mid:'#5b6070',near:'#1c1f28',light:'#cfd6e8',accent:'#e8b04a',glow:'#fff1c9'},
 tasik:{far:'#0a1030',mid:'#14235a',near:'#050816',light:'#5ad1e6',accent:'#3fe0c5',glow:'#cfe8ff'},
 istana:{far:'#062a33',mid:'#0d4a55',near:'#031519',light:'#7ee0d0',accent:'#ff7a6b',glow:'#ffe9b0',trim:'#e0a93b'},
 dasar:{far:'#041c24',mid:'#08343e',near:'#020f13',light:'#5fb8aa',accent:'#ff7a6b',glow:'#ffe9b0'},
 pustaka:{far:'#14141c',mid:'#23232e',near:'#08080c',light:'#d8d4c4',accent:'#9aa6ee',glow:'#f4e3a1',blank:'#f4f1e6'},
 companions:{kancil:{body:'#b88a54',bands:'#e0a93b'},lang:{body:'#7a5a3a',head:'#f1ead8',beak:'#e0a93b'},rimau:{body:'#d9822b',stripes:'#2a1a10'},dayang:{body:'#b79ae0',glow:'#e8d9ff'},hidden:{body:'#14102a',glow:'#9fe8ff'}}
};
export const color=hex=>Number.parseInt(hex.slice(1),16);
export const tilesFor=biome=>({floor:palette[biome].mid,wall:palette[biome].near,wallTop:palette[biome].far,water:palette[biome].far,station:palette[biome].accent,pickup:palette[biome].glow});

export const alphaColor=(hex,alpha)=>{const value=color(hex);return `rgba(${value>>16},${(value>>8)&255},${value&255},${alpha})`};

export const Colors = {
    'white':'#ffffff',
    'black':'#131418',
    'black2':'#272930',
    'black3':'#1a1a21',
    'grey':'#c8c8c8',
    'red':'#d74444',
    'blue': '#52C8FA',
    'fbblue': '#3b5998',
    'lightgrey': '#f2f2f2',
    'darkgrey': '#878787',
    'teagreen': '#D9F4C7',
    'canary' : '#F8FA90',
    'khaki' : '#F4EF88',
    'camel' : '#AC9969',
    'middlebluegreen' : '#9DCDC0',
    'beaublue' : '#C1CAD6',
    'pinklavendour' : '#D4ADCF',
    'lightgreen' : '#84E296',
    'gainsboro' : '#DDE1E4',
    'lightcyan' : '#D1FAFF',
    'nonphotoblue' : '#9BD1E5',
    'greensheen' : '#79BCB8',
    'pistachio' : '#8ED081',
    'cambridgeblue' : '#B4D2BA',
    'palespringbud' : '#DCE2AA',
    'eggshell' : '#FAF3DD',
    'laurelgreen' : '#C8D5B9',
    'seagreencrayola' : '#00FDDC',
    'babypink' : '#FFCCC9'
}

export const categoriesColors = [
    {color: '#A2B93C', id: 0},
    {color: '#BF6648', id: 1},
    {color: '#5A7234', id: 2},
    {color: '#579E9E', id: 3},
    {color: '#887DB9', id: 4},
    {color: '#AF8655', id: 5},
    {color: '#FF7194', id: 6},
    {color: '#2D0536', id: 7},
    {color: '#BDA04C', id: 8},
    {color: '#878787', id: 9},
    {color: '#D9F4C7', id: 10},
    {color: '#F8FA90', id: 11},
    {color: '#F4EF88', id: 12},
    {color: '#AC9969', id: 13},
    {color: '#9DCDC0', id: 14},
    {color:  '#C1CAD6', id: 15},
    {color: '#D4ADCF', id: 16},
    {color: '#84E296', id: 17},
    {color: '#DDE1E4', id: 18},
    {color: '#D1FAFF', id: 19},
    {color: '#9BD1E5', id: 20},
    {color:  '#79BCB8', id: 21},
    {color:  '#8ED081', id: 22},
    {color: '#B4D2BA', id: 23},
    { color: '#DCE2AA', id: 24},
    {color: '#E7C175', id: 25},
    {color: '#C8D5B9', id: 26},
    {color: '#00FDDC', id: 27},
    {color: '#FFCCC9', id: 28},
]

export const randDarkColor = () => {
    const lum = -0.25;
    let hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    let rgb = "#",
        c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }
    return rgb;
}

export const sleep = time => {
    return new Promise((resolve) => setTimeout(resolve, time));
}

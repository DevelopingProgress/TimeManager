import moment from "moment";

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

export const polishShortMonths = (month) => {
    switch (month) {
        case 1:
            return 'Sty'
        case 2:
            return  'Lut'
        case 3:
            return 'Mar'
        case 4:
            return  'Kwi'
        case 5:
            return 'Maj'
        case 6:
            return  'Cze'
        case 7:
            return 'Lip'
        case 8:
            return  'Sie'
        case 9:
            return 'Wrz'
        case 10:
            return  'Paź'
        case 11:
            return 'Lis'
        case 12:
            return  'Gru'
    }
}

export const getTodayDate = () => {
    return moment().format("YYYY-MM-DD")
}

export const getHours = (item) => {
    if(!item.timer) return
    const separatedTime = item.timer.split(':')
    const digits = separatedTime[0].split()
    if(digits[0] === '0' || digits.length === 1)
        return '0' + separatedTime[0]
    else return separatedTime[0]
}
export const getMinutes = (item) => {
    if(!item.timer) return
    const separatedTime = item.timer.split(':')
    const digits = separatedTime[1].split()
    if(digits[0] === '0')
        return '0' + separatedTime[1]
    else return separatedTime[1]
}
export const getSeconds= (item) => {
    if(!item.timer) return
    const separatedTime = item.timer.split(':')
    const digits = separatedTime[2].split()
    if(digits[0] === '0')
        return '0' + separatedTime[2]
    else return separatedTime[2]
}

export const clockify = (counter) => {
    let hours = Math.floor(counter / 60 / 60)
    let minutes = Math.floor(counter / 60 % 60)
    let seconds  = Math.floor(counter % 60)

    let displayHours = hours < 10 ? `0${hours}` : hours
    let displayMinutes = minutes < 10 ? `0${minutes}` : minutes
    let displaySeconds = seconds < 10 ? `0${seconds}` : seconds

    return {
        displayHours, displayMinutes, displaySeconds
    }
}

export const hoursRegex = /^(((0|1)[0-9])|2[0-3])$/
export const minsecsRegex = /\b([0-5]){1}([0-9]){1}/gm

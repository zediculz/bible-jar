//store user focus
//use the focus to get the verses to render

import { topicsData } from "./datas"

//get the verses text and randomly display them
const db = "app-dataset-v1"
const bookdb = "app-dataset-bookmark"
const database = "app-dataset"

export const setTopic = (d) => {
    localStorage.setItem(database, JSON.stringify(d))
}

export const loadTopic = () => {
    const exist = localStorage.getItem(database)
    const { topic } = JSON.parse(exist)
    
    if (exist !== null) {
        return {
            index: topic,
            focus: topicsData[topic].topic,
            color: topicsData[topic].color,
            data: topicsData[topic].verses,
        }

    } else {
        return {
            index: 0,
            focus: topicsData[0].topic,
            color: topicsData[0].color,
            data: topicsData[0].verses,
        }
    }
}




export const renderVerseRandom = e => {
    const exist = localStorage.getItem(database)
    const { last, data, topic } = JSON.parse(exist)

    const limit = data?.verses?.length
    const rand = Math.floor(Math.random() * limit)

    if (rand === last) {
        const newRand = Math.floor(Math.random() * last)
        const d = data?.verses[newRand]
        return d
    } else {
        const d = data?.verses[rand]
        return d
    }
}


export const likedVerse = data => {
    const { focus, verses } = data
}



function USERID() {
    const n1 = Math.floor(Math.random() * 999999)
    const n2 = Math.floor(Math.random() * 999999)
    const n3 = Math.floor(Math.random() * 999999)
    return `${n1}-${n2}-${n3}`
}

export function handleAppObject() {
    const existed = localStorage.getItem(database)
    const datas = JSON.parse(existed)

    if (existed === null) {
        const limit = topicsData[0].verses?.length
        const d = {
            data: topicsData[0].verses,
            topic: topicsData[0].topic,
            limit,
            bookmarks: [],
            userId: USERID(),
            topics: ["healing"]
        }
        
        localStorage.setItem(database, JSON.stringify(d))
        return d

    } else {
        return datas
    }

}


export function loadAppObject() {
    const existed = localStorage.getItem(database)
    const datas = JSON.parse(existed)

    if (existed === null) {
        return handleAppObject()

    } else {
        return datas
    }
}


export function addTopics(e) {
   
    const existed = localStorage.getItem(database)
    const datas = JSON.parse(existed)

    if (existed === null) {
        return handleAppObject()

    } else {
        const oldTopics = datas?.topics
        const existing = oldTopics?.filter((ot, i) => ot === e)
        if (existing?.length === 0 && oldTopics?.length < 6) {
            let arr = [e]
            let newtopics = [...datas?.topics, ...arr]

            const d = {
                data: datas?.data,
                topic: datas?.topic,
                limit : datas?.limit,
                bookmarks: datas?.bookmarks,
                userId: datas?.userId,
                topics: newtopics
            }

            localStorage.setItem(database, JSON.stringify(d))
            return {
                state: true, focus: newtopics
            }
        } else {
            return {
                state: false, focus: datas?.topics, r: ""
            }
        }
    }
}



export function removeTopics(e) {

    const existed = localStorage.getItem(database)
    const datas = JSON.parse(existed)

    if (existed === null) {
        return handleAppObject()

    } else {
        const oldTopics = datas?.topics
        const filterTopics = oldTopics?.filter((ot, i) => ot !== e)

        const d = {
            data: datas?.data,
            topic: datas?.topic,
            limit: datas?.limit,
            bookmarks: datas?.bookmarks,
            userId: datas?.userId,
            topics: filterTopics
        }

        localStorage.setItem(database, JSON.stringify(d))
        return filterTopics
        
    }
}



export const addToBookmark = e => {
    const existed = localStorage.getItem(database)
    const datas = JSON.parse(existed)

    if (existed === null) {
        return handleAppObject()

    } else {
        const str = `${e?.book}${e?.chapter}${e?.verse}`
        const oldBks = datas?.bookmarks
        const existing = oldBks?.filter((ot, i) => {
            const otStr = `${ot?.book}${ot?.chapter}${ot?.verse}`
            return otStr === str
        })
        if (existing?.length === 0 && oldBks?.length < 20) {
            let arr = [e]
            let newBks = [...datas?.bookmarks, ...arr]

            const d = {
                data: datas?.data,
                topic: datas?.topic,
                limit: datas?.limit,
                bookmarks: newBks,
                userId: datas?.userId,
                topics: datas?.topics
            }

            localStorage.setItem(database, JSON.stringify(d))
            return true
        } else {
            return false
        }
    }
}



export const loadBookmark = e => {
    const existed = localStorage.getItem(database)
    const datas = JSON.parse(existed)

    if (existed === null) {
        return handleAppObject()

    } else {
        return datas?.bookmarks
    }
}

export function removeBookmark(e) {

    const existed = localStorage.getItem(database)
    const datas = JSON.parse(existed)

    if (existed === null) {
        return handleAppObject()

    } else {
        const oldBks = datas?.bookmarks
        const filterBooks = oldBks?.filter((ot, i) => i !== e)

        const d = {
            data: datas?.data,
            topic: datas?.topic,
            limit: datas?.limit,
            bookmarks: filterBooks,
            userId: datas?.userId,
            topics: datas?.topics
        }

        localStorage.setItem(database, JSON.stringify(d))
        return filterBooks

    }
}



export const loadAllVerses = () => {
    const exist = localStorage.getItem(db)

    if (exist !== null) {
        const d = JSON.parse(exist)
        const verses = d?.verses 

        let datas = []
        verses?.flatMap((v, i) => {
            datas.push(rs(v))
        })

        const unique = datas?.filter((obj, index) => {
            return index === datas?.findIndex(o => obj.name === o.name)
        })

        console.log(unique, datas)

        datas?.map(async (d, i) => {
            const { no, name } = d
            let urlStr = no === undefined ? `${name}` : `${name}_${no}`
            const url = `../../public/bin/bible/${urlStr.toLocaleLowerCase()}.json`
            
            const req = await fetch(url)
            const data = await req.json()

            console.log(data)
        })
    } 
}

function rs(str) {
    const strSplit = str.split(" ")
   
    function rsNum(str) {
        const sp = str.split(":")
        const n = sp[1].split("-")

        if (n.length === 1) {
            return {
                chapter: sp[0],
                verse: sp[1]
            }
        } else if(n.length === 2) {
            return {
                chapter: sp[0],
                verse: n[0],
                to: n[1]
            }
        }
        
    }

    function numToWord(n) {
        if (n === 1 || n === "1") return 'one'
        if (n === 2 || n === "2") return 'two'
        if (n === 3 || n === "3") return 'three'
    }

    if (strSplit.length === 2) {
        return {
            name: strSplit[0],
            number: rsNum(strSplit[1])
       }
    } else if (strSplit.length === 3) {
        return {
            no: numToWord(strSplit[0]),
            name: strSplit[1],
            number: rsNum(strSplit[2])
        }
   }
}


export const handleCopy = async e => {
    await navigator.clipboard.writeText(e)
}

export const handleShare = async (e) => {
    const url = location.origin
    const shareData = {
        title: `${e?.book}${e?.chapter}${e?.verse}`,
        text: e?.text,
        url
    }

    await navigator.share(shareData)
}
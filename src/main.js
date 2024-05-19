//
import {Commit2Feed} from './commit2feed.js'

// メインルーチン
const c2f = new Commit2Feed('atsushifx', 'TIL')
const feed = await c2f.feed()

console.log(feed)

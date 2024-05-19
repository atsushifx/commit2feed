//
import {Commit2Feed} from './commit2feed.js'

// メインルーチン
const c2f = new Commit2Feed('atsushifx', 'commit2feed')
const feed = await c2f.feed()

console.log(feed)

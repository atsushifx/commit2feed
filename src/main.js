//
import {Commit2Feed} from './commit2feed.js'

// メインルーチン
const c2f = new Commit2Feed('atsushifx', 'commit2feed')
await c2f.initFeed()

console.log(c2f.feed())

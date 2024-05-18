//
import {CommitInfo} from './commitinfo.js'

// メインルーチン
const commitInfo = new CommitInfo('atsushifx', 'TIL')
//
const detail = await commitInfo.nthCommitDetail(3)
console.log(detail)

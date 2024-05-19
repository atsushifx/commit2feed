//
import {CommitInfo} from './commitinfo.js'

// メインルーチン
const commitInfo = new CommitInfo('atsushifx', 'commits2feeds')
const detail = await commitInfo.nthCommitDetail(0)
console.log(detail.files.diff)

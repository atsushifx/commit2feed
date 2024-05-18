//
import {CommitInfo} from './commitinfo.js'

// メインルーチン
const commitInfo = new CommitInfo('atsushifx', 'TIL')
//
const commits = await commitInfo.fetchCommits(5)
console.log(commits.length)

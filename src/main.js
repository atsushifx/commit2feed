//
import {CommitInfo} from './commitinfo.js'

// メインルーチン
const commitInfo = new CommitInfo('atsushifx', 'TIL')
//
const commits = await commitInfo.fetchCommits()
console.log(commits[0])

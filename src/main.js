//
import {CommitInfo} from './commitinfo.js'

// メインルーチン
const commitInfo = new CommitInfo('atsushifx', 'commits2feeds')
const commits = await commitInfo.fetchCommitDetails()

console.log(commitInfo.getRepository() + '\n\n')
console.log(commits[0])

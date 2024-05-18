//
import {CommitInfo} from './commitinfo.js'

// メインルーチン
const commitInfo = new CommitInfo('atsushifx', 'TIL')
//
const commits = await commitInfo.fetchCommits('2')
// const detail = await commitInfo.NthCommitDetail(3)
console.log(commits)

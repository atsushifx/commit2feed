//
import {CommitInfo} from './commitinfo.js'

// メインルーチン
const commitInfo = new CommitInfo('atsushifx', 'commits2feeds')
const diffs = await commitInfo.fetchCommitDiffs()
for (let i = 0; i < diffs.length; i++) {
  console.log('-----')
  const title = diffs[i].commit.message.split('\n').shift()
  console.log(title + '\n')
  console.log(diffs[i].files.diff)
}

//
import {CommitInfo} from './commitinfo.js'

// メインルーチン
const commitInfo = new CommitInfo('atsushifx', 'commits2feeds')
const detail = await commitInfo.nthCommitDetail(0)
for (let i = 0; i < detail.files.length; i++) {
  if (i > 0) {
    console.log('-----')
  }
  console.log(detail.files[i].filename + '\n')
  console.log(detail.files[i].diff)
}

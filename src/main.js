// @(#) Commi2Feed : github action of commit to rss feed
//
// @vesion  0.1.1
// @author  Furukawa Atsushi <atsushifx@aglabo.com>
// @date    2024-05-19
//
// @description<<
//
// generate RSS atom feed from commit.
// then set feed to hithub repository
//
// <<

// modules
import * as core from '@actions/core'
import {Commit2Feed} from './commit2feed.js'

// main routine
/**
 * main : GitHub Action main routine
 *
 * generate RSS atom feed from commit.
 * then set RSS feed to github repository
 */
async function main() {
  try {
    const user = core.getInput('user', {required: true})
    const repo = core.getInput('repo', {required: true})
    const c2f = new Commit2Feed(user, repo, 'feature_skipbot')
    const rssfeeds = await c2f.feeds()

    //
    core.setOutput(`feed`, rssfeeds)
    console.debug('feed:\n', rssfeeds)
  } catch (error) {
    core.setFailed(error.message)
  }
}

async function debug() {
  try {
    const user = 'atsushifx'
    const repo = 'til'
    const c2f = new Commit2Feed(user, repo)
    const rssfeeds = await c2f.feeds()
    console.debug('feed:\n', rssfeeds)
  } catch (error) {
    console.error(error)
  }
}
//

main()
// debug() // for bugfix/develop main

// @(#) Commi2Feed : github action of commit to rss feed
//
// @vesion   0.1.0
// @author    Furukawa Atsushi <atsushifx@aglabo.com>
// @date      2024-05-19
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

// for debug feeds
const rssfeeds = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
    <id>https://api.github.com/repos/atsushifx/commit2feed/commits/latest</id>
    <title>atsushifx / commit2feed</title>
    <updated>1970-01-01T00:00:00.000Z</updated>
    <generator>https://github.com/jpmonette/feed</generator>
    <author>
        <name>atsushifx</name>
        <uri>https://github.com/atsushifx</uri>
    </author>
    <link rel="alternate" href="https://api.github.com/repos/atsushifx/commit2feed/commits/latest"/>
    <subtitle>Latest 10 commits for atsushifx / commit2feed</subtitle>
<entry>
        <title type="html"><![CDATA[update: commit2feed

        update: commit2feed
          -  各コミットをRSSのEntryに変換
        bugfix: commitinfo
          - メソッド名のtypo]]></title>
        <id>2c8b1a3ff574dfb772c06c29156bf0cac436837d</id>
        <link href="https://github.com/atsushifx/commit2feed/commit/2c8b1a3ff574dfb772c06c29156bf0cac436837d"/>
        <updated>2024-05-19T08:55:00.000Z</updated>
        <content type="html"><![CDATA[src/commit2feed.js

  /** @var fetched commit detail */
  _commitDetails

    this._commitDetails = null
  /**
   * generate feed item by every commit
   */
  async generateFeedItems() {
    // fetch commit details
    if (!this._commitDetails) {
      const details = await this._commitInfo.fetchCommitDetails(this.#_commitNum)
      if (!details) return]]></content>
    </entry>
</feed>
`
async function run() {
  try {
    const user = core.getInput('user', {required: true})
    const repo = core.getInput('repo', {required: true})
    const c2f = new Commit2Feed(user, repo)
    //
    core.setOutput(`feed`, rssfeeds)
    console.debug('feed:\n', rssfeeds)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

// @(#) commit2feed : generate RSS feed from github commits
//
// @version   0.1.0
// @author    Furukawa Atsushi <atsushifx@aglabo.com>
// @date      2024-05-19
//
// @description<<
//
// generate RSS feed from github commits
//
// <<

// modueles
import {Feed} from 'feed'
import {CommitInfo} from './commitinfo.js'

/**
 *
 * generate RSS feed from github commits
 * @class
 */
class Commit2Feed {
  // private CONSTANTS
  #DEFAULT_COMMITS_NUM = 10

  #MAX_COMMITS_NUM = 100

  // public propertiies
  /**
   * @property CommitInfo Commit Info about getting commits
   */
  _commitInfo

  /**
   * @property CommitDetail Commit Detail Info about every getting commits
   */
  _commitDetails

  /**
   * @property Feed  simple RSS Feed generated
   */
  _feed

  // private fields
  #_commitNum

  /**
   * set github repository for fetch commits
   *
   * @constructor
   * @param string user github user
   * @param string repo repository name
   * @param (optional) number num RSS feed entriies number
   */
  constructor(user, repo, num = 5) {
    if (isNaN(num)) {
      this.#_commitNum = this.#DEFAULT_COMMITS_NUM
    } else if (num < 1 || num > this.#MAX_COMMITS_NUM) {
      this.#_commitNum = this.#DEFAULT_COMMITS_NUM
    } else {
      this.#_commitNum = num
    }
    this._commitInfo = new CommitInfo(user, repo)
    this._commitDetails = null
    this._feed = null
  }

  // private methods

  /**
   * filer cdata
   *
   * remove CDATA tag pair from content
   * @param {string} content
   * @returns {string} content
   */
  _filterCdata(content) {
    if (!content) return ''
    return content
      .trim()
      .replace(/<\[CDATA\[/g, '')
      .replace(/\]\]>/g, '')
  }

  // public methods
  /**
   * initializes Feed
   *
   * set RSS Feed header fro github commit
   *
   */
  async initFeed() {
    const commits = await this._commitInfo.fetchCommitDetails(this.#_commitNum)
    if (!commits) return
    //
    this._feed = new Feed({
      title: this._commitInfo.getRepository(),
      description: `Latest ${this.#_commitNum} commits for ${this._commitInfo.getRepository()}`,
      id: `${this._commitInfo.getRepositoryUrl()}/commits/latest`,
      link: `${this._commitInfo.getRepositoryUrl()}/commits/latest`,
      updated: new Date(this._commitInfo.getLatesCommitDate()),
      generator: 'https://github.com/atsushifx/commit2feed',
      author: {
        name: this._commitInfo.getOwner(),
        link: this._commitInfo.getOwnerUrl()
      }
    })
  }

  /**
   * generate feed entries by every commit
   *
   * generate feed entries by every commit,
   * and set all entries to Feed to create RSS feed
   *
   */
  async generateFeedItems() {
    // fetch commit details
    if (!this._commitDetails) {
      const details = await this._commitInfo.fetchCommitDetails(this.#_commitNum)
      if (!details) return

      this._commitDetails = details
    }
    const feedItems = this._commitDetails.map(commit => ({
      title: commit.commit.message.trim().split('\n')[0],
      id: commit.sha,
      link: commit.html_url,
      author: [
        {
          name: commit.commit.author.name,
          email: commit.commit.author.email
        }
      ],
      description: this._filterCdata(commit.commit.message),
      content: this._filterCdata(commit.files.diff),
      date: new Date(commit.commit.author.date)
    }))
    this._feed.items = feedItems
  }

  /**
   * get RSS feed
   *
   * initialize Feed, create entries
   * and return RSS feeds
   *
   * @returns string generated RSS feeds
   */
  async feeds() {
    await this.initFeed()
    await this.generateFeedItems()

    return this._feed.atom1()
  }
}

// exports
export {Commit2Feed}

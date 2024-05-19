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
 * Commit2Feed: generate RSS feed from github commits
 */
class Commit2Feed {
  // CONSTANTS
  #DEFAULT_COMMITS_NUM = 10

  #MAX_COMMITS_NUM = 100

  // public fiedls
  /** @var CommitInfo */
  _commitInfo

  /** @var fetched commit detail */
  _commitDetails

  /** @var feed  */
  _feed

  // private fields
  #_commitNum

  /**
   * @construct
   */
  constructor(user, repo, num = 10) {
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

  /**
   * feed初期化
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
      author: {
        name: this._commitInfo.getOwner(),
        link: this._commitInfo.getOwnerUrl()
      }
    })
  }

  /**
   * generate feed item by every commit
   */
  async generateFeedItems() {
    // fetch commit details
    if (!this._commitDetails) {
      const details = await this._commitInfo.fetchCommitDetails(this.#_commitNum)
      if (!details) return

      this._commitDetails = details
    }

    const feedItems = this._commitDetails.map(commit => ({
      title: commit.commit.message,
      id: commit.sha,
      link: commit.html_url,
      author: {
        name: commit.commit.author.name,
        email: commit.commit.author.email,
        link: commit.author.html_url
      },
      date: new Date(commit.commit.author.date)
    }))
    this._feed.items = feedItems
  }

  /**
   * generate feed
   */
  feed() {
    return this._feed.atom1()
  }
}

// exports
export {Commit2Feed}

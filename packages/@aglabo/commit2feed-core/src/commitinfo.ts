// @(#) CommitInfo : ferch commit info form GitHub repository
//
//
// @version 0.1.1
// @author  Furukawa Atsushi <atsushifx@aglabo.com>
// @date    2024-05-16
//
// @description<<
//
// fetch commit form GitHub repository
// select GitHub repositpry from user, repository name, branch
// default branch is main
// <<

/**
 * @class
 *
 * get comimt form GitHub repository given in user, repo
 */
class CommitInfo {
  // constants
  #MAX_COMMITS = 100
  #DIFF_LINE_MAX = 12

  // private repository selector
  #_user
  #_repo
  #_branch

  /**
   * @property Commits Commit information
   */
  _commits

  /**
   * @constructor
   *
   * @param user string github user name
   * @param repo string github repository
   * @param branch (&optional) srting branch name
   */
  constructor(user, repo, branch = '') {
    this.#_user = ''
    this.#_repo = ''
    this.#_branch = 'main'
    this._commits = []

    if (user) {
      this.#_user = user.trim()
    }
    if (repo) {
      this.#_repo = repo.trim()
    }
    if (branch) {
      this.#_branch = branch.trim()
    }
  }

  /**
   * get Repository name
   *
   * @returns string github repository title
   */
  getRepository() {
    return `${this.#_user} / ${this.#_repo}`
  }

  /**
   *  get Repository Owner
   *
   * @returns string github repository owner
   */
  getOwner() {
    return this.#_user
  }

  /**
   * get github's owner url
   *
   * @returns string repository owner's github page URL
   */
  getOwnerUrl() {
    return `https://github.com/${this.#_user}`
  }

  /**
   * get newest commit's date
   *
   * @returns string commit's date
   */
  getLatesCommitDate() {
    if (this._commits.length <= 0) {
      return null
    }

    return this._commits[0].commit.committer.date
  }

  /**
   * get github api's url
   *
   * @returns string github api's URL
   */
  getRepositoryUrl() {
    if (!this.#_user || !this.#_repo) return ''

    const repoUrl = `https://api.github.com/repos/${this.#_user}/${this.#_repo}`
    return repoUrl.toLowerCase()
  }

  /**
   * generate new code fron patch
   *
   * @param string patch commit diff by patch type string
   * @returns array of commits
   */
  getDiff(patch) {
    if (!patch) return ''

    const difflines = patch
      .split('\n')
      .filter(line => line.startsWith('+') && !line.startsWith('+++'))
      .map(line => line.substring(1))
      .slice(0, this.#DIFF_LINE_MAX)
      .join('\n')
    return difflines
  }

  /**
   * create diff from very files patch
   *
   * @param {*} commit
   * @returns string commit diff string
   */
  getCommitDiff(commit) {
    if (!commit) return ''

    const commitDiff = []

    for (let i = 0; i < commit.files.length; i++) {
      if (i > 0) commitDiff.push('------')
      commitDiff.push(commit.files[i].filename + '\n')
      const diff = commit.files[i].diff.split('\n')
      commitDiff.push(...diff)
      if (commitDiff.length > this.#DIFF_LINE_MAX) break
    }

    return commitDiff.join('\n')
  }

  /**
   * fetch commit from github repository
   *
   * @param (optional) number fetch commits' number
   * @returns [] commit list
   *
   */
  async fetchCommits(num = 10) {
    // check parameters

    if (isNaN(num)) return await []

    if (num < 1) return await []
    if (num > this.#MAX_COMMITS) {
      num = this.#MAX_COMMITS
    }
    const apiUrl = this.getRepositoryUrl() + '/commits'
    if (!apiUrl) {
      return []
    }
    const apiUrlWithNum = `${apiUrl}?sha=${this.#_branch}&per_page=${num * 3}`

    try {
      const response = await fetch(apiUrlWithNum)
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`)
      }
      const commits = await response.json()
      const humanCommits = commits
        .filter(commit => {
          const regex = /(actions-user)|(web-flow)/

          return !regex.test(commit.committer.login)
        })
        .slice(0, num)
      this._commits = humanCommits
      return this._commits
    } catch (error) {
      console.error('Error fetching commits:', error)
      return []
    }
  }

  /**
   * fetch commit's detail from repository
   *
   * @param {*} commitSha
   * @returns commit detail : false/cannot fetch
   */
  async #fetchDetail(commitSha) {
    const apiUrl = this.getRepositoryUrl() + '/commits'
    if (!apiUrl || !commitSha) {
      return await false
    }

    const urlWithSha = `${apiUrl}/${commitSha}`

    try {
      const response = await fetch(urlWithSha)
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`)
      }
      const commitDetail = await response.json()

      // diff作成
      for (let i = 0; i < commitDetail.files.length; i++) {
        commitDetail.files[i].diff = this.getDiff(commitDetail.files[i].patch)
      }
      commitDetail.files.diff = this.getCommitDiff(commitDetail)
      return commitDetail
    } catch (error) {
      console.error(`Error fetching commit details for SHA ${commitSha}:`, error)
      return false
    }
  }

  /**
   * fetch n'th commit details
   *
   * @param number n number of commits (0:latest)
   * @returns object Commit Detail
   */
  async nthDetail(n) {
    if (isNaN(n)) return await false
    if (this._commits.length < 1) {
      await this.fetchCommits()
    }

    if (n < 0 || n >= this._commits.length) {
      return await false
    }
    const commitSha = this._commits[n].sha
    return await this.#fetchDetail(commitSha)
  }

  /**
   * fetch commit details from repositry
   *
   * @param (optional)number getch commit details' number
   * @returns array Commit Details list
   */

  async fetchCommitDetails(commitNum = 5) {
    if (isNaN(commitNum)) return await false
    if (commitNum < 1) return await false
    if (commitNum > this.#MAX_COMMITS) {
      commitNum = this.#MAX_COMMITS
    }

    const commits = await this.fetchCommits(commitNum)
    if (!commits) return await false

    const commitDetails = []
    for (let i = 0; i < commits.length; i++) {
      const detail = await this.nthDetail(i)
      if (!detail) break
      commitDetails.push(detail)
    }
    return commitDetails
  }
}

// exports
export {CommitInfo}

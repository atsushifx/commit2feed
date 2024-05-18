// @(#) fetch_commit : ferch commit form GitHub repository
//
//
// @version   0.1.0
// @author    Furukawa Atsushi <atsushifx@aglabo.com>
// @date      2024-05-16
//
// @description<<
//
// fetch commit form GitHub repository
//
// <<

/**
 * class: CommitInfo
 *
 * get comit form GitHub repository  given in user, repo
 */
class CommitInfo {
  // constants
  #MAX_COMMITS = 100
  #LINE_MAX = 12

  // field
  #_user
  #_repo

  /** @var コミット情報 */
  #_commits = []

  /**
   * @constructor
   *
   * @param user :string github user name
   * @param repo :string github repository
   */
  constructor(user, repo) {
    this.#_user = ''
    this.#_repo = ''
    if (user) {
      this.#_user = user.trim()
    }
    if (repo) {
      this.#_repo = repo.trim()
    }
  }

  /**
   * create gihub commit api from user and repository name
   *
   */
  getApiUrl() {
    if (!this.#_user || !this.#_repo) return ''

    const apiUrl = `https://api.github.com/repos/${this.#_user}/${this.#_repo}/commits`.toLowerCase()
    return apiUrl
  }

  getDiff(patch) {
    const difflines = patch
      .split('\n')
      .filter(line => line.startsWith('+') && !line.startsWith('+++'))
      .map(line => line.substring(1))
      .slice(0, this.#LINE_MAX)
      .join('\n')
    return difflines
  }

  async fetchCommits(num = 10) {
    // check parameters

    if (isNaN(num)) return await []

    if (num < 1) return await []
    if (num > this.#MAX_COMMITS) {
      num = this.#MAX_COMMITS
    }
    const apiUrl = this.getApiUrl()
    if (!apiUrl) {
      return []
    }
    const apiUrlWithNum = `${apiUrl}?per_page=${num}`

    try {
      const response = await fetch(apiUrlWithNum)
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`)
      }
      this.#_commits = await response.json()
      return this.#_commits
    } catch (error) {
      console.error('Error fetching commits:', error)
      return []
    }
  }
  async fetchCommitDetail(commitSha) {
    const apiUrl = this.getApiUrl()
    if (!apiUrl || !commitSha) {
      return undefined
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
      return commitDetail
    } catch (error) {
      console.error(`Error fetching commit details for SHA ${commitSha}:`, error)
      return undefined
    }
  }

  async nthCommitDetail(n) {
    if (isNaN(n)) return await undefined
    if (this.#_commits.length < 1) {
      await this.fetchCommits()
    }

    if (n < 0 || n >= this.#_commits.length) {
      return await undefined
    }
    const commitSha = this.#_commits[n].sha
    return await this.fetchCommitDetail(commitSha)
  }
}

// exports
export {CommitInfo}

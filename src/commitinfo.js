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

    const apiUrl = `https://api.github.com/repos/${this.#_user}/${this.#_repo}/commits`
    return apiUrl.toLowerCase()
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
      return {}
    }

    const urlWithSha = `${apiUrl}/${commitSha}`

    try {
      const response = await fetch(urlWithSha)
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`)
      }
      const commitDetails = await response.json()
      // 新規追加部分を抜き出し ()
      const addLines = commitDetails.files[0].patch
        .split('\n')
        .filter(l => (l.startsWith('+') || l.startsWith(' ')) && !l.startsWith('+++'))
        .map(line => line.substring(1).trim())
        .slice(0, this.#LINE_MAX)
        .join('\n')
      console.log(addLines)
      commitDetails.files[0].addlines = addLines
      return commitDetails
    } catch (error) {
      console.error(`Error fetching commit details for SHA ${commitSha}:`, error)
      return {}
    }
  }

  async nthCommitDetail(n) {
    if (isNaN(n)) return await {}
    if (this.#_commits.length < 1) {
      await this.fetchCommits()
    }

    if (n < 1 || n > this.#_commits.length) {
      return await {}
    }
    const commitSha = this.#_commits[n - 1].sha // start = 1 , so index = n - 1

    return await this.fetchCommitDetail(commitSha)
  }
}

// exports
export {CommitInfo}

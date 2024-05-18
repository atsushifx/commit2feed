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
    const maxCommitsNum = 100 // max number of fetch commits

    // check parameters

    if (isNaN(num)) return await []

    if (num < 1) return await []
    if (num > maxCommitsNum) {
      num = maxCommitsNum
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
      return commitDetails
    } catch (error) {
      console.error(`Error fetching commit details for SHA ${commitSha}:`, error)
      return {}
    }
  }

  async NthCommitDetail(num) {
    if (isNaN(num)) {
      return await {}
    }
    console.log(this.#_commits.length)

    if (n < 1 || n > this.#_commits.length) {
      return await {}
    }
    const commitSha = this.#_commits[num - 1].sha // start = 1 , so index = n - 1

    return await this.fetchCommitDetail(commitSha)
  }
}

// exports
export {CommitInfo}

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

  async fetchCommits(numCommits = 10) {
    const apiUrl = this.getApiUrl()
    if (!apiUrl) {
      return []
    }
    const apiUrlWithNum = `${apiUrl}?per_page=${numCommits}`

    try {
      const response = await fetch(apiUrlWithNum)
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`)
      }
      const commits = await response.json()
      this.#_commits = commits
      return commits
    } catch (error) {
      console.error('Error fetching commits:', error)
      return []
    }
  }
}
// exports
export {CommitInfo}

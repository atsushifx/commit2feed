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
 * create gihub commit api from user and repository name
 *
 * @param {string} user
 * @param {string} repo
 *
 */
function getApiUrl(user, repo) {
  if (!user || !repo) return ''

  const user2 = user.trim()
  const repo2 = repo.trim()
  if (!user2 || !repo2) return ''

  const apiUrl = `https://api.github.com/repos/${user2}/${repo2}/commits`
  return apiUrl.toLowerCase()
}

//
export {getApiUrl}

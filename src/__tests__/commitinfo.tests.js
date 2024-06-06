// @(#) fetch_commit.Test : Jest Test of ferch commit form GitHub repository
//
// @version   0.1.0
// @author    Furukawa Atsushi <atsushifx@aglabo.com>
// @date      2024-05-16
//
// @description<<
//
// Jest's Test module: fetch commit form GitHub repository
//
// <<
import {CommitInfo} from '../commitinfo.js'

describe('test getRepositoryUrl', () => {
  const commitInfo = new CommitInfo('  atsushifx  ', 'TIL')
  it('should return the valid api URL: param is url,repo', () => {
    const expectedURL = 'https://api.github.com/repos/atsushifx/til'
    const actualURL = commitInfo.getRepositoryUrl()

    expect(actualURL).toEqual(expectedURL)
  })

  it("shoult return '' if user is null", () => {
    const commitInfo = new CommitInfo('  ', 'TIL')

    const apiUrl = commitInfo.getRepositoryUrl()
    expect(apiUrl).toEqual('')
  })

  it("shoult return '' if repo is null", () => {
    const commitInfo = new CommitInfo(' atsushifx ', undefined)

    const apiUrl = commitInfo.getRepositoryUrl()
    expect(apiUrl).toEqual('')
  })
})

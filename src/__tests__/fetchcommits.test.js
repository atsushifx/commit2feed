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

import {getApiUrl} from 'ferchcommits'

describe('test getApiUrl', () => {
  it('should return the valid api URL: param is url,repo', () => {
    const expectedURL = 'https://api.github.com/repos/atsushifx/til/commits'
    const actualURL = getApiUrl('atsushifx', 'TIL')

    expect(actualURL).toEqual(expectedURL)
  })
})

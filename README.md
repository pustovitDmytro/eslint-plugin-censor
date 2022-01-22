# eslint-plugin-censor
The plugin will prevent you from using swear pejoratives and abuse words.

[![Version][badge-vers]][npm]
[![Bundle size][npm-size-badge]][npm-size-url]
[![Downloads][npm-downloads-badge]][npm]

[![CodeFactor][codefactor-badge]][codefactor-url]
[![SonarCloud][sonarcloud-badge]][sonarcloud-url]
[![Codacy][codacy-badge]][codacy-url]
[![Total alerts][lgtm-alerts-badge]][lgtm-alerts-url]
[![Language grade][lgtm-lg-badge]][lgtm-lg-url]
[![Scrutinizer][scrutinizer-badge]][scrutinizer-url]

[![Dependencies][badge-deps]][npm]
[![Security][snyk-badge]][snyk-url]
[![Build Status][tests-badge]][tests-url]
[![Coverage Status][badge-coverage]][url-coverage]

[![Commit activity][commit-activity-badge]][github]
[![FOSSA][fossa-badge]][fossa-url]
[![License][badge-lic]][github]

## Table of Contents
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Sources](#sources)
  - [Contribute](#contribute)

## Requirements
[![Platform Status][node-ver-test-badge]][node-ver-test-url]

To use library you need to have [node](https://nodejs.org) and [npm](https://www.npmjs.com) installed in your machine:

* node `>=10`
* npm `>=6`

Package is [continuously tested][node-ver-test-url] on darwin, linux and win32 platforms. All active and maintenance [LTS](https://nodejs.org/en/about/releases/) node releases are supported.

## Installation

To install the library run the following command

```bash
  npm i --save-dev eslint-plugin-censor
```

## Usage

After installation, add plugin to [eslint](https://eslint.org/docs/user-guide/configuring/configuration-files#using-configuration-files) config:

```json
{
    "extends": [...],
    "env": {...},
    "plugins": [ "censor" ],
    "rules": {...}
}
```

And enable rule:
```json
{
    "extends": [...],
    "env": {...},
    "plugins": [ "censor" ],
    "rules": {
      ...
      "censor/no-swear": 2
    }
}
```

Now you can check your courtesy by running eslint.


## Sources

* [wiktionary](https://en.wiktionary.org/wiki/Category:English_swear_words)
* https://github.com/MauriceButler/badwords
* https://github.com/LDNOOBW/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words
* https://github.com/first20hours/google-10000-english

## Contribute

Make the changes to the code and tests. Then commit to your branch. Be sure to follow the commit message conventions. Read [Contributing Guidelines](.github/CONTRIBUTING.md) for details.

[npm]: https://www.npmjs.com/package/eslint-plugin-censor
[github]: https://github.com/pustovitDmytro/eslint-plugin-censor
[coveralls]: https://coveralls.io/github/pustovitDmytro/eslint-plugin-censor?branch=master
[badge-deps]: https://img.shields.io/librariesio/release/npm/eslint-plugin-censor.svg
[badge-vuln]: https://img.shields.io/snyk/vulnerabilities/npm/eslint-plugin-censor.svg?style=popout
[badge-vers]: https://img.shields.io/npm/v/eslint-plugin-censor.svg
[badge-lic]: https://img.shields.io/github/license/pustovitDmytro/eslint-plugin-censor.svg
[badge-coverage]: https://coveralls.io/repos/github/pustovitDmytro/eslint-plugin-censor/badge.svg?branch=master
[url-coverage]: https://coveralls.io/github/pustovitDmytro/eslint-plugin-censor?branch=master

[snyk-badge]: https://snyk-widget.herokuapp.com/badge/npm/eslint-plugin-censor/badge.svg
[snyk-url]: https://snyk.io/advisor/npm-package/eslint-plugin-censor

[tests-badge]: https://img.shields.io/circleci/build/github/pustovitDmytro/eslint-plugin-censor
[tests-url]: https://app.circleci.com/pipelines/github/pustovitDmytro/eslint-plugin-censor

[codefactor-badge]: https://www.codefactor.io/repository/github/pustovitdmytro/eslint-plugin-censor/badge
[codefactor-url]: https://www.codefactor.io/repository/github/pustovitdmytro/eslint-plugin-censor

[commit-activity-badge]: https://img.shields.io/github/commit-activity/m/pustovitDmytro/eslint-plugin-censor

[scrutinizer-badge]: https://scrutinizer-ci.com/g/pustovitDmytro/eslint-plugin-censor/badges/quality-score.png?b=master
[scrutinizer-url]: https://scrutinizer-ci.com/g/pustovitDmytro/eslint-plugin-censor/?branch=master

[lgtm-lg-badge]: https://img.shields.io/lgtm/grade/javascript/g/pustovitDmytro/eslint-plugin-censor.svg?logo=lgtm&logoWidth=18
[lgtm-lg-url]: https://lgtm.com/projects/g/pustovitDmytro/eslint-plugin-censor/context:javascript

[lgtm-alerts-badge]: https://img.shields.io/lgtm/alerts/g/pustovitDmytro/eslint-plugin-censor.svg?logo=lgtm&logoWidth=18
[lgtm-alerts-url]: https://lgtm.com/projects/g/pustovitDmytro/eslint-plugin-censor/alerts/

[codacy-badge]: https://app.codacy.com/project/badge/Grade/a0c20fb89e0a40259f4c8e53810a5186
[codacy-url]: https://www.codacy.com/gh/pustovitDmytro/eslint-plugin-censor/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=pustovitDmytro/eslint-plugin-censor&amp;utm_campaign=Badge_Grade

[sonarcloud-badge]: https://sonarcloud.io/api/project_badges/measure?project=pustovitDmytro_eslint-plugin-censor&metric=alert_status
[sonarcloud-url]: https://sonarcloud.io/dashboard?id=pustovitDmytro_eslint-plugin-censor

[npm-downloads-badge]: https://img.shields.io/npm/dw/eslint-plugin-censor
[npm-size-badge]: https://img.shields.io/bundlephobia/min/eslint-plugin-censor
[npm-size-url]: https://bundlephobia.com/result?p=eslint-plugin-censor

[node-ver-test-badge]: https://github.com/pustovitDmytro/eslint-plugin-censor/actions/workflows/npt.yml/badge.svg?branch=master
[node-ver-test-url]: https://github.com/pustovitDmytro/eslint-plugin-censor/actions?query=workflow%3A%22Node.js+versions%22

[fossa-badge]: https://app.fossa.com/api/projects/custom%2B24828%2Feslint-plugin-censor.svg?type=shield
[fossa-url]: https://app.fossa.com/projects/custom%2B24828%2Feslint-plugin-censor?ref=badge_shield
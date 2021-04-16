# eslint-plugin-censor
**eslint-plugin-censor** The plugin will prevent you from using swear pejoratives and abuse words.

[![Version][badge-vers]][npm]
[![Dependencies][badge-deps]][npm]
[![Vulnerabilities][badge-vuln]](https://snyk.io/)
[![Build Status][badge-tests]][travis]
[![Coverage Status][badge-coverage]](coveralls)
[![License][badge-lic]][github]

## Table of Contents
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Sources](#sources)
  - [Contribute](#contribute)

## Requirements
To use library you need to have [node](https://nodejs.org) and [npm](https://www.npmjs.com) installed in your machine:

* node `6.0+`
* npm `3.0+`

## Installation

To install the library run following command

```bash
  npm i --save-dev eslint-plugin-censor
```

## Usage

After installation add plugin to eslint config:

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

then you can check your courtesy by running eslint.


## Sources

* [wiktionary](https://en.wiktionary.org/wiki/Category:English_swear_words)
* https://github.com/MauriceButler/badwords
* https://github.com/LDNOOBW/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words
* https://github.com/first20hours/google-10000-english

## Contribute

Make the changes to the code and tests and then commit to your branch. Be sure to follow the commit message conventions.

Commit message summaries must follow this basic format:
```
  Tag: Message (fixes #1234)
```

The Tag is one of the following:
* **Fix** - for a bug fix.
* **Update** - for a backwards-compatible enhancement.
* **Breaking** - for a backwards-incompatible enhancement.
* **Docs** - changes to documentation only.
* **Build** - changes to build process only.
* **New** - implemented a new feature.
* **Upgrade** - for a dependency upgrade.
* **Chore** - for tests, refactor, style, etc.

The message summary should be a one-sentence description of the change. The issue number should be mentioned at the end.


[npm]: https://www.npmjs.com/package/eslint-plugin-censor
[github]: https://github.com/pustovitDmytro/eslint-plugin-censor
[travis]: https://travis-ci.com/pustovitDmytro/eslint-plugin-censor
[coveralls]: https://coveralls.io/github/pustovitDmytro/eslint-plugin-censor?branch=master
[badge-deps]: https://img.shields.io/david/pustovitDmytro/eslint-plugin-censor.svg
[badge-tests]: https://img.shields.io/travis/pustovitDmytro/eslint-plugin-censor.svg
[badge-vuln]: https://img.shields.io/snyk/vulnerabilities/npm/eslint-plugin-censor.svg?style=popout
[badge-vers]: https://img.shields.io/npm/v/eslint-plugin-censor.svg
[badge-lic]: https://img.shields.io/github/license/pustovitDmytro/eslint-plugin-censor.svg
[badge-coverage]: https://coveralls.io/repos/github/pustovitDmytro/eslint-plugin-censor/badge.svg?branch=master
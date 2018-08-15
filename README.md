compat-test-runner
==================
[![Build Status](https://travis-ci.org/amilajack/compat-test-runner.svg?branch=master&maxAge=2592)](https://travis-ci.org/amilajack/compat-test-runner) [![Greenkeeper badge](https://badges.greenkeeper.io/amilajack/compat-test-runner.svg)](https://greenkeeper.io/)

Goal: Given a compat record, return if the API is supported or not

Compat records are taken from [`ast-metadata-inferer`](https://github.com/amilajack/ast-metadata-inferer)

Run tests on saucelabs using `testcafe`

## Setup
```bash
git clone https://github.com/amilajack/compat-test-runner
cd compat-test-runner
cp .env.example .env
yarn
yarn start
```

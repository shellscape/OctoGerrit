## Contributing

We'd love to support more versions. We'd love to get bugs fixed. We love improvements.
If you'd like to contribute to improving OctoGerrit, you're our slice of pie.

To contribute, fork and clone this repository, make your changes and submit a
Pull Request. Every PR should be accompanied by a before *and* after screenshot.
Knowing how your change will affect the UX is important, and we may not have the time
or the version to test your changes for you. Additionally, you should run the tests
before submitting your PR. Pull Requests are vetted by Travis-CI and we won't accept
any PR that doesn't pass.

## Building

OctoGerrit is comprised of a few individual files that are meant to be preprocessed
for distribution. This allows for ease of updates and some degree or organization.

```bash
npm install
gulp build
```

## Testing

OctoGerrit uses Lesshint and JSHint to enforce standards and to ensure code quality.

```bash
npm install
gulp test
```

# OctoGerrit

A modern, clean, and usable theme for Gerrit modeled after Github.

This is a **WORK IN PROGRESS**

## TODO

- [x] Move CSS to LESS, and clean it up.
- [x] Build Tooling
- [ ] Create an actual Gerrit Theme

## Show Me

![](https://raw.githubusercontent.com/shellscape/OctoGerrit/master/assets/dashboard.png)
<img src="https://raw.githubusercontent.com/shellscape/OctoGerrit/master/assets/diff-sbs-comments.png" width="734">
![](https://raw.githubusercontent.com/shellscape/OctoGerrit/master/assets/review-a.png)

<img src="https://raw.githubusercontent.com/shellscape/OctoGerrit/master/assets/review-reply.png" width="461">

You can view more screenshots [here](https://github.com/shellscape/OctoGerrit/tree/master/assets).

## But Why?

Gerrit is a good tool built on a solid framework. But Gerrit, with regard to user
experience, is bad. Really bad. Really, really bad. Functional? Yes. Pretty? Good lord no.

Gerrit's UX is all over the place. At the time of authoring this theme, the folks
behind Gerrit are working to move to a new UI framework that will purportedly solve many
of the problems that plagues the current stable version:

- Tables on tables on tables on tables on tables.
- Complete lack of semantic markup.
- Over-reliance on GWT and the generated markup, css, and javascript.
- Inconsistency use of IDs and class names.
- Inconsistent class names.
- Classnames that are *over 100 characters* in length.
- Wild inconsistency in color and font choices.
- Big inconsistency between diff views.
- Different types of popups on the same page.

... The list goes on.

OctoGerrit aims to resolve these issues through brute force using the latest CSS
techniques and a sprinkle of Javascript.

## Using OctoGerrit as a Gerrit theme

This is in progress. Because of the Javascript that accompanies the built CSS,
some work will be required to get the Javascript to execute. Details to follow
soon.

## Gerrit Versions

OctoGerrit was written and tested on `Gerrit v2.12`. If it works with other older
versions, that's wonderful! But not something we're going to test. OctoGerrit is
not guaranteed to work on newer versions, nor the new 'PolyGerrit' being developed.

However, we're always open to improvements and [Contributions](#contributing)!

## Using OctoGerrit with Extensions

If you're unable to apply a theme to Gerrit, you can always use browser extensions
to apply OctoGerrit for you. We recommend these extensions for Chrome:

- [Stylish](https://chrome.google.com/webstore/detail/stylish/fjnbnpbmkenffdnngjfgmeleoegfcffe?hl=en)
- [Resource Override](https://chrome.google.com/webstore/detail/resource-override/pkoacgokdfckfpndoffpifphamojphii?hl=en)

With *Stylish* click on the extension button, then click 'Manage Installed Styles'.  
Find and click the 'Write new style' button.  
Copy the contents of `dist/octogerrit.css` and paste into the code editor.  
Underneath the code editor, you'll see 'Applies to '. Make sure you set this up for
your Gerrit site url/domain.

With *Resource Override* navigation to your Gerrit site within a tab, click on
the extension button, then click 'Add Inject Rule'.  
Type in a name for the new injected file, eg. 'OctoGerrit'.  
Select 'Body' from the 'Inject Into' dropdown.  
Click 'Edit File' and paste the contents of `dist/octogerrit.js` into the code
editor.  
Click 'Save and Close'

If you're not a user of Chrome you'll have to investigate alternative extensions
or addons, but the process should be similar.

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

## Contributing

We'd love to support more versions. We'd love to get bugs fixed. We love improvements.
If you'd like to contribute to improving OctoGerrit, you're our slice of pie.

To contribute, fork and clone this repository, make your changes and submit a
Pull Request. Every PR should be accompanied by a before *and* after screenshot.
Knowing how your change will affect the UX is important, and we may not have the time
or the version to test your changes for you. Additionally, you should run the tests
before submitting your PR. Pull Requests are vetted by Travis-CI and we won't accept
any PR that doesn't pass.

## License

MIT, baby.

# OctoGerrit

A modern, clean, and usable theme for Gerrit modeled after Github.

This is a **WORK IN PROGRESS**

[Using OctoGerrit](USING.md)  
[Contributing to OctoGerrit](CONTRIBUTING.md)

## Show Me

![](https://raw.githubusercontent.com/shellscape/OctoGerrit/master/assets/dashboard.png)

You can view more screenshots [here](https://github.com/shellscape/OctoGerrit/tree/master/assets).

## The Why

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

## Gerrit Versions

OctoGerrit was written and tested on `Gerrit v2.12`. If it works with other older
versions, that's wonderful! But not something we're going to test. OctoGerrit is
not guaranteed to work on newer versions, nor the new 'PolyGerrit' being developed.

However, we're always open to improvements and [Contributions](CONTRIBUTING.md)!

## License

MIT, baby.

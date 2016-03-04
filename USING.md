## Using OctoGerrit with Gerrit Themes

The OctoGerrit Theme files are located in `dist/theme` for each release. Using those files, follow [the instructions here](https://gerrit-review.googlesource.com/Documentation/config-themes.html).

If you're not a Gerrit admin and/or can't update your local Gerrit install, you can opt to use Browser Extensions to use the theme.

## Using OctoGerrit with Browser Extensions

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

## Using OctoGerrit as a Gerrit Theme

We're still workig on this bit.

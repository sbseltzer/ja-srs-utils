# Anki Instructions

## Installation

#### IMPORTANT: Always close Anki before installing/updating! If you don't, you run the risk of corrupting your database! 

For this to work in desktop environments, you will need to install the [JS Booster](https://ankiweb.net/shared/info/1280253613) addon for Anki. Unfortunately, there's a bug in this addon that breaks it when the path to your Anki user directory contains non-ASCII characters. To mitigate this, you may need to change the path Anki starts from or rename your user.

To use this on mobile devices, you'll need to first install in a desktop environment and then sync your changes to AnkiWeb. You'll likely need a desktop version of Anki to modify your cards anyway.

### Linux

Run `install.sh "My User Name"` replacing "My User Name" with the actual username you have for Anki.

### Windows

If you already have a Linux shell emulator (such as Cygwin or Mintty) go ahead and run `install.sh` using that. Otherwise, install [Git](https://git-scm.org) which includes one for you. Make sure during installation that you allow it to be the default program for running `.sh` files. Then refer to the Linux instructions above.

### OSX

TODO

# Japanese SRS Utilities

Formatting utilities for Japanese SRS cards. Merge requests are welcome!

I've started this with Anki in mind, but I hope to have this supported for other SRS systems that are capable of it.

## Philosophy

This project shall aim to conform to the following development philosophies whenever possible:

1. Installation and usage is easy, or at least well-explained, for those with little-to-no experience with programming and card customization.
2. Card customization is as "drop-in" as possible. This means simple HTML/attribute modification.
3. Features that depend on field syntax are simple and intuitive.

In summary: This project should be usable for any SRS user pursuing Japanese language acquisition. It should be possible to apply this to their pre-existing decks/cards with general ease in way that minimally invades their setup.

## Installation

Start by cloning or downloading the repository and ensuring you have something installed that supports bash scripting. If you're on a Unix-like OS, you should be all set. If you're on Windows, I recommend [Git Bash](https://git-scm.com) since it comes with the official Git install.

Installation instructions will differ from SRS to SRS, but any that support HTML/CSS/Javascript customization should be compatible with a little tweaking. Each supported SRS is represented by a folder. These folders will have a README.md file with more specific instructions and an `install.sh` file.

## Updating

If you're updating, either re-download, or pull the latest changes. Then install the same as before to overwrite the old installed content. 

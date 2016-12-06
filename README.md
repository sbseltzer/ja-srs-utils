# Japanese SRS Utilities

Formatting utilities for expressive and interactive Japanese SRS cards. Merge requests are welcome!

Any SRS that's capable of displaying cards with HTML/CSS/Javascript should be suppoted.

The goal is to empower the user to make better SRS cards with small HTML tweaks.

## Philosophy

This project shall aim to conform to the following development philosophies whenever possible:

1. Installation and usage is easy, or at least well-explained, for those with little-to-no experience with programming and card customization.
2. Card customization is as "drop-in" as possible. This means simple HTML/attribute modification.
3. Features that depend on field syntax are simple and intuitive.
4. Portability is important.

In summary: This project should be usable for any SRS user pursuing Japanese language acquisition. It should be possible to apply this to their pre-existing decks/cards with general ease in way that minimally invades their setup.

## Platforms

Support is currently aimed at the following platforms.

1. Anki 
  - Windows (Working)
  - Ubuntu (Working)
  - Android (Untested)
  - iOS (Untested)
  - Web (Untested)
2. Mnemosyne 
  - Windows (Partly working)
  - Linux (None yet)
  - Android (None yet)
  - iOS (None yet)
  - Web (None yet)
  
## Installation

Start by cloning or downloading the repository and ensuring you have something installed that supports bash scripting. If you're on a Unix-like OS, you should be all set. If you're on Windows, I recommend [Git Bash](https://git-scm.com) since it comes with the official Git install.

Installation instructions will differ from SRS to SRS, but any that support HTML/CSS/Javascript customization should be compatible with a little tweaking. Each supported SRS is represented by a folder. These folders will have a README.md file with more specific instructions and an `install.sh` file.

## Updating

If you're updating, either re-download, or pull the latest changes. Then install the same as before to overwrite the old installed content. 

#### WARNING: Updating may require you to modify your cards that use these utilities. If it does break your cards in some way, you can always revert to your previous version of these utilities.

## Usage

### Introduction

#### Customizing Cards with HTML

### Basic

#### Font Cycling (Stroke Orders)

Believe it or not, it's common for different fonts to draw kanji with slightly different strokes and appearances. As such, having a way to cycle between fonts is quite useful, especially when learning to read kanji.

One of the first things I did when customizing my kanji deck was having a way to display stroke order when clicking/tapping on the kanji. This project comes with a font that displays stroke orders to save you the trouble of tracking one down and installing it yourself.

For example:

```
<p use-fonts="StrokeOrder">{Kanji}</p>
```

The above will cycle the font-family between the default font and StrokeOrder.

#### Furigana Parsing

Furigana is the pronounciation of kanji in a particular context. Having a way to format fields (such as sentences) specifying the furigana of relevant kanji in an aesthetically pleasing format is incredibly convenient.

Fields that use this must be formatted as `kanji[furigana]...` for this to work.

Example Field: `失[しっ]敗[ぱい]は成[せい]功[こう]のもと`

Outcome: 

<ruby>失<rt>しっ</rt></ruby><ruby>敗<rt>ぱい</rt></ruby>は<ruby>成<rt>せい</rt></ruby><ruby>功<rt>こう</rt></ruby>のもと

Let's say your card has a field named `My Sentence` and the card currently looks like the following.

```
{My Sentence}
```

You'll want to make it look something like the following.

```
<p use-furigana>{My Sentence}</p>
```

The `<p></p>` tags are arbitrary. They could be anything. If your card already had your field surrounded by HTML tags, simply add the `use-furigana` attribute to it as shown below.

```
<!-- Before: -->
<span class="some-class">{My Sentence}</span>
<!-- After: -->
<span class="some-class" use-furigana>{My Sentence}</span>
```

If you dont want to use "[]" braces to surround furigana in your field value for a particular card, you can specify your own. Here are some examples. 

```
<!-- Using parenthesis -->
<p use-furigana brace-type="()">{My Sentence}</p>
<!-- Using curly braces -->
<p use-furigana brace-type="{}">{My Sentence}</p>
<!-- Using angle brackets -->
<p use-furigana brace-type="<>">{My Sentence}</p>
<!-- Using backticks -->
<p use-furigana brace-type="``">{My Sentence}</p>
```

#### Jisho and RTK Links

[Jisho](http://jisho.org) and [RTK](http://kanji.koohii.com) are excellent resources to link your fields to, so an easy-to-use format has been added to ease linking any field to them.

Jisho example:
```
<p jisho-link>{My Sentence}</p>
```

RTK example:
```
<p rtk-link>{My Kanji}</p>
```

### Advanced

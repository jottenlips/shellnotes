# shellnotes 🐢

The tiny turtle terminal note taker.

Shellnotes is a way to keep track of those small details and points that come up throughout the day. Shellnotes cab help you avoid the work flow or meeting interruptions experienced by making a doc and remembering where you put it. At the end of your day, you can do a quick recap with the `--today` functionality. If you enjoy this system leave a ⭐️. Thanks! More features coming soon.

## install

```
npm install -g shellnotes
```

## example usage

```
shellnotes Something I want to take a note on
```

Open today's note

```
shellnotes --edit
```

View today's note

```
shellnotes --today
```

View yesterday's note

```
shellnotes --yesterday
```

See all of your notes

```
shellnotes --all
```

You can also use the command `note` for shorthand instead of `shellnotes`


```
note Something I want to take a note on
```

Open today's note

```
note --edit
```

View today's note

```
note --today
```

See all of your notes

```
note --all
```

## Markdown support

Use quotes for markdown

```
shellnotes '# This is markdown'
```

## Location

Your shell notes are stored at ~/.shellnotes
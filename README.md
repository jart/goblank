# goblank

Move cursor to previous/next blank line.

This extension will install two keyboard shortcuts:

- `alt+{` moves the cursor to the previous blank line
- `alt+}` moves the cursor to the next blank line

This is a useful way for navigating files. For example, blank lines are often
what separates functions. So using these keystrokes, you can quickly hop between
functions in your source file.

## Background

I originally wrote this Emacs code to do it:

```elisp
(defconst jart-blank-line-regexp
  "^$"  ;; "^\f*$"
  "Blank line regular expression.")

(defun jart-prev-blank-line ()
  "Set point to previous blank line."
  (interactive)
  (while (and (looking-at jart-blank-line-regexp)
              (> (point) (point-min)))
    (forward-line -1))
  (or (search-backward-regexp jart-blank-line-regexp nil t)
      (goto-char 0)))

(defun jart-next-blank-line ()
  "Set point to next blank line."
  (interactive)
  (while (and (looking-at jart-blank-line-regexp)
              (< (point) (point-max)))
    (forward-line))
  (or (search-forward-regexp jart-blank-line-regexp nil t)
      (goto-char (point-max))))

(global-set-key (kbd "M-{") 'jart-prev-blank-line)
(global-set-key (kbd "M-}") 'jart-next-blank-line)
```

I wanted to have this for VSCode too, so I wrote this.

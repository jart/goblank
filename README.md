# goblank

vscode extension for moving cursor to prev/next blank lines.

## Background

I really like using `M-{` and `M-}` in Emacs to hop between blank lines.
It's one of the main ways I navigate source code.

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

I wanted to have this for vscode too, so I wrote this.

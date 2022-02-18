---
title: No Dumb Questions 
date: "2022-02-18"
tags: ["productivity"]
---

There are generally two types of questions on SO (and other Q&A sites)
; `how to ___`
and `___ is not working, help`. This article is about the latter.

You know how to do something, it's just not working as it should. If all the StackOverflow answers aren't helping, go
ahead and write your own question. "But it's already been asked!" No problem. Just start writing - **chances are you'll
close the tab before you post it.**

I used to avoid making my own questions for a variety of reasons. I didn't want to get downvoted as a duplicate, or the
process was too lengthy - copying in the relevant code, explaining everything, etc. In the end though, it's faster than
debugging and scouring the net for hours.

Asking a question or opening an issue for others to read requires you to think about and articulate what you're trying
to do, and you'll notice things you may have overlooked. Possibly the problematic part of your code is something else
entirely than what you thought.

One time I thought there was a bug in SwiftUI because a state update wasn't doing anything, but after putting everything
in writing, reproducible example and all, I realized I had forgotten to call a function 🤦‍️.

**More often than not, I end up solving the issue myself and the question never gets posted.**

Of course this is just one of many strategies, after debugging you can also write a minimum reproducible example to
isolate the issue. I noticed something similar when proposing features on OSS projects - I throw out my idea before it
gets posted. While writing how it could be implemented or considering the side effects I realize it's not feasible. All
things you don't realize before you start typing it out!

Hope this saves someone a few hours of googling and debugging!
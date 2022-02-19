---
title: No Dumb Questions 
date: "2022-02-18"
tags: ["productivity"]
---

**tl;dr type out your SO question even if you won't post it. You may notice something you had overlooked that solves
your issue.**

There are generally two types of questions on SO (and other Q&A sites): `how to ___`
and `___ is not working, help`. This article is about the latter.

You know how to do something, it's just not working as it should. If all the StackOverflow answers aren't helping, don't
hesitate to write your own question. "But it's already been asked!" No problem. Just start writing - **chances are
you'll close the tab before you post it.**

I used to avoid making my own questions for a variety of reasons. I didn't want to get downvoted as a duplicate, or the
process was too lengthy - copying in the relevant code, explaining everything, etc. In the end though, it's faster than
debugging and scouring the net for hours.

Asking a question or opening an issue for others to read requires you to think about and articulate what you're trying
to do, and you'll notice things you may have overlooked. Possibly the problematic part of your code is something else
entirely than what you thought.

One time I thought there was a bug in SwiftUI because a state update wasn't doing anything, but after putting everything
in writing, reproducible example and all, I realized I had forgotten to call a function 🤦‍️

**More often than not, I end up fixing the issue myself and the question never gets posted.**

But what if this doesn't fix it? At least you have a ready-made question to post. Or you may have discovered a bug, so
you can use what you wrote in a GitHub issue.

I've noticed a similar effect when proposing features on OSS projects. Sometimes I throw out my idea before it gets
posted. While writing how it could be implemented or considering the side effects I notice it's not feasible. All things
you don't realize before you start typing it out!

Hope this saves someone a few hours of googling and debugging!
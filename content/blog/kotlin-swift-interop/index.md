---
title: Kotlin Multiplatform with Swift
date: "2021-10-12"
tags: ["swift", "mobile"]
---

This week I was looking at some options for sharing code between mobile platforms. In this article I'll describe how I compiled a Kotlin multiplatform project as an iOS library linked to a real Swift project. 

This isn't like React native or Flutter where everything is shared, and it looks like the best use case for this setup is to share business logic (not UI code) across platforms. 

# Setting up the Kotlin project

I used IntelliJ IDEA to easily create a Kotlin multiplatform library. 

* File > New > Project
* On the left sidebar select Kotlin
* Project template: Mobile Library
* For this tutorial remove the "android" target
* Finish

### build.gradle.kts

This is where you can add dependencies to your project. I'll write a later article where we'll put this to use.

### Source files

`src/commonMain` is where the cross-platform functionality goes. It also has unimplemented classes that are like headers. Those are platform-specific (i.e. must be written differently for ios and android) and are implemented in the respective platform directories: 

`src/iosMain` is where the platform-specific implementations go. You have access to iOS libraries like UIKit. The "actual" keyword everywhere means it's the implementation for this platform.

We will do three things: 

## 1: Add a function that behaves the same cross-platform

Let's create a function that does the same thing on Android and iOS. We'll call it "introduceMe" (add to Greeting class in commonMain):

```kotlin
    fun introduceMe(): String{
        return "Hello, my name is testApp!"
    }
```

Note that you cannot use `println`, etc because those functions depend on platform and we are writing in `commonMain`. You can use the next strategy for that:

## 2: Add a function that behaves differently across platforms

Tell the Kotlin compiler that we are going to implement this function (add to Platform class in commonMain)
```kotlin
    fun sayHi()
```
An error appears. 

"Expected function 'sayHi' has no actual declaration in module untitled.iosMain for Native"

 We need to implement the function. Use the suggested solution in intelliJ or add this in the Platform class in iosMain: 

```kotlin
actual fun sayHi() {
    println("Hi, apple user!")
}
```

If we add more platforms like Android to the project we will create a separate implementation for each.

## 3: Compile and link with a real iOS app

Open up Xcode and create an ios app with SwiftUI.

Switch back to IntelliJ and run Tasks > build > linkDebugFrameworkIos. 

**Xcode 13 Note**
Make sure the top of build.gradle.kts looks like this if you encounter errors:
``` kotlin
plugins {
    kotlin("multiplatform") version "1.5.30"
}
```
Now instruct Xcode to link the new Kotlin library. 
Drag `build/bin/ios/debugFramework/library.framework` (yes it is a folder) from finder into Xcode in the same folder as ContentView and Assets. 

Select "Copy items if needed" and "Create groups". Ensure your target is selected. 

* Open the top level xcode project (testApp) select testApp under TARGETS.
* In General tab under "Frameworks, Libraries and Embedded Content" make sure the embed option is set to "Embed & Sign"

Compile the app. If you get an error "Library not loaded:..." make sure you did the second step.

Run the app. 

## Magic part!

Use the library:

Add 
```swift
import library
```
to ContentView.swift 

replace the content of body with: 
```swift
        Text(Greeting().greeting())
            .padding()
        Text(Greeting().introduceMe())
            .onAppear {
                Platform().sayHi()
            }
```



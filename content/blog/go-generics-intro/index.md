---
title: Go generics by example
date: "2022-03-8"
tags: ["swift", "mobile"]
---


In this article we'll explore some common generics use cases, implemented in Go.

## Requirements

First download the latest Go 1.18, at the time of writing rc1. This command works if you already have go installed. Otherwise find it online at [golang.org](https://golang.org). 

```
go install golang.org/dl/go1.18rc1@latest
```

So that you can use the new bin, Add the following line to your `.zshrc`/`.bashrc` in the home directory or whatever terminal you use. 
```
export PATH=$PATH:$HOME/go/bin
```

Then run `go1.18rc1 download`.

## Example use case: Number addition

A function to take an array of numbers and sum them.

### Go 1.18

```go
func Sum[N int64 | float64](numbers []N) N {
    var total N = 0
    for _, v := range numbers {
        total += v
    }
    return total
}
```

Go has type inference so you don't have to explicitly specify the number type parameter:
```go
func main() {
    sum := Sum([]int64{1,2,3,4,5,6,7,8,9,10})
    println(sum)
}
```

Here's the equivalent in Swift for reference:
```swift
func sum<T: Numeric>(numbers: [T]) -> T {
    var total: T = 0
    numbers.map{total+=$0} // more on this later!
    return total
}
```

## Constraints

Note the `int64 | float64`. This is Go's version of constraints. It can get repetitive at times -  What if we wanted to make a `Product`, `Average` or other functions that take all numeric types? Ideally we shouldn't put a list of number types in each. 

Go relies on the `interface` feature for this. But interfaces can only require methods, so how do we make a swift-like `Numeric` interface? Go has introduced the `|` within interfaces to make reusable type groups that don't rely on methods but are just simple lists of types. 

A `Numeric` interface which can be used as shorthand for `int | int8 | int16 ...` looks like this:

```go
type Numeric interface {
	int | int8 | int16 | int32 | int64 |
		uint | uint8 | uint16 | uint32 | uint64 |
		float32 | float64
}
```

Notice how it's just a normal constraint put inside an interface. What if you declare a typedef for int and use it in the function?

```go
type SpecialInteger int
```

It won't compile. Go has the `~` operator to allow derived types like `SpecialInteger` to satisfy a constraint:

```go
type Numeric interface {
	~int | ~int8 | ~int16 | ~int32 | ~int64 |
		~uint | ~uint8 | ~uint16 | ~uint32 | ~uint64 |
		~float32 | ~float64
}
```

We can now rewrite the function signature as:
```go
func Sum[N Numeric](numbers []N) N
```

## Map-reduce?

A popular way of transforming data in collections is to apply functions to each element using `map`. Looking back at our `Sum` example, notice how we set up a for-loop in Go, but used `.map{}` in Swift. The latter is more concise, and I use it a lot in my Swift projects. I tried to implement the same thing in Go.

Generics make this possible in Go, but my excitement was quickly dampened. I tried writing a method for `[]T` as the receiver which didn't work because you can only add methods to types in the package. So I made a generic type definition:

```go
type Slice[T] = []T
```

Note that this is not a type alias. Go would give the error: `generic type cannot be alias`. This brings us to the first issue: now anyone who wants to use our `Map` method must make the slice of type `Slice` and not the standard `[]Something`. 

Then, try to implement this and you'll run into an error along the lines of `method cannot have type parameters`. This rules out making `Map` a method - so the next option is to make it a regular function (in which case we can drop the typedef entirely):

[https://go.dev/play/p/jrIclY4KhEP?v=gotip](https://go.dev/play/p/jrIclY4KhEP?v=gotip)

```go

// this can't be a method of []T even if we made a type alias; read below
func Map[T any, O any](self []T, transform func(T) O) []O {
	var total []O = make([]O, 0)
	for _, v := range self {
		total = append(total, transform(v))
	}
	return total
}

func main() {
	original := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	transformed := Map(original, func(x int) int {
		return x + 1
	})
	_ = Map(transformed, func(x int) int {
		println(x)
		return x
	})
}

```

Since Go closures are just anonymous functions, the argument type and return types must be specified - no closure type inference. The procedural equivalent:

```go
func main() {
	original := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}

    transformed := make([]int, 0)
	for _, x := range original {
        transformed = append(transformed, x+1)
    }

    for _, x := range transformed {
        println(x)
    }

}
```

It's not that much more complicated, so the `Map` function doesn't seem worth it to me. 

## Application: Database
[https://go.dev/play/p/Di0BJlg2NHf?v=gotip](https://go.dev/play/p/Di0BJlg2NHf?v=gotip)

```go
import (
	"fmt"
	"time"
)

type Person struct {
	Name string
	Age  int
}

type Post struct {
	Title     string
	Timestamp time.Time
}

// and more types

func List[P any](tableName string) []P {
	// irl you would fetch from a database
	return []P{}
}

func main() {
	people := List[Person]("users")
    posts := List[Post]("posts")
	fmt.Printf("people: %v \n", people)
    fmt.Printf("posts: %v \n", posts)
}
```

There's only one `List` function! It's much cleaner than code generation or hand-writing `ListUsers`, `ListPosts` etc. Of course there may be specific considerations for each type when fetching from a database, but this is a general idea. 

Notice that we specified the type parameter since there's no way for Go to infer it here. 


## Final thoughts

I'm looking forward to the release of Go generics. I think it'll save a lot of boilerplate code, especially since Go doesn't support overloading. And, in typical Go fashion, we may have to adapt and use different patterns than we're used to from other languages (like error handling, and the differences I mentioned above) but I'm sure there's a reason for everything.
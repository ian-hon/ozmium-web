fn main() {
    println!("Hello, world!");

    // wolframite -> wolframite/index.html
    // wolframite/login -> wolframite/login.html
    // wolframite/signup -> wolframite/signup.html

    // "[^/]*\.[^/]*$" => "",
    // "\bwolframite\/\b(.*)?" => "/wolframite/$1.html",
    // "\bwolframite\/\b" => "/wolframite/index.html"
}


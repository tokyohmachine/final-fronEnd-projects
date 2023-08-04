// text: random quote
// authot: get random author
// new-quote: when click on the button fetch a new quote/ author and display on the text element/ author

// #tweet-quote: i can tweet the quote by clicking on the icon tweet

const myButton = document.getElementById("new-quote");
const iconTwitterButton = document.getElementById('twitter-icon');
const tweetQuote = document.getElementById('tweet-quote');
const textColor = document.getElementById('text');
const authorColor = document.getElementById('author');

var quotes = [
    "Few things can help an individual more than to place responsibility on him, and to let him know that you trust him.",
    "I am not a product of my circumstances. I am a product of my decisions.",
    "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
    "A person who never made a mistake never tried anything new.",
    "Be yourself. Everyone else is already taken.",
    "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    "So many books, so little time.",
    "A room without books is like a body without a soul.",
    "Be the change that you wish to see in the world."
]

var authors = [
        "Booker T. Washington",
        "Stephen Covey",
        "Maya Angelou",
        "Albert Einstein",
        "Oscar Wilde",
        "Albert Einstein",
        "Frank Zappa",
        "Marcus Tullius Cicero",
        "Mahatma Gandhi"
]


function getRandomQuote() {
    var index = Math.floor(Math.random() * quotes.length);
    let quote = quotes[index];
    let author = authors[index];

    document.getElementById('text').innerHTML = '<i class="fa fa-quote-left quote-mark"></i> ' + quote + ' <i class="fa fa-quote-right quote-mark"></i>';
    document.getElementById('author').innerHTML = "― " + author;
    
    setRandomColor();
};


function setRandomColor() {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);

    document.body.style.backgroundColor = "#" + randomColor;
    myButton.style.backgroundColor = "#" + randomColor;
    textColor.style.color = "#" + randomColor;
    authorColor.style.color = "#" + randomColor;
    iconTwitterButton.style.backgroundColor = "#" + randomColor;
    tweetQuote.style.backgroundColor = "#" + randomColor;
}

myButton.addEventListener('click', getRandomQuote);



getRandomQuote();





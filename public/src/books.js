//create a fuction findAuthorById that takes array of authors and id of a single author
function findAuthorById(authors, id) {
  //use the .find() to loop through authors array and search for the author where author.id === id;
  let authorById = authors.find((author) => author.id === id);
  //return author.id === id is true.
  return authorById;
}

//create a function findBookById that takes array of books and id of a single author
function findBookById(books, id) {
  //use the .find() to loop through books array and search for the book where book.id === id;
  let bookById = books.find((book) => book.id === id);
  //return book.id === id is true.
  return bookById;
}

//create function partitionBooksByBorrowedStatus takes a single parameter, an array of books.
  //return array with two arrays inside of it. The spread operator be used at the end to combine arrays by using the spread operator.

function partitionBooksByBorrowedStatus(books) {
  //use a helper function with the .every() method that will check if our condition is true within the borrow array.
  //first array should contain books that have been returned === true.
  //use .filter() to check the books array and compile a new array that meets our condition.

  let booksReturned = books.filter((book) =>
    book.borrows.every((borrow) => borrow.returned === true)
  );
  //second array should contain books returned === false.
  //use a helper function with the .some() method that will check if our condition is true within the borrow array.  If it is true
  let booksBorrowed = books.filter((book) =>
    book.borrows.some((borrow) => borrow.returned === false)
  );

  let finalArray = [[...booksBorrowed], [...booksReturned]];
  return finalArray;
}

//create a function getBorrowersForBook that takes book object and accounts array.
function getBorrowersForBook(book, accounts) {
  return (
    book.borrows
      //use the .map() to loop through the borrows array.
      .map((borrow) => {
        //use the .find() within the .map() to loop through the accounts array.
        let account = accounts.find((account) => account.id === borrow.id);
        //anonymous function as the callback function that takes in each account and finds account.id === borrow.id
        //return the spread operator that contains the output values of the map method as borrow and the account variable.
        return { ...borrow, ...account };
      })
      //use the .slice() on the output array to return only the portion of the array up to index value 10 of the returned array.

      .slice(0, 10)
  );
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

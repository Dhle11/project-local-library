//create function getTotalBooksCount that take array of books
function getTotalBooksCount(books) {
  //using .length, it will return the number of elements (book objects) in the books array
  return books.length;
}

//create function getTotalAccountsCount that take accounts array
function getTotalAccountsCount(accounts) {
  //use .length, will return the number of elements (account objects) in the accounts array
  return accounts.length;
}

//create a function getBooksBorrowedCount that take array of books
function getBooksBorrowedCount(books) {
  //const variable named booksCheckedout that filters through the books array
  const bookCheckout = books.filter(
    (book) =>
      //create an anonymous function within the book.borrow.filter method that filters through the borrows array and check for record.returned === false
      //if is true and the length is greater than zero
      book.borrows.filter((transaction) => transaction.returned === false)
        .length > 0
  );
  //return the length of the resulting array
  return bookCheckout.length;
}

function getMostCommonGenres(books) {
  //using const bookGenres as a helper function to map over book genres
  const bookGenres = books.map((book) => book.genre);
  const temp = [];
  bookGenres.map((genre) => {
    //for each genre, first check to see if genre already exists in array
    const genreLocation = temp.findIndex((element) => element.name === genre);
    //second, if it exists, increase count by 1
    if (genreLocation >= 0) {
      temp[genreLocation].count = temp[genreLocation].count + 1;
      //else, if it don't exist, push a new genre object onto array with count of 1
    } else {
      temp.push({ name: genre, count: 1 });
    }
  });
  temp.sort((a, b) => b.count - a.count);
  if (temp.length > 5) {
    return temp.slice(0, 5);
  }
  return temp;
}

//create a funtion getMostPopularBooks that take array of books
function getMostPopularBooks(books) {
  //it returns an array containing five objects or fewer that represents the most popular books in the library
  return (
    books
      .map((book) => {
        return { name: book.title, count: book.borrows.length };
      })
      //using .sort() to sort the array, if the expression true, return 1, if the expression false, return -1
      .sort((a, b) => (a.count < b.count ? 1 : -1))
      //array should only contain no more than five objects
      .slice(0, 5)
  );
}

//create a function getMostPopularAuthors that taks books and authors
function getMostPopularAuthors(books, authors) {
  //use .reduce() to get an array of objects
  const authorList = books.reduce((acc, book) => {
    //get the authorId and borrows array
    const { authorId, borrows } = book;
    //get the authorObj using find() method that will check if author.id === authorId
    const authorObj = authors.find((author) => author.id === authorId);
    //get the author name from the authorObj
    const name = `${authorObj.name.first} ${authorObj.name.last}`;
    //get the number of times this book has been borrowed
    const count = borrows.length;
    //using .find() to check if there already have an entry for this author in the accumulator
    const authExists = acc.find((auth) => auth.name === name);
    //if it is exit then add to its borrow count
    if (authExists) {
      authExists.count += count;
    } else {
      //if there is no entry for this author, then add it using .push() method
      const newAuthEntry = {
        name,
        count,
      };
      acc.push(newAuthEntry);
    }
    //finally, return the acc
    return acc;
  }, []);
  //sort in descending order by count
  const sortedAuthorList = authorList.sort((a, b) => b.count - a.count);
  //get the top five, the array should contain no more than five objects
  const topFive = sortedAuthorList.slice(0, 5);
  // and return the top five
  return topFive;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};



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

//create a funtion getMostCommonGenres that take array of books
function getMostCommonGenres(books) {
  let map = {};

//create a loop over the books array using .forEach and count the number of times each genre
books.forEach((num) => {
  //if there is a genre in the map then add 1
    if (map[num.genre]) {
      map[num.genre]++;
    } else {
      //if there isn't a genre in the map then set the key and value to one
      map[num.genre] = 1;
    }
  });
  //map the Object entries and return them with name and count
  return Object.entries(map)
    .map(([name, count]) => {
      return {
        name,
        count,
      };
    })
    //using .sort() to sort the array so the most common comes first
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

//create a funtion getMostPopularBooks that take array of books
function getMostPopularBooks(books) {
  //it returns an array containing five objects or fewer that represents the most popular books in the library
  return books
    .map((book) => {
      return { name: book.title, count: book.borrows.length };
    })
    //using .sort() to sort the array, if the expression true, return 1, if the expression false, return -1 
    .sort((a, b) => (a.count < b.count ? 1 : -1))
    //array should only contain no more than five objects
    .slice(0, 5);
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
    //finally, return the account
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

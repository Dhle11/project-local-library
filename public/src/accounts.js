//write a function findAccountById that take (accounts, id)
function findAccountById(accounts, id) {
  //assisgn accountById variable that will store the results of the .find().
  //callback function .find() that will search the accounts array to check if account.id === id.
  //compare each account id to the id parameter for strict equality.
  let accountById = accounts.find((account) => account.id === id);
  //return accountById that was true.
  return accountById;
}

//create a function sortAccountsByLastName that take an accounts array
function sortAccountsByLastName(accounts) {
  //use the .sort() method to sort the objects alphabetically.
  accounts.sort((accountA, accountB) =>
    //callback function that will compare the last name of accountA to the last name of accountB.
    //if returned is false, accountA will be moved before accountB. Otherwise return true.
    //sort a string use .toLowerCase() to compared in the same case format.
    accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  );
  //return a sorted array of objects alphabetically by last name.
  return accounts;
}

//create a function that takes account and books.
//this function will return a number that represents the number of times the account ID appears in any books borrow array.
function getTotalNumberOfBorrows(account, books) {
  let totalNumberOfBorrows = 0;
  //create a loop through the books array and then loop through the borrow array to check if the borrows id matches the account id; if this is true, add 1 to the counter variable totalNumberOfBorrows.
  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < books[i].borrows.length; j++) {
      //the two loops will continue until the end of books array.
      if (account.id === books[i].borrows[j].id) {
        totalNumberOfBorrows += 1;
      }
    }
  }
  //after done, return the value stored in the totalNumberOfBorrows.
  return totalNumberOfBorrows;
}

//create a function getBooksPossessedByAccount that takes account, books, authors
function getBooksPossessedByAccount(account, books, authors) {
  //declare a variable that will store the final result in an empty array.
  //declare a variable that will store the matching borrow object.
  let result = [];
  let borrowMatch = [];
  //loop through the books array using the .forEach and loop through the borrows array using .forEach
  books.forEach((item) => {
    //declare a variable for just the borrows object const borrowed = item.borrows.
    const borrowed = item.borrows;
    //destructure the book object.
    const book = {
      id: item.id,
      title: item.title,
      genre: item.genre,
      authorId: item.authorId,
      author: {},
      borrows: {},
    };
    const { id, title, genre, authorId, author, borrows } = book;
    //loop through borrowed array to check if borrow.id is === accountId and borrow.returned === false.

    borrowed.forEach((borrow) => {
      if (borrow.id === account.id && borrow.returned === false) {
        result.push(book);
        borrowMatch.push(borrow);
        //if is true push the book object into the result array and the borrows object to borrowsMatch array.
        book.borrows = borrowMatch;
        //use .filter to filter the authors array to return author object that id matches.
        book.author = authors.filter((auth) => auth.id === book.authorId)[0];
      }
    });
  });
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

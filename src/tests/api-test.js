// Test script for API endpoints
async function testAPI() {
  console.log('Starting API tests...\n');

  // Test Categories API
  console.log('Testing Categories API:');
  
  // GET categories
  console.log('\n1. GET categories');
  const categoriesResponse = await fetch('http://localhost:3000/api/categories');
  const categories = await categoriesResponse.json();
  console.log('Initial categories:', categories);

  // POST new category
  console.log('\n2. POST new category');
  const newCategory = {
    name: "Test Category",
    type: "expense"
  };
  const postCategoryResponse = await fetch('http://localhost:3000/api/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newCategory)
  });
  const createdCategory = await postCategoryResponse.json();
  console.log('Created category:', createdCategory);

  // PUT category
  console.log('\n3. PUT category');
  const updatedCategory = {
    id: createdCategory.id,
    name: "Updated Test Category",
    type: "income"
  };
  const putCategoryResponse = await fetch('http://localhost:3000/api/categories', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedCategory)
  });
  const updatedCategoryResult = await putCategoryResponse.json();
  console.log('Updated category:', updatedCategoryResult);

  // Test Transactions API
  console.log('\nTesting Transactions API:');
  
  // GET transactions
  console.log('\n1. GET transactions');
  const transactionsResponse = await fetch('http://localhost:3000/api/transactions');
  const transactions = await transactionsResponse.json();
  console.log('Initial transactions:', transactions);

  // POST new transaction
  console.log('\n2. POST new transaction');
  const newTransaction = {
    amount: 100,
    type: "expense",
    category: createdCategory.id,
    description: "Test transaction",
    date: new Date().toISOString()
  };
  const postTransactionResponse = await fetch('http://localhost:3000/api/transactions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTransaction)
  });
  const createdTransaction = await postTransactionResponse.json();
  console.log('Created transaction:', createdTransaction);

  // PUT transaction
  console.log('\n3. PUT transaction');
  const updatedTransaction = {
    id: createdTransaction.id,
    amount: 200,
    description: "Updated test transaction"
  };
  const putTransactionResponse = await fetch('http://localhost:3000/api/transactions', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedTransaction)
  });
  const updatedTransactionResult = await putTransactionResponse.json();
  console.log('Updated transaction:', updatedTransactionResult);

  // DELETE transaction
  console.log('\n4. DELETE transaction');
  const deleteTransactionResponse = await fetch(`http://localhost:3000/api/transactions?id=${createdTransaction.id}`, {
    method: 'DELETE'
  });
  const deleteTransactionResult = await deleteTransactionResponse.json();
  console.log('Delete transaction result:', deleteTransactionResult);

  // DELETE category (fixed URL encoding)
  console.log('\n4. DELETE category');
  const deleteCategoryUrl = new URL('http://localhost:3000/api/categories');
  deleteCategoryUrl.searchParams.append('id', createdCategory.id);
  const deleteCategoryResponse = await fetch(deleteCategoryUrl.toString(), {
    method: 'DELETE'
  });
  const deleteCategoryResult = await deleteCategoryResponse.json();
  console.log('Delete category result:', deleteCategoryResult);

  // Verify category deletion
  console.log('\n5. Verify category deletion');
  const finalCategoriesResponse = await fetch('http://localhost:3000/api/categories');
  const finalCategories = await finalCategoriesResponse.json();
  console.log('Final categories:', finalCategories);

  console.log('\nAPI tests completed!');
}

// Run the tests
testAPI().catch(console.error); 
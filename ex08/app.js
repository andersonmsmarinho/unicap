// Inicializar o Parse
Parse.initialize("xUadXc8jommt2JBDtfpzGmCCjpH817cYTVyMD647", "YkaTVmeWKEJB6tHmsvkHwUSUDMSFwGsQf0bZvz3L");
Parse.serverURL = 'https://parseapi.back4app.com/';

const Expense = Parse.Object.extend("Expense");

// Função para carregar todas as despesas
async function loadExpenses() {
    const query = new Parse.Query(Expense);
    const expenses = await query.find();
    const expensesList = document.getElementById('expensesList');
    expensesList.innerHTML = ''; // Limpar a lista antes de carregar

    let totalExpenses = 0;

    expenses.forEach(expense => {
        const tr = document.createElement('tr');
        const description = expense.get('description');
        const value = expense.get('value');
        totalExpenses += Number(value);

        tr.innerHTML = `
      <td>${description}</td>
      <td><input type="number" value="${value}" onchange="updateExpenseValue('${expense.id}', this.value)" /></td>
      <td><button onclick="deleteExpense('${expense.id}')">Deletar</button></td>
    `;
        expensesList.appendChild(tr);
    });

    document.getElementById('totalExpenses').textContent = totalExpenses.toFixed(2);
}

// Função para adicionar uma nova despesa
document.getElementById('expenseForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const description = document.getElementById('description').value;
    const value = parseFloat(document.getElementById('value').value);

    const newExpense = new Expense();
    newExpense.set('description', description);
    newExpense.set('value', value.toString());

    await newExpense.save();
    document.getElementById('expenseForm').reset();
    loadExpenses(); // Recarregar a lista de despesas
});

// Função para atualizar o valor de uma despesa
async function updateExpenseValue(expenseId, newValue) {
    const query = new Parse.Query(Expense);
    const expense = await query.get(expenseId);
    expense.set('value', parseFloat(newValue));
    await expense.save();
    loadExpenses(); // Recarregar a lista de despesas
}

// Função para deletar uma despesa
async function deleteExpense(expenseId) {
    const query = new Parse.Query(Expense);
    const expense = await query.get(expenseId);
    await expense.destroy();
    loadExpenses(); // Recarregar a lista de despesas
}

// Carregar despesas ao carregar a página
loadExpenses();

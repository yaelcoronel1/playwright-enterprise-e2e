export const transfer = {
  type: {
    personalTransfer: 'own',
    externalTransfer: 'third-party',
  },

  sourceAccount: {
    checkingAccount: 'ACC001',
    savingsAccount: 'ACC002',
  },

  destinationAccount: {
    savingsAccount: 'ACC002',
    checkingAccount: 'ACC001',
    savingsAccountText: 'Caja de Ahorro **** **** **** 5678 - $ 89.320,50',
    invalidAba: '123',
  },

  transferAmmount: {
    personalTransferAmmount: '10000',
    limitTransferAmmount: '50001',
    dailyLimitedAmmount: '40000',
  },
};

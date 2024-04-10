import { useAlertMessageStore } from '@/store/useAlertMessageStore';

import { type Account } from '@/interfaces/account.interface';

import { makeApiRequest } from '../makeApiRequest';

export const createAccount = async (account: Account) => {
  try {
    const { data } = await makeApiRequest<Account>('/accounts', 'POST', {
      name: account.name,
      type: account.type,
      balance: account.balance,
    });

    return data;
  } catch (error) {
    useAlertMessageStore
      .getState()
      .setAlert({ enabled: true, message: 'Ha ocurrido un error' });
  }
};

export const updateAccount = async (account: Account) => {
  try {
    const { data } = await makeApiRequest<Account>(
      `/accounts/${account.id}`,
      'PUT',
      {
        name: account.name,
        type: account.type,
      }
    );

    return data;
  } catch (error) {
    useAlertMessageStore
      .getState()
      .setAlert({ enabled: true, message: 'Ha ocurrido un error' });
  }
};

export const deleteAccount = async (id: string) => {
  try {
    await makeApiRequest(`/accounts/${id}`, 'DELETE');
  } catch (error) {
    useAlertMessageStore
      .getState()
      .setAlert({ enabled: true, message: 'Ha ocurrido un error' });
  }
};

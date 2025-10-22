import axios, { AxiosError } from 'axios';
import { errorMessage } from '../handleErrorMessage';

describe('handleErrorMessage', () => {
  it('deve retornar a mensagem de status da API quando disponível', () => {
    const error = new AxiosError(
      'Request failed',
      '404',
      {
        headers: new axios.AxiosHeaders(),
        method: 'get'
      },
      {},
      {
        status: 404,
        statusText: 'Not Found',
        headers: {},
        config: {
          headers: new axios.AxiosHeaders(),
          method: 'get'
        },
        data: { status_message: 'API Error Message' }
      }
    );

    expect(errorMessage(error, 'Default Message')).toBe('API Error Message');
  });

  it('deve retornar a mensagem do axios quando não há mensagem da API', () => {
    const error = new AxiosError('Network Error');
    expect(errorMessage(error, 'Default Message')).toBe('Network Error');
  });

  it('deve retornar a mensagem de um Error padrão', () => {
    const error = new Error('Standard Error');
    expect(errorMessage(error, 'Default Message')).toBe('Standard Error');
  });

  it('deve retornar a mensagem padrão quando o erro é desconhecido', () => {
    const error = 'string error';
    expect(errorMessage(error, 'Default Message')).toBe('Default Message');
  });

  it('deve retornar string vazia quando não há erro nem mensagem padrão', () => {
    expect(errorMessage(undefined)).toBe('');
  });
});
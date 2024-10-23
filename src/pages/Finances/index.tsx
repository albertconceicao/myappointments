import { useState } from 'react';

interface IClient {
  name: string;
  month: string;
  sessions: string[];
  sessionValue: number;
  email: string;
  link: string;
  phone: string; // Adicione o número de telefone do cliente aqui
}

const clientsData: IClient[] = [
  {
    name: 'Juliana',
    month: 'Outubro',
    sessions: ['03/10', '10/10', '17/10', '24/10', '31/10'],
    sessionValue: 70,
    email: 'psisandycarvalho@gmail.com',
    link: 'https://meet.google.com/xcr-kbhk-pbv',
    phone: '+5511987654321', // Número no formato internacional
  },
  {
    name: 'Albert',
    month: 'Novembro',
    sessions: ['03/10', '10/10', '17/10'],
    sessionValue: 300,
    email: 'psisandycarvalho@gmail.com',
    link: 'https://meet.google.com/xcr-kbhk-pbv',
    phone: '+5511987654321', // Número no formato internacional
  },
  // Outros clientes aqui
];

export function Finances() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleSendMessage = async (client: IClient) => {
    setLoading(true);
    const totalValue = client.sessions.length * client.sessionValue;

    const customMessage = `Olá ${client.name},

Gostaria de informar os detalhes referentes às suas sessões de terapia para o mês de ${
      client.month
    }:
Serão ${
      client.sessions.length
    } sessões, com datas agendadas para: ${client.sessions.join(', ')}.
Cada sessão tem o valor de R$${client.sessionValue.toFixed(2)}.
Total a ser pago: R$${totalValue.toFixed(2)}.

O pagamento deve ser realizado até hoje, 10º dia do mês, conforme combinado.

Você pode efetuar o pagamento via Pix utilizando o seguinte endereço de e-mail: ${
      client.email
    }

Segue o link para nossa sessão agendada: ${client.link}.

Atenciosamente,
Sandy`;

    setMessage(customMessage);

    try {
      const response = await fetch('http://localhost:5000/send-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: client.phone,
          message: customMessage,
        }),
      });

      const result = await response.json();
      if (result.status === 'success') {
        setStatus('Mensagem enviada com sucesso!');
      } else {
        setStatus(`Erro ao enviar mensagem: ${result.message}`);
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setStatus('Erro ao enviar mensagem');
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Enviar mensagens no WhatsApp</h2>
      {clientsData.map((client) => (
        <div key={client.name} style={{ marginBottom: '20px' }}>
          <h3>{client.name}</h3>
          <button
            type="button"
            onClick={() => handleSendMessage(client)}
            disabled={loading}
          >
            {loading ? 'Enviando...' : `Enviar Mensagem para ${client.name}`}
          </button>
        </div>
      ))}
      {status && <p>{status}</p>}
      <pre>{message}</pre>
    </div>
  );
}

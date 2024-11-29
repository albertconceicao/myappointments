import html2pdf from 'html2pdf.js';
import { useState } from 'react';

import Button from '../Button'; // Botão estilizado da sua estrutura

import {
  Container,
  FormContainer,
  ReceiptBody,
  ReceiptContainer,
  ReceiptFooter,
  ReceiptHeader,
  ReportDateAndCity,
  ReportDescription,
  ReportHighlight,
  SectionInfo,
  SectionTitle,
} from './styles';

interface ISession {
  date: string;
  value: number;
}

export default function GenerateReceipt() {
  const [clientName, setClientName] = useState('');
  const [sessions, setSessions] = useState<ISession[]>([
    { date: '', value: 0 },
  ]);
  const [total, setTotal] = useState(0);

  const handleAddSession = () => {
    setSessions([...sessions, { date: '', value: 0 }]);
  };
  const updateTotal = (updatedSessions = sessions) => {
    const totalValue = updatedSessions.reduce(
      (sum, session) => sum + session.value,
      0,
    );
    setTotal(totalValue);
  };
  const handleRemoveSession = (index: number) => {
    setSessions(sessions.filter((_, i) => i !== index));
    updateTotal();
  };

  const handleSessionChange = (
    index: number,
    field: keyof ISession,
    value: string | number,
  ) => {
    const updatedSessions = sessions.map((session, i) =>
      i === index ? { ...session, [field]: value } : session,
    );
    setSessions(updatedSessions);
    updateTotal(updatedSessions);
  };

  const handleGeneratePDF = () => {
    const element = document.getElementById('receipt');
    if (element) {
      html2pdf().from(element).save('recibo.pdf');
    }
  };

  return (
    <Container>
      <h1>Gerar Recibo Psicológico</h1>
      <FormContainer>
        <label>
          Nome do Cliente:
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </label>

        <h2>Sessões</h2>
        {sessions.map((session, index) => (
          <div key={index}>
            <label>
              Data:
              <input
                type="date"
                value={session.date}
                onChange={(e) =>
                  handleSessionChange(index, 'date', e.target.value)
                }
              />
            </label>
            <label>
              Valor (R$):
              <input
                type="number"
                step="0.01"
                value={session.value}
                onChange={(e) =>
                  handleSessionChange(
                    index,
                    'value',
                    parseFloat(e.target.value) || 0,
                  )
                }
              />
            </label>
            <Button
              type="button"
              danger
              onClick={() => handleRemoveSession(index)}
            >
              Remover
            </Button>
          </div>
        ))}
        <Button type="button" onClick={handleAddSession}>
          Adicionar Sessão
        </Button>

        <h3>Total: R$ {total.toFixed(2)}</h3>
        <Button type="button" onClick={handleGeneratePDF}>
          Gerar PDF
        </Button>
      </FormContainer>

      <ReceiptContainer id="receipt">
        <ReceiptHeader>
          <img src="/logo.png" alt="Logo" />
          <h1>Consultório Psicológico</h1>
        </ReceiptHeader>
        <ReceiptBody>
          <h2>Recibo de Prestação de Serviços Psicológicos</h2>

          <SectionInfo>
            <SectionTitle>Dados do Psicólogo</SectionTitle>
            <p>Sandy Nunes Carvalho Conceição</p>
            <p>Psicóloga - CRP 03/27277</p>
            <p>CPF: 857.786.395-62</p>
            <p>Número de membro: 001-8734-282A</p>
          </SectionInfo>
          <SectionInfo>
            <SectionTitle>Dados bancários</SectionTitle>
            <p>Banco: 0260</p>
            <p>Agência: 0001</p>
            <p>Conta: 73064645-1</p>
          </SectionInfo>
          <SectionInfo>
            <SectionTitle>Paciente/cliente</SectionTitle>
            <p>
              <strong>Cliente:</strong> {clientName || '---'}
            </p>
          </SectionInfo>

          <ReportHighlight>
            <h2>Descrição dos serviços prestados</h2>
          </ReportHighlight>
          <ReportDescription>
            <p>
              <strong>
                Consultas psicológicas, com duração de 50 minutos, realizadas na
                datas de:
              </strong>
            </p>
            <ul>
              {sessions.map((session, index) => (
                <li key={index}>
                  {session.date || '---'} - R$ {session.value.toFixed(2)}
                </li>
              ))}
            </ul>
          </ReportDescription>
          <ReportHighlight>
            <h2>Total: R$ {total.toFixed(2)}</h2>
          </ReportHighlight>

          <ReportDateAndCity>
            Camaçari, BA, {new Date().toLocaleDateString('BR')}
          </ReportDateAndCity>
          <p>Assinado por Sandy Carvalho - CRP 03/27277</p>
        </ReceiptBody>
        <ReceiptFooter>
          <p>
            Este recibo comprova a prestação de serviços psicológicos conforme a
            Lei Federal nº 4.119/62.
          </p>
        </ReceiptFooter>
      </ReceiptContainer>
    </Container>
  );
}

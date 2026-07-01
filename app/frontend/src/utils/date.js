export function parseLocalDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value ?? ''));
  if (!match) return null;

  const [, yearText, monthText, dayText] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year
    || date.getMonth() !== month - 1
    || date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

function parseRecordDate(record) {
  const data = parseLocalDate(record?.data);
  if (data) return data;

  const fallback = new Date(record?.registradoEm ?? record?.createdAt ?? '');
  return Number.isNaN(fallback.getTime()) ? null : fallback;
}

export function isDataInicialPosterior(dataInicio, dataFim) {
  const inicio = parseLocalDate(dataInicio);
  const fim = parseLocalDate(dataFim);

  if (!inicio || !fim) return false;

  return inicio.getTime() > fim.getTime();
}

export function filtrarHistoricoPorPeriodo(registros, dataInicio, dataFim) {
  const inicio = parseLocalDate(dataInicio);
  const fim = parseLocalDate(dataFim);

  if (!inicio && !fim) return registros;

  if (inicio) inicio.setHours(0, 0, 0, 0);
  if (fim) fim.setHours(23, 59, 59, 999);

  return registros.filter((registro) => {
    const dataRegistro = parseRecordDate(registro);
    if (!dataRegistro) return false;

    if (inicio && dataRegistro < inicio) return false;
    if (fim && dataRegistro > fim) return false;

    return true;
  });
}

export function calcularIdade(dataNascimento, hoje = new Date()) {
  const nascimento = parseLocalDate(dataNascimento);
  if (!(hoje instanceof Date) || Number.isNaN(hoje.getTime())) return '\u2014';
  if (!nascimento || nascimento > hoje) return '\u2014';

  let anos = hoje.getFullYear() - nascimento.getFullYear();
  const passouAniversario =
    hoje.getMonth() > nascimento.getMonth()
    || (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() >= nascimento.getDate());

  if (!passouAniversario) anos--;
  return `${anos} anos`;
}

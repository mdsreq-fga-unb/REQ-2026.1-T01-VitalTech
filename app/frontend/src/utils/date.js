function parseLocalDate(value) {
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

export default class Utils {
  //método para aplicar máscaras dinâmicas nos elementos
  //Exemplo: data = 123456789 e mask = ### ### ###
  // result -> 123 456 789
  static maskForm(data: string, mask: string): string {
    const cleanedData = data.replace(/[.\-\/]/g, "");
    let maskedData = mask;
    for (const char of cleanedData) {
      maskedData = maskedData.replace("#", char);
    }
    return maskedData;
  }

  static formatCPF(cpf: string | undefined): string | undefined {
    if (!cpf) return;
    const cpfLimpo = cpf.replace(/\D/g, "");
    return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
  static formatDate = (dateString: string | undefined) => {
    if (!dateString) return;
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };
}

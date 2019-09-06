import xlsx from 'xlsx';
import FileSaver from 'file-saver';

function toOctet(file) {
  const buffer = new ArrayBuffer(file.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < file.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    view[i] = file.charCodeAt(i) & 0xff;
  }
  return buffer;
}

export default {
  priceToExcel(jsonData, filename) {
    const workbook = xlsx.utils.book_new();
    const rows = [['ID', 'Наименование', 'Цена']];
    jsonData.forEach((element) => {
      rows.push([
        element.id,
        element.name,
        element.prices.length ? element.prices[0].value : 0,
      ]);
    });
    console.log(rows);
    const sheet = xlsx.utils.aoa_to_sheet(rows);
    xlsx.utils.book_append_sheet(workbook, sheet, filename);
    const file = xlsx.write(workbook, { bookType: 'xlsx', bookSST: true, type: 'binary' });
    FileSaver.saveAs(new Blob([toOctet(file)], { type: 'application/octet-stream' }), `${filename}.xlsx`);
  },
  excelToPrice(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: 'binary' });
        workbook.SheetNames.forEach((sheetName) => {
          const objects = xlsx.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
          // const json = JSON.stringify(object);
          resolve(objects.map(element => ({
            productId: element.ID,
            value: element['Цена'],
          })));
        });
      };
      reader.onerror = ex => reject(ex);
      reader.readAsBinaryString(file);
    });
  },
};

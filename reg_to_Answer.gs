function prepareAnswer(){
const docFile = DriveApp.getFileById('ЗДЕСЬ УКАЖИТЕ ID ФАЙЛА С ШАБЛОНОМ');
const docFolder = DriveApp.getFolderById('ЗДЕСЬ УКАЖИТЕ ID ПАПКИ С ШАБЛОНОМ');
const pdfFolder = DriveApp.getFolderById ('ЗДЕСЬ УКАЖИТЕ ID ПАПКИ В КОТОРУЮ БУДТ СОХРАНЕН ПДФ');
const currentSheet = SpreadsheetApp.openById('ЗДЕСЬ УКАЖИТЕ ID ТАБЛИЦЫ').getSheetByName('ЗДЕСЬ УКАЖИТЕ НАЗВАНИЕ ЛИСТА В ТАБЛИЦЕ');

let lr = currentSheet.getLastRow();
let data = currentSheet.getRange(2, 1, lr-1, 5).getDisplayValues();

data.forEach(row => {
if (row[0] == 'TRUE'){
createPDF(
row[1], //фио
row[2], //адрес
row[3], //дата договора
row[4], //номер договора
`Ответ на претензию ${row[1]}`, docFile, docFolder, pdfFolder)
}})

}

function createPDF(name, address, date, number,    
                   pdfName, docFile, docFolder, pdfFolder){                   
let tempFile = docFile.makeCopy(docFolder);
let tempDocFile = DocumentApp.openById(tempFile.getId());
let body = tempDocFile.getBody();
//номер и дата договора
    body.replaceText("{КОМУ}", name);
    body.replaceText("{КУДА}", address);
    body.replaceText("{ДАТА ДОГОВОРА}", date);
    body.replaceText("{НОМЕР ДОГОВОРА}", number);
    
tempDocFile.setName(pdfName).saveAndClose();
let docUrl = tempDocFile.getUrl()
let pdfContentBlob = tempFile.getAs(MimeType.PDF);
pdfFolder.createFile(pdfContentBlob).setName(pdfName);

return docUrl
}

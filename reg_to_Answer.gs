function prepareAnswer(){
const docFile = DriveApp.getFileById('ЗДЕСЬ УКАЖИТЕ ID ФАЙЛА С ШАБЛОНОМ');
const docFolder = DriveApp.getFolderById('ЗДЕСЬ УКАЖИТЕ ID ПАПКИ С ШАБЛОНОМ');
const pdfFolder = DriveApp.getFolderById ('ЗДЕСЬ УКАЖИТЕ ID ПАПКИ В КОТОРУЮ БУДТ СОХРАНЕН ПДФ');
const currentSheet = SpreadsheetApp.openById('ЗДЕСЬ УКАЖИТЕ ID ТАБЛИЦЫ').getSheetByName('ЗДЕСЬ УКАЖИТЕ НАЗВАНИЕ ЛИСТА В ТАБЛИЦЕ');

let lr = currentSheet.getLastRow();
let data = currentSheet.getRange(2, 1, lr-1, 5).getDisplayValues();

let lr = currentSheet.getLastRow();
let lc = currentSheet.getLastColumn()

let data = currentSheet.getRange(2, 1, lr-1, lc).getDisplayValues();

data.forEach(row => {
if (row[0] == 'TRUE'){
createPDF(
row[1], //фио
row[2], //адрес
row[3], //номер договора
row[4], //дата договора
row[5], //наименование организации
row[6], //фио директора
`Ответ на претензию ${row[1]}`, docFile, docFolder, pdfFolder)
}})

}

function createPDF(name, address, number, date, organization_name, dir_name,   
                   pdfName, docFile, docFolder, pdfFolder){                   
let tempFile = docFile.makeCopy(docFolder);
let tempDocFile = DocumentApp.openById(tempFile.getId());
let body = tempDocFile.getBody();
//номер и дата договора
    body.replaceText("{КОМУ}", name);
    body.replaceText("{КУДА}", address);
    body.replaceText("{НОМЕР ДОГОВОРА}", number);
    body.replaceText("{ДАТА ДОГОВОРА}", date);
    body.replaceText("{ОРГАНИЗАЦИЯ}", organization_name);
    body.replaceText("{ФИО ДИРЕКТОРА}", dir_name);
    
tempDocFile.setName(pdfName).saveAndClose();
let docUrl = tempDocFile.getUrl()
let pdfContentBlob = tempFile.getAs(MimeType.PDF);
pdfFolder.createFile(pdfContentBlob).setName(pdfName);

return docUrl
}

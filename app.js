'use strict'

const fileInput = document.getElementById("file");
const reader = new FileReader();

fileInput.onchange = () => {
  const myFile = fileInput.files[0];
  reader.readAsText(myFile);
}

reader.onload = function() {
  const fileContent = reader.result;
  const recordsArray = createRecords(fileContent);
  const filteredRecords = filterRecords(recordsArray);
  createTable(filteredRecords);
};

//===============================================//

function createRecords(content){
  let records = content.split("\n").map((record, i) => {
    if(i < 4){
      return record;
    }
    let glicose = parseInt(record.split("\t")[4]);
    let hour = record.split("\t")[0].split(":")[0].split(" ")[1];
    let minute = record.split("\t")[0].split(":")[1];
    let day = record.split(" ")[0].split("/")[0];
    let month = record.split(" ")[0].split("/")[1];
    let year = record.split(" ")[0].split("/")[2];
    return {
      day,
      month,
      year,
      hour,
      minute,
      glicose
    }
  });
 return records;
}

//===============================================//

function filterRecords(records){
  const yearL = records[records.length - 2].year;
  const monthL = records[records.length - 2].month;
  const dayL = records[records.length - 2].day;

  const lastRecordDate = yearL*365 + monthL*30 + parseInt(dayL);

  const filteredRecords = records.filter(record => {
    const year = record.year;
    const month = record.month;
    const day = record.day;

    const dayNumber = year*365 + month*30 + parseInt(day);

    if (lastRecordDate - dayNumber <= 100){
      return true;
    }
    return false;
  });
  return filteredRecords;
}

//===============================================//

function createTable(filteredRecords) {

  const tbodyGlico = document.getElementById('tbodyGlico');

  filteredRecords.forEach(record => {
    const tr = document.createElement("tr");

    const date = document.createElement("td");
    const time = document.createElement("td");
    const glicose = document.createElement("td");

    date.innerHTML = `${record.day}/${record.month}/${record.year}`;
    time.innerHTML = `${record.hour}:${record.minute}`;
    glicose.innerHTML = `${record.glicose}`

    tr.appendChild(date);
    tr.appendChild(time);
    tr.appendChild(glicose);

    tbodyGlico.appendChild(tr);
  });

}
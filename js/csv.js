import parse from 'csv-parse';

export default function readCsv(url, callback) {
  const xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState === XMLHttpRequest.DONE) {
      if (xmlhttp.status === 200) {
        parse(xmlhttp.responseText, { delimiter: ',', columns: true, comment: '#' }, callback);
      } else {
        console.log('There was an error, status ' + xmlhttp.status);
      }
    }
  };

  xmlhttp.open('GET', url, true);
  xmlhttp.send();
}

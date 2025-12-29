import Papa from "papaparse";

const SPREADSHEET_ID = "1wRGEy08SetNLPOkpJ9z6SMDNs2-f7-wA_g1_qpj9e1k";

//build a CSV link
function buildCsvUrl(sheetName) {
  return `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(
    sheetName
  )}`;
}

// fetch + parse and return
export async function fetchSheetRows(sheetName) {
  const url = buildCsvUrl(sheetName);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Fetch failed: ${response.status}`);
  }

  const csvText = await response.text();

  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  return parsed.data; // array of row objects
}


function convertArrayOfObjectsToCSV(array) {
  let csv = "";
  // Extracting the headers from the first object
  const headers = Object.keys(array[0]);
  // Adding headers to the CSV string
  csv += headers.join(",") + "\n";

  // Loop through each object in the array
  array.forEach((obj) => {
    // Extract values for each header
    const values = headers.map((header) => {
      // Ensure proper CSV formatting, escaping special characters and enclosing in double quotes if necessary
      let value = obj[header];
      if (typeof value === "string") {
        value = '"' + value.replace(/"/g, '""') + '"';
      }
      return value;
    });
    // Adding values to the CSV string
    csv += values.join(",") + "\n";
  });

  return csv;
}

// Downloading the CSV file
function downloadCSV(csvContent, fileName) {
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

// Example usage: Downloading the CSV file

export default { downloadCSV, convertArrayOfObjectsToCSV };

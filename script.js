async function checkPoints() {
    const email = document.getElementById('userEmail').value.toLowerCase().trim();
    const resultDiv = document.getElementById('result');

    if (!email) {
        resultDiv.innerHTML = 'Please enter your ID.';
        return;
    }

    // URL to the published CSV data
    const csvUrl = 'https://docs.google.com/spreadsheets/d/18i3CY-gT2nmUkSW_2-XCPcrNWfTZj5EBxO4J_mLtKtY/export?format=csv';

    try {
        const response = await fetch(csvUrl);
        const csvText = await response.text();
        
        // Parse CSV text
        const rows = csvText.split('\n');
        const data = rows.map(row => row.split(','));

        let userFound = false;
        let totalHours = 0;

        // Skip header row
        for (let i = 1; i < data.length; i++) {
            const row = data[i];
            const idFromSheet = row[1].toLowerCase().trim(); // ID from column B (index 1)
            const hoursFromSheet = parseFloat(row[7]) || 0; // Total hours from column G (index 6)

            if (idFromSheet === email) {
                totalHours = hoursFromSheet;
                userFound = true;
                break;
            }
        }

        if (userFound) {
            resultDiv.innerHTML = `Your Total Hours: ${totalHours}`;
        } else {
            resultDiv.innerHTML = 'ID not found.';
        }
    } catch (error) {
        resultDiv.innerHTML = 'Error fetching data. Please contact Kenny for assistance.';
        console.error('Error:', error);
    }
}

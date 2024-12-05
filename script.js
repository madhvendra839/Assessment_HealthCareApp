// script.js

document.addEventListener("DOMContentLoaded", async () => {
    const patientId = "Jessica Taylor";
    const apiUrl = "https://documenter.getpostman.com/view/11861104/2sA35G42ve"; // Example URL; adjust based on API documentation.

    try {
        // Fetch patient data
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Filter data for Jessica Taylor
        const patient = data.patients.find(p => p.name === patientId);

        if (patient) {
            // Display patient info
            const infoDiv = document.getElementById("info");
            infoDiv.innerHTML = `
                <p><strong>Name:</strong> ${patient.name}</p>
                <p><strong>Age:</strong> ${patient.age}</p>
                <p><strong>Address:</strong> ${patient.address}</p>
            `;

            // Display blood pressure chart
            const ctx = document.getElementById("bpChart").getContext("2d");
            const bpChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: patient.bloodPressure.map(bp => bp.year),
                    datasets: [{
                        label: "Blood Pressure",
                        data: patient.bloodPressure.map(bp => bp.value),
                        borderColor: "rgba(75, 192, 192, 1)",
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        borderWidth: 2,
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Year"
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Blood Pressure"
                            }
                        }
                    }
                }
            });
        } else {
            alert("Jessica Taylor's data not found!");
        }
    } catch (error) {
        console.error("Error fetching patient data:", error);
    }
});

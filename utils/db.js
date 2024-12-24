const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const MONGODB_URI = "mongodb+srv://imvpankaj:6Z2dYH80m7KjnNJU@cluster0.t3opa.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";

// Create a schema for the Job model
const jobSchema = new mongoose.Schema({
    jobId: Number,
    title: String,
    company: String,
    location: String,
    jobLink: String,
    employmentType: String,
    experience: String,
    source: String,
    country: String,
    postedDateTime: Object,
    companyImageUrl: Object,
    minExp: Number,
    maxExp: Number,
});

// Create the Job model
const Job = mongoose.model("Job", jobSchema);

// Function to import data
const importData = async () => {
    try {
        // Connect to MongoDB (test database)
        await mongoose.connect(MONGODB_URI, {
            dbName: "test",  // Specify the database name as 'test'
        });
        console.log("Connected to MongoDB");

        // Read job data from JSON file
        const filePath = path.resolve("./jobdata.json");
        const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        // Insert data into the jobs collection
        await Job.insertMany(jsonData);
        console.log("Data successfully imported!");

        // Close the connection after inserting the data
        mongoose.connection.close();
    } catch (error) {
        console.error("Error importing data:", error);
        mongoose.connection.close();
    }
};

// Call the importData function to populate the database
importData();

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const MONGODB_URI = "mongodb+srv://imvpankaj:6Z2dYH80m7KjnNJU@cluster0.t3opa.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";

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

const Job = mongoose.model("Job", jobSchema);


const importData = async () => {
    try {

        await mongoose.connect(MONGODB_URI, {
            dbName: "test", 
        });
        console.log("Connected to MongoDB");

        const filePath = path.resolve("./jobdata.json");
        const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        await Job.insertMany(jsonData);
        console.log("Data successfully imported!");

        mongoose.connection.close();
    } catch (error) {
        console.error("Error importing data:", error);
        mongoose.connection.close();
    }
};

importData();

const pool = require('../db');
const mysql = pool.promise();
const redisClient = require("../redis");
const submit = async (req, res) => {
    const { username, language, code, stdin } = req.body;
    const timestamp = new Date();
    const time = timestamp.toISOString().slice(0, 19).replace("T", " ");;
    const query = "INSERT INTO submissions (username, language, code, stdin, time) VALUES (?,?,?,?,?)";
    try {
        const response = await mysql.query(query, [username, language, code, stdin, time]);
        res.status(200).send("Submitted Successfully");

        const redisKey = "Submissions";
        const cachedData = await redisClient.GET(redisKey);

        if (cachedData) {
            const previousData = JSON.parse(cachedData);
            const newData = {
              username,
              language,
              stdin,
              code,
            //   output,
              time,
            };
            previousData.push(newData);
            const updatedDataString = JSON.stringify(previousData);
            redisClient.SETEX(redisKey, 3600, updatedDataString);
            console.log("cached data updated");
          }
    }
    catch (err) {
        console.error("Error Submitting: ", err);
        res.status(500).send("Error Submitting");
    }
}

const getSubmissions = async (req, res) => {
    const redisKey = "Submissions";
    try {
        const cachedData = await redisClient.GET(redisKey);
        if (cachedData) {
            const submissions = JSON.parse(cachedData);
            res.status(200).json(submissions);
        }
        else {
            const query = "SELECT * FROM submissions";
            try {
                const [submissions] = await mysql.query(query);
                res.status(200).json(submissions);
                redisClient.SETEX(redisKey, 3600, JSON.stringify(submissions));
            }
            catch (err) {
                console.error("Error fetching submissions: ", err);
                res.status(500).send("Error fetching submissions");
            }
        }
    }
    catch (err) {
        console.error("Error Fetching: ", err);
        res.status(500).send("Error Fetching");
    }
}

module.exports = { submit, getSubmissions };

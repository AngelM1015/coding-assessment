const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const data = require('./seed.json');
const PAGE_SIZE = 50;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/apps", (req, res) => {
    try {
        if (!req.body.range)
            return res.status(400).send(`"range" is a required parameter.`);

        if (!req.body.range.by)
            return res.status(400).send(`"by" is a required parameter.\nPossible values are "id" or "name".`);

        let by = req.body.range && req.body.range.by || "id";
        let max = req.body.range && req.body.range.max && parseInt(req.body.range.max) || PAGE_SIZE;
        let order = req.body.range && req.body.range.order || "asc";

        if(max > PAGE_SIZE)
            max = PAGE_SIZE;

        let sorted = [];
        let results = [];
        if (by === "id") {
            let start = req.body.range && req.body.range.start && parseInt(req.body.range.start) || 0;
            let end = req.body.range && req.body.range.end || PAGE_SIZE;
            if(start > end) {
                sorted = [];
            }
            else {
                let startIdx = data.findIndex(k => k.id === start);
                let endIdx = data.findIndex(k => k.id === end);
                
                endIdx += 1;

                results = data.slice(startIdx, endIdx);
                if(max < results.length)
                    results = results.slice(0, max);

                sorted = results.sort((a, b) => order === "asc" ? a.id - b.id : b.id - a.id);
            }
        }
        else if (by === "name") {
            let start = req.body.range && req.body.range.start;
            let end = req.body.range && req.body.range.end;

            let startIdx = data.findIndex(k => k.name === start);
            let endIdx = data.findIndex(k => k.name === end);

            endIdx += 1;

            results = data.slice(startIdx, endIdx);
            if(max < results.length)
                results = results.slice(0, max);

            sorted = results.sort((a, b) => order === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
        }

        res.status(200).send(sorted) && console.log("Completed");
    }
    catch (ex) {
        res.status(500).send(ex.message);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started @ ${port}`));

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//file upload middleware
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
}));

const db = require("./config/database");
db.connect();

//connecting with the cloud
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//route import and mount
const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload",Upload);

//activation
app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
})
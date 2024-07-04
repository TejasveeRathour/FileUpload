const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//localfileUpload -> handler function

exports.localFileUpload = async (req, res) => {
    try{
        //fetch file from request
        const file = req.files.file;
        console.log(file); //fetched file

        //create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("Path -> ", path);

        //add path to the move function
        file.mv(path, (err) => {
            console.log(err);
        });

        res.json(
            {
                success: true,
                message: "Local File Uploaded Successfully",
            }
        );
    }
    catch(error){
        console.log(error);
    }
}

//function for check the file type is supported or not
function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

//function for uploading image
async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder};
    console.log("temp file path", file.tempFilePath);

    //reduce the size using quality attribute
    if(quality) {
        options.quality = quality;
    }

    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload handler
exports.imageUpload = async (req, res) => {
    try{
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg","jpeg","png"]; 
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json(
                {
                    success: false,
                    message: "File format not supported",
                }
            );
        }

        //if file format supported then
        const response = await uploadFileToCloudinary(file, "Codehelp", 30);
        console.log(response);

        //save entry inside the database
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json(
            {
                success: true,
                imageUrl: response.secure_url,
                message: "Image Successfully Uploaded",
            }
        );
    }
    catch(error){
        console.error(error);
        res.status(400).json(
            {
                success: false,
                message: "Something went wrong",
            }
        );
    }
}

//video upload handler
exports.videoUpload = async (req, res) => {
    try{
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;
        
        //validation
        const supportedTypes = ["mp4","mov"]; 
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type: ", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json(
                {
                    success: false,
                    message: "File format not supported",
                }
            );
        }

        //if file format supported then
        const response = await uploadFileToCloudinary(file, "Codehelp");
        console.log(response);

        //save entry inside the database
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json(
            {
                success: true,
                imageUrl: response.secure_url,
                message: "Video Successfully Uploaded",
            }
        );
    }
    catch(error){
        console.error(error);
        res.status(400).json(
            {
                success: false,
                message: "Something went wrong",
            }
        );
    }
}

exports.imageSizeReducer = async (req, res) => {
    try{
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg","jpeg","png"]; 
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json(
                {
                    success: false,
                    message: "File format not supported",
                }
            );
        }

        //if file format supported then
        console.log("Uploading to Codehelp");
        const response = await uploadFileToCloudinary(file, "Codehelp");
        console.log(response);

        //save entry inside the database
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json(
            {
                success: true,
                imageUrl: response.secure_url,
                message: "Image Successfully Uploaded",
            }
        );
    }
    catch(error){
        console.error(error);
        res.status(400).json(
            {
                success: false,
                message: "Something went wrong",
            }
        );
    }
}
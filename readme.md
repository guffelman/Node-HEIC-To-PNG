# HEIC to PNG Converter

This project is a simple tool for converting HEIC images to PNG format. It includes a web server that accepts HEIC images via a POST request and returns the converted PNG images, as well as a script for converting all HEIC images in a local directory.

## Installation

Before running the project, install the necessary packages by running `npm install` in your terminal.

## Usage

### Web Server

To start the web server, run `node app.js` in your terminal. The server will start on `http://localhost:3000`.

To convert images, send a POST request to `http://localhost:3000/api/convert` with the images included as form data. The server will return the first converted image as a response.

### Local Directory

To convert all HEIC images in a local directory, run `node app-multiple.js` in your terminal. The script will convert all HEIC images in the input directory and save the converted PNG images in the output directory.

## Configuration

You can configure the input and output directories for the local directory script by modifying the `inputDir` and `outputDir` variables in `app-multiple.js`.

## Dependencies

This project uses the following npm packages:

- `express`: A web application framework for Node.js.
- `multer`: A middleware for handling `multipart/form-data`, which is primarily used for uploading files.
- `heic-convert`: A library for converting HEIC images to other formats.



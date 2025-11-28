import inquirer from 'inquirer';
import qr from "qr-image";
import fs from "fs";


inquirer
    .prompt([
        {
            type: "input",
            name: "URL",
            message: "Enter the URL of the website: "
        }
    ])
    .then((answers) => {
        const url = answers.URL;
        // console.log(url);
        let qr_svg = qr.image(url);
        qr_svg.pipe(fs.createWriteStream('My-Qr2.png'));
        fs.writeFile("./Data2.txt", url, (err) => {
            if (err) throw err;
            console.log("Done");
        })
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log(error)
        } else {
            console.log("Step 1 Done.");
        }
    });

/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
/**
 * Checkbox list examples
 */


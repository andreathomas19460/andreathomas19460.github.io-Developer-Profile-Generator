
const inquirer = require("inquirer");
const generatePdf = require('./generatePdf').generatePdf;
const userProfile = require('./userProfile.js').userProfile;

colorChoice = () => {
  inquirer
    .prompt([
      {
        type:"list",
        message:"Select a color!",
        name:"color",
        choices: ["red", "pink", "blue","green"]
      },
      {
        type:"input",
        message:"Enter your GitHub username",
        name:"githubUsername",
      }
    ])
    .then(answers => {
      userProfile(answers, generatePdf);
  })
}

module.exports.colorChoice = colorChoice
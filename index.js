

const fs = require('fs');
const axios = require('axios');
const inquirer = require('inquirer');
const util = require('util');
const puppeteer = require('puppeteer');
const generateHTML = require('./generateHTML');
const writeFileAsync = util.promisify(fs.writeFile);

let img = '';
let location = '';
let gitProfile = '';
let userBio = '';
let repoNum = 0;
let followersNum = 0;
let followingNum = 0;
let starNum = 0;
let color = '';


function init() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What is your GitHub username?',
        name: 'username'
      },
      {
        type: 'input',
        message:
          'Select a background color: green/red/pink/blue',
        name: 'color'
      }
    ])
    .then(function({ username, color }) {
     
      const config = {
        headers: {
          accept: 'application/json'
        }
      };

    
      let queryUrl = `https://api.github.com/users/${username}`;

      return axios.get(queryUrl, config).then(userData => {
        let newUrl = `https://api.github.com/users/${username}/starred`;

        axios.get(newUrl, config).then(starredRepos => {
          data = {
            img: userData.data.avatar_url,
            location: userData.data.location,
            gitProfile: userData.data.html_url,
            userBio: userData.data.bio,
            repoNum: userData.data.public_repos,
            followersNum: userData.data.followers,
            followingNum: userData.data.following,
            starNum: starredRepos.data.length,
            username: username,
            color: color
          };
          console.log(data);
      
          generateHTML(data);
          creatHTML(generateHTML(data));
          generatePDF(username);
        });
      });
    });
}

const creatHTML = function(generateHTML) {
  writeFileAsync('index.html', generateHTML);
};

init();


async function generatePDF(username) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

   
    await page.goto(
      'C:/Users/andre-vely0h2/UW-Code-Boot-Camp/Homework/HW9/andreathomas19460.github.io-Developer-Profile-Generator/index.html'
    );
    await page.emulateMediaType('screen');

  
    await page.pdf({
      path: `${username}.pdf`,
      format: 'Letter',
      printBackground: true,
      landscape: true
    });
    console.log('Done');

    await browser.close();
  } catch (err) {
    console.log('Error');
  }
}


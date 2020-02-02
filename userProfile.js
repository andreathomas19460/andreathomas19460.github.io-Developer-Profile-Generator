const axios = require('axios');

async function userProfile(answers, generatePdf){
  const response1 = await axios(`https://api.github.com/users/${answers.githubName}`);
  let gitHubInfo = {
    name: response1.data.name,
    location: response1.data.location,
    followers: response1.data.followers,
    following: response1.data.following,
    bio: response1.data.bio,
    html_url: response1.data.html_url,
    blog: response1.data.blog,
    location: response1.data.location,
    public_repos: response1.data.public_repos,
    avatar_url: response1.data.avatar_url,
    company: response1.data.company
  } 
  const response2 = await axios(`https://api.github.com/users/${answers.githubName}/starred`);
  gitHubInfo.starred = Object.keys(response2.data).length;
    generatePdf(answers, gitHubInfo);
}

module.exports.userProfile = userProfile;
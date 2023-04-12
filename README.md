ReadME File

Install Storybook Deployer with:

npm i @storybook/storybook-deployer --save-dev

Then add a NPM script like this for github page:
{
  "scripts": {
    "deploy-storybook": "storybook-to-ghpages"
  }
}

Then you can run => npm run deploy-storybook to deploy the Storybook.
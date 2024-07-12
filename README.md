# Personal portfolio
It is a simple landing page with three key sections : About, Work and Contact. The idea is to introduce myself and showcase my completed works, as well as various social links.

<p align="center" width="100%">
<img src="https://github.com/alexisbergel/portfolio/blob/main/public/images/screenshot.png" alt="Product Screenshot" style="width:70%;"/>
</p>

## Features
- Contact form
- Fully responsive website
- Sending limit on the contact form
- Gallery of completed projects
- French translation of the website
- Social links
- SEO
- Performances

## Built with
- Node.js | Express.js 
- Vanilla JavaScript (Front-end)
- Docker (Deployment)
- HTML, CSS

## npm packages
- cors
- dotenv
- ejs
- express
- express-rate-limit
- nodemailer

## Prerequisites
The application relies on environment variables, particularly for sending the contact form. Without these variables, the application works but will return an error when attempting to send a message (see the .env.example file).

## Installation
There are two possible methods depending on whether you want to use Docker or not.

### Installation with Docker
**Prerequisites :** [install Docker](https://docs.docker.com/desktop/).

Once Docker is installed, there are two steps :

1. Build the Docker image. At the root of the project, enter the following command :
```
docker build -t <imageName> .
```

2. Launch the container from the created image : 
```
docker run <imageName>
```

The website is available on port 3001 : [localhost:3001/](localhost:3001/).


### Installation without Docker
**Prerequisites :** [install Node.js and npm](https://nodejs.org/en/download/package-manager).

At the root of the project, enter the following command to run the project : 
`node app.js` or `nodemon app.js`

The website is available on port 3001 : [localhost:3001/](localhost:3001/).

## Performances
<img src="https://github.com/alexisbergel/portfolio/blob/main/public/images/performances.png" alt="Performances Screenshot" style="width:35%; text-align:center;"/>
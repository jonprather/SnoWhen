# SnoWhen

SnoWhen provides a clean interface for snow resort data. Due to API costs, the app has one free resort, but is set up to handle any amount of resorts. The app's features include the ability to register and to create, read, and update favorite resorts to make them easily accessible.

## Demo

Here is a working live demo : http://sno-when.vercel.app/

## Features

- Authentication and Authorization
- JWT stored in HTTP only cookie
- Cron jobs to cahce the data in BE
- Create read update Snow Resorts
- Like Resorts for easy access
- Get details with graphs
- Data is updated frequently

## Tech Stack

**Client:** Next.js, React Query, SCSS

**Server:** Strapi CMS based on node, Redis, 3rd-party-snow-api.

## Installation

1. `npm install`
2. Add your `RESORT_APP_ID` and `RESORT_APP_KEY` to `.env`
3. `npm run dev`

<!-- Rewrite this one copy for FE another for BE -->

## Acknowledgements

Learned Much From Brad Traversy's Next.js Course:
https://www.udemy.com/course/nextjs-dev-to-deployment/

This book on Strapi was illuminating:
https://www.packtpub.com/product/designing-web-apis-with-strapi/9781800560635

## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

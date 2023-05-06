# EBI02126 – Technical task

###This project can be viewed on online [here](http://aws-impc-project.s3-website.eu-central-1.amazonaws.com).

## Running the project locally

- Clone the project to your local machine or download the zip file.
- Navigate to the project directory
- If you don't have NodeJS installed on your local machine install it [here](https://nodejs.org/en/download)
- If you don't have Yarn installed on your local machine install it [here](https://classic.yarnpkg.com/en/docs/install/#windows-stable). If you prefer to use npm, you can delete the yarn.lock file and run `npm install` instead of `yarn install` in the next step.
- Run `yarn install` to install the dependencies
- Run `yarn start` to start the project. If you are using npm, run `npm start` instead.
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser (Please ensure you have nothing running on port 3000).

## Project structure

The application consists of 3 pages for accessibility and clarity:

- Landing page - This page displays the introduction text and images provided for the exercise.
- Heatmap page - This page displays the heatmap plot with the filter controls.
  - On page load, the plot displays the data for the first 25 genes and the user can use the pagination controls below the plot to navigate to all 1000 genes.
  - The user can use the filter controls to filter the data by gene, top level phenotype term and top phenotype counts. The top level phenotype term and top phenotype count are paginated.
  - All filters are mutually exclusive.
- Search page - This page allows users to search for a gene and display all its information. Normally you can view some information about the gene on the plot through the tooltip, however some genes have a lot of information so the search page was provided for this.

## Technical decisions

- I used all the libraries recommended by the exercise. I choose to add react router because the landing page was getting a
  bit long, and I wanted to separate the heatmap page from the landing page for clarity and accessibility. I also added a search page because the tooltip
  on the plot couldn't show all information for some genes.
- I decided to use Context API to manage the data (exercise data) of the application as it is now needed in the heatmap page and the search page.
  This will also prevent re-fetching of the data when the user navigates between pages.
- I cached the dataset in IndexedDB to prevent re-fetching of the data when the user refreshes the page. I would not usually do this
  in production but rather prefer using libraries like useSWR, service workers, GraphQL clients, or others that implements state-of-the-art caching strategies to cache the data. I also expect the data to have been paginated
  from the backend so that the user does not have to fetch all 1000 genes at once. Given that the data is not paginated and does not change, I decided to cache it in IndexedDB.
- I decided to paginate the data viewed on the plot because the plot was getting a bit crowded with all 1000 genes. I also decided to paginate the plot when filtering by top level phenotype term and top phenotype count because the plot was also getting crowded.

## Time spent on the project

This project took me roughly 3days.

## Libraries used in this project

- [React](https://reactjs.org/) - React is a popular library for building user interfaces.
- [React Router](https://reactrouter.com/) - React Router is a popular library for routing in React and I used it to navigate between the different pages in the application.
- [React Bootstrap](https://react-bootstrap.github.io/) - React Bootstrap because it is a popular library for styling React components.
- [Bootstrap](https://getbootstrap.com/) - Bootstrap because it is a popular library for styling web pages.
- [Typescript](https://www.typescriptlang.org/) - Typescript is a popular language for writing JavaScript, and it helps to write error free Javascript.
- [Nivo](https://nivo.rocks/) - Nivo Charts is a popular library for creating charts and has charts for the kind of plot we want to display.

Thank You!

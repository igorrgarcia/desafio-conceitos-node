const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4")

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const newProject = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(newProject)

  return response.json(newProject)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body
  

  // Verificar se id existe

  const projectIndex = repositories.findIndex(project => project.id === id)
  
  if(projectIndex < 0) {
    return response.status(400).json({message: 'Project not found'})
  }

  repositories[projectIndex] = {
    ...repositories[projectIndex],
    title,
    url,
    techs
  }

  return response.json(repositories[projectIndex])
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const projectIndex = repositories.findIndex(project => project.id === id)
  
  if(projectIndex < 0) {
    return response.status(400).json({message: 'Project not found'})
  }

  repositories.splice(projectIndex, 1)

  return response.json({message: `Project ID: ${id} delete`})
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const projectIndex = repositories.findIndex(project => project.id === id)
  
  if(projectIndex < 0) {
    return response.status(400).json({message: 'Project not found'})
  }

  repositories[projectIndex].likes++

  return response.json(repositories[projectIndex])
});

module.exports = app;

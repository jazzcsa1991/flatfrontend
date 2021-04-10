aplicación de una API wrapper para cualquier repositorio de GITHUB 

FRONTEND desarrollado en React

pasos para su intalación en docker

1- docker build -t flatfront:dev .

2- docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true flatfront:dev
    
3- http://localhost:3001/


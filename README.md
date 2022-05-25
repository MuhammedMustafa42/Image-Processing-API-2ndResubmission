# Image Processing Api

an Image Processing API Project for UDACITY. built using TypeScript, NodeJS & Express

## Installation

1. ``` npm install ``` - installs the project modules.
2. ``` npm run build ``` - creates the build directory.

## Usage
1. ```npm run start``` - to start the server
2. to open a specific image use /api?image=<image name>
3. -available images [fjord,
  encenadaport,
  icelandwaterfall,
  palmtunnel,
  santamonica]
4. to resize an image use /api/imageprocess?image=<image name>&height=<image height>&width=<image height>

## Examples

- http://localhost:8080/
- http://localhost:8080/api?image=fjord
- http://localhost:8080/api/imageprocess?image=fjord&width=150&height=200

## Scripts
- ESLint ``` npm run lint ``` 
- Prettier ``` npm run prettier ```
- Jasmine ``` npm run test ```
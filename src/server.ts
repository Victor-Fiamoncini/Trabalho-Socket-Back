import App from './App'

const { http } = new App()

const { PORT } = process.env

http.listen(PORT, () => {
  console.log(`Servidor inicializado em: ${PORT}`)
})

import App from './App'

const { http } = new App()

const PORT = process.env.PORT || 3001

http.listen(PORT, () => console.log(`Servidor inicializado em: ${PORT}`))

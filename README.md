##  lagrange-server
lagrange-server is the Python Backend for lagrange platform

# Backend Deployment
```shell
chmod +x run-server.sh
```

You need to change the _DOMAIN_ value to your ip, if you want to deploy it as a server

# Frontend Deployment

```shell
cd web
docker build -t lagrangedao/lagrange-dao-web . 
docker run  -p 8082:8082 lagrangedao/lagrange-dao-web
```

Now you can visit the site at http://127.0.0.1:8082


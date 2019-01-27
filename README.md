# Instalación de Docker

#### Actualizar los repos
    $ sudo apt-get update

#### Instalar unidades
    $ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common -y

#### Agregar el GPG key (para validar la integridad de los archivos)
    $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

#### Agregar el repo
    $ sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

#### Actualizar de nuevo para actualizar el repo
    $ sudo apt-get update

#### Instalar docker
    $ sudo apt-get install docker-ce

#### Iniciarlo con el sistema
    $ sudo systemctl enable docker

#### Agregar usuario al grupo docker
    $ whoami // Saber el nombre de tu usuario
    $ sudo usermod -aG docker nombre_de_salida_whoami

#### Salir de la sesión
    $ exit

#### Correr el build para generar la imagen
    $ docker-compose build

#### Levantar los servicios de docker
    $ docker-compose up


pipeline {
  agent any

  stages {
    
    stage('Clonar repositorio') {
      steps {
        git branch: 'main', url: 'https://github.com/rossa1513/asesorias.git'
      }
    }

    stage('Desplegar contenedor Docker') {
      steps {
        script {
            withCredentials([
              string(credentialsId: 'MONGO_URI', variable: 'MONGO_URI')
            ]) {
             bat 'docker-compose up -d'
            }
        }
      }
    }
  }
}
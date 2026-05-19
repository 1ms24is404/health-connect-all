pipeline {
  agent any
  options {
    ansiColor('xterm')
    timestamps()
  }
  parameters {
    string(name: 'DOCKERHUB_REPO', defaultValue: 'docker.io/youruser/health-connect-all', description: 'Docker Hub repository name')
    string(name: 'IMAGE_TAG', defaultValue: '', description: 'Docker image tag (defaults to build number)')
    string(name: 'SONAR_PROJECT_KEY', defaultValue: '', description: 'SonarCloud project key')
    string(name: 'SONAR_ORGANIZATION', defaultValue: '', description: 'SonarCloud organization key')
    string(name: 'SONAR_HOST_URL', defaultValue: 'https://sonarcloud.io', description: 'SonarCloud host URL')
  }
  environment {
    DOCKERHUB_REPO = "${params.DOCKERHUB_REPO}"
    SONAR_HOST_URL = "${params.SONAR_HOST_URL}"
  }
  stages {
    stage('Clone repository') {
      steps {
        checkout scm
      }
    }
    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }
    stage('SonarCloud check') {
      when {
        expression { return params.SONAR_PROJECT_KEY?.trim() && params.SONAR_ORGANIZATION?.trim() }
      }
      steps {
        withCredentials([string(credentialsId: 'SONARCLOUD_TOKEN', variable: 'SONAR_TOKEN')]) {
          sh '''
            npx sonar-scanner \
              -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
              -Dsonar.organization=${SONAR_ORGANIZATION} \
              -Dsonar.sources=src \
              -Dsonar.host.url=${SONAR_HOST_URL} \
              -Dsonar.login=${SONAR_TOKEN}
          '''
        }
      }
    }
    stage('Trivy FS check') {
      steps {
        sh 'trivy fs --exit-code 1 --severity HIGH,CRITICAL .'
      }
    }
    stage('Docker build') {
      steps {
        script {
          def tag = params.IMAGE_TAG?.trim() ? params.IMAGE_TAG.trim() : "build-${env.BUILD_NUMBER}"
          env.IMAGE_TAG = tag
        }
        sh 'docker build -t ${DOCKERHUB_REPO}:${IMAGE_TAG} .'
      }
    }
    stage('Docker push') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'DOCKERHUB_CREDENTIALS', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
          sh '''
            echo "$DOCKERHUB_PASSWORD" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin
            docker push ${DOCKERHUB_REPO}:${IMAGE_TAG}
            docker logout
          '''
        }
      }
    }
  }
  post {
    always {
      sh 'docker logout || true'
    }
  }
}
